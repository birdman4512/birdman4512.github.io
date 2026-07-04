---
title: "What was uploading my data at night? Hunting Android's mystery UID -253"
date: 2026-07-04
excerpt: "An unidentified uid:-253 was uploading megabytes of data from my phone every night. Here's how I traced Android's undocumented negative UID to Google's backup service."
---

While monitoring the network traffic on my phone I found an unknown process called `uid:-253` which was regularly uploading data each night. What caught my attention was the package name, which wasnt like the others but instead a UID. After a few quick Google searches about what it could be, I came up with nothing, So instead, I set out with Claude to work out what was generating the traffic. 

[<img src="/assets/2026-07/kibana-overview-7d.png" width="500" alt="Kibana dashboard showing a 7-day overview of per-app network traffic on my phone">](/assets/2026-07/kibana-overview-7d.png)

<!--more-->

## Monitoring my phone

I always hear a lot of stories about how we should be weary of our phones. With that in mind, I have over the past few weeks and months been been building an app that runs on my phone and watches for suspicious activity. One of the things it does is record how much data every app moves in each 30 minute window and ships it off to a self-hosted Elasticsearch, where I have a Kibana dashboard to graph it all.

Looking over the dashboard, most of the entries were what you would expect — Android Auto (a huge amount of traffic, which I had to filter out just to see anything else), WhatsApp, Maps and so on. But one entry stood out: `uid:-253`.

The app labels traffic with the package name of the app that moved it. When it can't find an app for the traffic, it falls back to just showing the raw UID. So this was traffic that Android was accounting for, but that no installed app owned.

Filtering the dashboard down to just that entry made it more interesting. It only moved data at night, and on the night of the 2nd of July it uploaded over 20MB in a single window.

[<img src="/assets/2026-07/kibana-uid253-7d.png" width="500" alt="Kibana graph filtered to uid:-253 showing traffic spikes only at night">](/assets/2026-07/kibana-uid253-7d.png)

An unknown process uploading data while I sleep is exactly the kind of thing I built the app for, so it was time to investigate. 

<img src="https://media1.tenor.com/m/PnU5WE-n2LIAAAAd/investigate-spy.gif" width="300" alt="Investigate GIF">

## First attempt - chasing UID 253

I must disclose here, that I do not know much about programming for Android, so I have co-opted Claude to help me investigate. 

On Android, every app gets its own Linux UID, and the system services have well-known low-numbered UIDs (1000 is system, 1001 is the radio, etc.). So the first thing I did was connect to the phone over adb and ask it who UID 253 was.

[<img src="/assets/2026-07/01-chasing-253.png" width="500" alt="ADB terminal output showing no user, process, or package exists for UID 253">](/assets/2026-07/01-chasing-253.png)

Nothing. No user is defined with that ID, no process was running as it, and no package claims it. UID 253 simply doesn't exist on the phone. A dead end — or so I thought.

## Hang on, it's negative

Going back over the data, I clicked that the UID wasn't 253, it was **-253**. A real Linux UID can't be negative, so this had to be something Android made up. And it turns out Android does exactly that — its network accounting uses a handful of negative "virtual" UIDs for traffic that doesn't belong to a normal app. The documented ones are `-1` (UID_ALL), `-4` (UID_REMOVED, apps that have been uninstalled) and `-5` (UID_TETHERING, traffic from hotspot tethering).

Dumping the phone's network stats showed three negative UIDs, and two of them were the documented ones.

[<img src="/assets/2026-07/02-negative-uids.png" width="500" alt="Phone network stats dump listing three negative virtual UIDs">](/assets/2026-07/02-negative-uids.png)

But `-253` isn't documented anywhere. Searching for it didn't turn up much either. The phone's own accounting had plenty to say about it though — here is its history, recorded against my home Wi-Fi:

[<img src="/assets/2026-07/03-history.png" width="500" alt="Traffic history for UID -253 recorded against my home Wi-Fi">](/assets/2026-07/03-history.png)

A couple of things stood out. What it sent was always larger then what it recieved. And decoding the bucket timestamps, every burst lands between about 8pm and midnight.

[<img src="/assets/2026-07/06-times.png" width="500" alt="Decoded timestamps showing traffic bursts landing between 8pm and midnight">](/assets/2026-07/06-times.png)

So: something with no app, uploading every night, with a 21MB burst on the 2nd of July.

## Thinking in hex

> This next part was all Claude. 

The trick that cracked it was realising that -253 might not be meant to be read as a number at all. Android stores these IDs as 32-bit integers, and if you look at -253 as an unsigned 32-bit value instead, you get something much more interesting:

[<img src="/assets/2026-07/04-hex.png" width="500" alt="-253 converted to an unsigned 32-bit hex value, showing 0xFFFFFF03">](/assets/2026-07/04-hex.png)

`0xFFFFFF03`. Android uses values in the `0xFFFFFFxx` range as special "tags" for system traffic. That looked like too much of a coincidence.

## Grepping the Android source

Next, I watched as Claude downloaded the source for Android's Connectivity module from AOSP and grepped it for `0xFFFFFF03`. One hit.

[<img src="/assets/2026-07/05-aosp.png" width="500" alt="AOSP source code search result showing the TAG_SYSTEM_BACKUP constant in TrafficStats.java">](/assets/2026-07/05-aosp.png)

`TAG_SYSTEM_BACKUP` — a hidden constant in `TrafficStats`, with a comment that says it all: *"Default tag value for BackupManager backup traffic; that is, traffic from the device to the storage backend."*

My mystery night-time uploader was **Google Backup**. That explains everything: backups only run when the phone is idle, charging and on unmetered Wi-Fi — which for my phone means overnight on the bedside charger. It explains the upload-heavy traffic (backups go up, not down), and the big 21MB night would have been a fuller backup run.

## Double checking with Pi-hole

I wasn't quite ready to close the case on a source code comment alone, so I went for one more piece of evidence. All the DNS on my network goes through a Pi-hole, so I pulled the phone's DNS queries for the night of the 2nd of July — the 21MB night — and filtered for anything backup related.

[<img src="/assets/2026-07/07-pihole.png" width="500" alt="Pi-hole DNS query log showing Google backup-related domains queried overnight">](/assets/2026-07/07-pihole.png)

`androidplatformbackuprestore-pa.googleapis.com`, `mmsbackup.pa.googleapis.com`, `photosdata-pa.googleapis.com` — Google's backup and restore endpoints, queried steadily across exactly the window the mystery traffic appeared in. Case closed.

## Wrapping up

<img src="https://media1.tenor.com/m/Ru8YW-aVyJcAAAAd/tony-stark-tony-phew.gif" width="300" alt="Tony Stark phew relief GIF">

What looked like a process quietly exfiltrating my data at night turned out to be my phone doing exactly what I asked it to do — backing itself up to Google. Slightly disappointing as far as threat hunting goes, but a good result, and I despite using Claude to help, I have learnt a bit about how Android accounts for traffic (I would have worked this out, but it would have taken me a LOT longer):

- Negative UIDs in Android's network stats are virtual buckets, not real apps
- `-1` is everything, `-4` is uninstalled apps, `-5` is tethering — and undocumented `-253` is system backup traffic
- If a negative UID doesn't make sense as a number, read it as unsigned hex — the `0xFFFFFFxx` range is Android's system traffic tags


