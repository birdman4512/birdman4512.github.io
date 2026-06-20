---
title: "Deploying the radio Meshtastic Node."        # required — wrap in quotes if it contains a colon
date: 2026-06-20  # required — must match the YYYY-MM-DD in the filename
# excerpt: ""     # optional — overrides the auto excerpt for the blog index + RSS
---

Having built and tested my Meshtastic radio node, it was time to deploy it to try and establish contact with people on the north side of Brisbane.

<!--more-->

Having built my version of the [Solar Meshtastic Node](/radio/solar-meshtastic-node.html), tested it for a [few weeks](/2026/05/22/solar-node-1week-in.html) and planned out [possible locations](/2026/06/07/mapping-node-locations.html), it was time to actually put it out in the world to see if we could connect people in northern Brisbane. (If there were any.)

## Finding a home

In the [mapping post](/2026/06/07/mapping-node-locations.html) I had narrowed things down to a couple of spots up on the range using my [RF LOS Planner](https://dea.nbird.com.au/rf-los-planner/). The challenge was always going to be turning a marker on a map into a real spot with real sun and someone happy to have it there.

After a bit of asking around I got in touch with someone who had a property up on the hill that lined up nicely with the coverage I was after. Even better, it had a clear outlook to the south and west — exactly the direction I needed to reach back over the plains towards Brisbane.

## Up the hill

The spot did not disappoint. As soon as I got up there it was obvious why the planner liked it — you can see for miles out over the valley.

[<img src="/assets/2026-06/PXL_20260620_003729294.jpg" width="400">](/assets/2026-06/PXL_20260620_003729294.jpg)

I mounted the node on a cheap garden stake from Bunnings to give the little antenna some height and keep it clear of the regrowth. Nothing fancy, but on a hill like this every metre of elevation is doing a lot more work than it would back home in the dip.

[<img src="/assets/2026-06/PXL_20260620_004536865.jpg" width="400">](/assets/2026-06/PXL_20260620_004536865.jpg)

The position gets sun for most of the day, which is exactly what the solar node needs to keep itself topped up. After [a week of testing on the roof](/2026/05/22/solar-node-1week-in.html) I am fairly confident the panel and battery are right-sized for the job, even through some cloudy stretches.

## Coverage

With the node up and running, the next thing was to see what it could actually reach. I dropped its real location into the planner and mapped the coverage.

[<img src="/assets/2026-06/sunbird-coverage.png" width="400">](/assets/2026-06/sunbird-coverage.png)

This is a huge step up from the ~1km I was getting at home. From up on the hill the node is throwing coverage right out across the plains and a good way towards Brisbane, doing exactly what the line-of-sight modelling suggested it would.

Best of all, it is not just theory anymore. I have already been able to talk to a friend over in Wamuran from Bellmere via the node. The coverage is outdoors only at this stage, but it is working — exactly the kind of link I was hoping for when I started this whole project.

## Next steps

Now that it is deployed I want to do some real-world testing to see how the modelled coverage compares to what I can actually reach with a portable. Traceroutes from a few spots around the area will tell me a lot more than a map ever could.

I am also keen to see how it holds up over a longer stretch — both the battery through some properly bad weather, and the link quality as the temperature swings through the day, which is something I noticed [driving Jackson Road](/2026/06/07/mapping-node-locations.html).

For now though, it is up, it is solar powered, and it is talking. A good day's work.
