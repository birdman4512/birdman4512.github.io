---
title: "The Pheonixing of SunBird"        # required — wrap in quotes if it contains a colon
date: 2026-07-09  # required — must match the YYYY-MM-DD in the filename
excerpt: "My solar Meshtastic node SunBird was slowly losing its battery due to poor sun exposure. Here's how I rebuilt it with a gutted Bunnings solar floodlight for a bigger battery, bigger panel, and a new home on the hill."
---

SunBird has been sitting up on the range doing its thing since I [deployed it](/2026/06/20/radio-node-deployment.html), and for a couple of weeks it was going great. Unfortunately however, as I was watching its metrics, I noticed that the battery was never really getting back to the same level it was the day before. First it was just by 1% per day, then as we had a few overcast days, it took a turn for the worst. I really like the idea of the Solar Buoy, but something had to change.

<!--more-->

## The slow death

I keep an eye on the node metrics every so often, as the days went on I was noticing that the battery was slowly on a downward trend. Every day it was creeping down a little bit more than it recovered overnight.

[<img src="/assets/2026-07/Screenshot_20260629-082557.png" width="400">](/assets/2026-07/Screenshot_20260629-082557.png)

Then we had a run of overcast and rainy days, that accelerated the trend.

[<img src="/assets/2026-07/Screenshot_20260630-144000.png" width="400">](/assets/2026-07/Screenshot_20260630-144000.png)

38% and still dropping. I had a good location, but seems like it wasn't getting enough sun. So at first, I wanted to see if I might be able to find a better location close by and modified my RF Line of Sight planner to provide details of sunlight

[<img src="/assets/2026-07/rf-los-sunlight-planner.png" width="400">](/assets/2026-07/rf-los-sunlight-planner.png)

It looks like I just wasn't getting enough sunlight hours on a good day to recharge the batteries back up to where they needed to be. (When it was placed on my home roof, it was getting over 10 hours of sunlight a day).

## Rebuilding it bigger

I went looking for something off the shelf I could gut rather than build another enclosure from scratch, and landed on an [Arlec 7W Integrated Solar Powered Sensor LED Floodlight](https://www.bunnings.com.au/arlec-7w-integrated-solar-powered-sensor-led-floodlight_p0604237) from Bunnings. For about $40 it comes with a decent sized panel, a 3600mAh battery (Double what it had) and a weatherproof housing that's already meant to live outside. 

Of course, the floodlight didn't have a connector for the antenna, I could have placed the existing one inside the casing, but managed to track down something a little bigger to try and extend the coverage a bit. It turns out that the button that turns the light on and off was the perfect size for the antenna connector. I was even able to cut the top off the button to provide some further weather proofing around the connector. 

[<img src="/assets/2026-07/PXL_20260702_003545897.jpg" width="400">](/assets/2026-07/PXL_20260702_003545897.jpg)

[<img src="/assets/2026-07/PXL_20260702_003540480.jpg" width="400">](/assets/2026-07/PXL_20260702_003540480.jpg)

I carefully cracked it open on the bench, to see if there was room to fit the board. Luckily, there was a fair bit of space once I took out the sensor and LED driver board, there was plenty of space for the Heltec T114. I also tested the battery and solar panels to ensure they were about the same voltage as the solar buoy and they were.

<img src="https://c.tenor.com/-wVwXQKEJrQAAAAd/tenor.gif" >

Same solar controller and battery management approach as the last build — plug the panel and battery straight into the board and let it handle the rest.

[<img src="/assets/2026-07/PXL_20260702_010626398.jpg" width="400">](/assets/2026-07/PXL_20260702_010626398.jpg)

[<img src="/assets/2026-07/PXL_20260702_011341227.jpg" width="400">](/assets/2026-07/PXL_20260702_011341227.jpg)

## Back up the hill

With everything wired up and sealed back together, it was time to swap it out on the hill and see if the bigger panel and battery actually made a difference.

I picked up the buoy a few days earlier in mid afternoon, while there I took note that the sun was well and truly behind the trees at that time of day, so even the guess by the planner was likely way off (so it was maybe getting 6 to 8 hours of sunlight a day)

So I looked around and found an old fence post to attach it to. This should get a lot more sun and is actually easier to access than the last location, but it might lose a little bit of distance (which I think the antenna makes up for)

[<img src="/assets/2026-07/PXL_20260706_061512498.jpg" width="400">](/assets/2026-07/PXL_20260706_061512498.jpg)

Almost straight away I could see the battery climbing again instead of draining.

[<img src="/assets/2026-07/Screenshot_20260703-134455.png" width="400">](/assets/2026-07/Screenshot_20260703-134455.png)

And a week on, it has settled in nicely, sitting flat around 92-93% and barely moving.

[<img src="/assets/2026-07/Screenshot_20260709-200705.png" width="400">](/assets/2026-07/Screenshot_20260709-200705.png)

SunBird has risen from the ashes with a bigger battery and solar panel, and this time it actually has the headroom to cope with a few overcast days without slowly bleeding out.  

