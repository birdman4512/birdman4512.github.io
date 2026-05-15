# Technology & Security

## QuirkyIT

[QuirkyIT](https://www.quirkyit.com.au) is my IT and security consulting business covering three areas:

**Cyber Security** — Digital forensics and incident response (DFIR), threat intelligence, detection engineering, and defensive security. Most of the open-source projects on this page were built to solve real problems encountered in that work.

**AI & Business Integration** — Helping businesses get practical value from AI. This means identifying the right workflows to automate, selecting and deploying appropriate models (local or cloud), and building integrations that fit how a business actually operates — not just demos. Work includes internal tooling with LLMs, RAG pipelines over business documents, and connecting AI to existing systems.

**General IT** — Infrastructure, networking, and systems support for small and medium businesses.

A recurring theme is using local and cloud LLMs to make work faster and more effective. See the [AI & LLM section](#ai--llm) below for the technical detail.

---

## Projects

### [talkIR](https://github.com/birdman4512/talkIR)
*Talk to your incident response data*

Query security logs in plain English instead of writing Elasticsearch DSL. Drop JSON logs into a directory, and Fluent Bit ingests them automatically. A FastAPI backend translates natural language questions into ES queries, enriches results with AbuseIPDB and VirusTotal threat intelligence, and streams back LLM-generated analysis. Supports local Ollama models (including DeepSeek R1 for visible reasoning chains) or cloud providers like Claude and OpenAI.

**Stack:** Python · FastAPI · Elasticsearch · Fluent Bit · Docker Compose · Ollama

---

### [SignalSage](https://github.com/birdman4512/SignalSage)
*A Slack / Discord bot that provides helpful tasks*

Automated threat intelligence enrichment for security teams. Post an IP address, domain, URL, file hash, or CVE in a monitored channel and receive enriched verdicts from VirusTotal, Shodan, GreyNoise, AbuseIPDB, and others — in parallel, with an LLM summary. Also runs scheduled daily digests that fetch RSS feeds, scrape web pages, and transcribe podcast audio via Whisper, then post a ranked summary of the day's threat landscape. Cross-topic deduplication prevents the same story appearing twice, and a seven-day trending badge surfaces recurring threats.

**Stack:** Python · Docker · Slack & Discord APIs · Ollama · Anthropic Claude API · Whisper

---

### [ibis-as-code](https://github.com/birdman4512/ibis-as-code)
*Incident Response detection as code*

Manages detection logic as version-controlled code across multiple platforms: Jupyter notebooks, OpenSearch dashboards, Velociraptor artifacts, and Sigma rules. Designed to integrate with the DFIR2Go framework so detections can be deployed, reviewed, and updated like any other software rather than managed as manual configurations.

**Stack:** Jupyter Notebook · OpenSearch · Velociraptor · Sigma

---

### [opensearch-docker](https://github.com/birdman4512/opensearch-docker)
*Containerised OpenSearch stack*

Docker Compose setup for a self-hosted OpenSearch cluster, making it straightforward to spin up a full search and analytics environment for log analysis and threat hunting.

**Stack:** Shell · Docker

---

### [forensic-claw](https://github.com/birdman4512/forensic-claw)
*Dockerised DFIR workstation driven by an AI agent*

A self-contained digital forensics and incident response workstation packaged as Docker. Submit evidence — disk images, memory dumps, packet captures, logs, or suspicious binaries — and an AI agent built on the OpenClaw framework selects appropriate tools, runs analyses under user supervision, and documents findings in standardised case folders (evidence, findings, worklog, status). A wrapper system logs every forensic tool invocation automatically, and dedicated containers handle specialised tools like Volatility 2 and MemProcFS.

**Stack:** Docker · Shell · PowerShell · Sleuth Kit · Volatility · Plaso · Wireshark/tshark · YARA · Anthropic Claude / OpenAI

---

### [mesh-medic](https://github.com/birdman4512/mesh-medic)
*A Meshtastic survival bot*

Offline AI assistant that answers questions over LoRa radio networks — no internet required after deployment. A Raspberry Pi receives direct messages from a Meshtastic or MeshCore network, runs a RAG search across ingested PDF documents, and sends back LLM-generated answers chunked to fit radio packet size limits. Built for remote or off-grid scenarios where expert knowledge needs to be accessible without connectivity.

**Stack:** Python · Ollama · ChromaDB · Meshtastic · Ansible

---

## AI & LLM

I run a lot of local LLMs via [Ollama](https://ollama.com/) and wire them into practical tools. The focus is on making models useful rather than impressive — offline operation, domain-specific RAG pipelines, and integration with existing workflows over cloud APIs.

**Models & runtimes:** Ollama (TinyLlama, Phi3, DeepSeek R1, Gemma2, Qwen), Claude API, OpenAI API

**Techniques used across projects:**
- Retrieval-augmented generation (RAG) with ChromaDB and `all-MiniLM-L6-v2` embeddings
- Elasticsearch query generation from natural language (talkIR)
- Multi-agent workspace routing (OpenClaw)
- Streaming responses via Server-Sent Events
- Podcast/audio transcription via Whisper feeding into LLM summaries (SignalSage)
- Fully offline inference over LoRa radio with message chunking (mesh-medic)

---

## Write-ups & Guides

- [Setting up a TOR Transparent Gateway](technology/tor-transparent-gw.md) — Routing a network segment through TOR using Alpine Linux and iptables
- [OpenClaw Setup](technology/openclaw-setup.md) — Architecture and routing for a multi-workspace AI agent system covering personal, business, forensic, and family use cases

---

Return to [home](index.md)
