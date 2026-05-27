---
title: Home
---

# Dean Bird — VK4DSB

Amateur radio operator, IT security professional, and tinkerer based in Bellmere QLD. Most of my work is in digital forensics, incident response, and threat intelligence.

**[Blog](blog.html) · [Radio](radio.html) · [Technology](technology.html)** · [QRZ ↗](https://www.qrz.com/db/VK4DSB) · [GitHub ↗](https://github.com/birdman4512)

---

## Amateur Radio

Licensed as VK4DSB in QG62. I run a Xiegu X6100 and am active on FT8, APRS, and SSTV. Current projects include a solar-powered Meshtastic relay node.

- **[Ham Dashboard](radio/hamdashboard/)** — Live propagation, APRS, FT8, BOM radar, and DX tracking in one view
- **[RF Line of Sight Planner](radio/rf-los-planner.html)** — Interactive map for planning RF line-of-sight paths between locations
- **[Radio Setup](radio/setup.html)** — Software and equipment for the X6100

→ [All radio projects & guides](radio.html)

## Technology & Security

Open-source tools and write-ups covering incident response, threat intelligence, and network security. Most use local or cloud LLMs as a core component.

- **[talkIR](https://github.com/birdman4512/talkIR)** — Natural-language queries over IR log data; supports Ollama, Claude, and OpenAI
- **[SignalSage](https://github.com/birdman4512/SignalSage)** — Threat-intel enrichment bot for Slack and Discord with LLM-generated digests
- **[forensic-claw](https://github.com/birdman4512/forensic-claw)** — Dockerised DFIR workstation with an AI agent driving Sleuth Kit, Volatility, Plaso, and more
- **[mesh-medic](https://github.com/birdman4512/mesh-medic)** — Fully offline RAG + LLM over LoRa radio for off-grid use

→ [All technology write-ups & projects](technology.html)

## Web Apps

- **[Train Int ↗](https://tracker.quirkyit.com.au/train-int/)**
- **[Fuel Int ↗](https://tracker.quirkyit.com.au/fuel-int/)**

## AI & LLM

AI runs through most of the projects above — local Ollama models, RAG pipelines, and LLM tooling are core, not gimmicks. The one architecture piece worth its own write-up is **[OpenClaw setup](technology/openclaw-setup.html)** — a multi-workspace AI agent architecture covering personal, work, and forensic contexts.

## Latest from the Blog

{% for post in site.posts limit:3 %}
- **{{ post.date | date: "%Y-%m-%d" }}** — [{{ post.title }}]({{ post.url | relative_url }})
{% endfor %}

→ [All posts](blog.html)
