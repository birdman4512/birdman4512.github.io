---
title: Home
---

# Dean Bird — VK4DSB

I'm an amateur radio operator and IT security professional based in Bellmere, QLD. I spend my time tinkering where my three main interests overlap — radio, security, and AI.

**[Blog](blog.html) · [Projects](projects.html) · [Radio](radio.html) · [Technology](technology.html)** · [QRZ ↗](https://www.qrz.com/db/VK4DSB) · [GitHub ↗](https://github.com/birdman4512)

---

## What I'm into

**📻 Radio** — Licensed as VK4DSB in QG62. Active on FT8, APRS, and SSTV with a Xiegu X6100, and currently deploying solar-powered Meshtastic relay nodes around northern Brisbane.

**🛡️ Technology & Security** — My day job is digital forensics, incident response, and threat intelligence. Off the clock I build open-source DFIR and threat-intel tooling.

**🤖 AI** — Local and cloud LLMs run through nearly everything I make — RAG pipelines, natural-language tooling, and offline inference over radio. The aim is useful, not flashy.

→ [See all projects](projects.html)

## Web Apps

{% include app-panel.html %}

## Latest from the Blog

{% for post in site.posts limit:2 %}
- **{{ post.date | date: "%Y-%m-%d" }}** — [{{ post.title }}]({{ post.url | relative_url }})
{% endfor %}

→ [All posts](blog.html)
