---
title: "OpenClaw: A Multi-Workspace AI Agent Setup"
---

# OpenClaw: A Multi-Workspace AI Agent Setup

Most people who use AI assistants end up with one giant context that does everything — personal questions, work tasks, sensitive research, family scheduling — all tangled together. That works fine until it doesn't: business context bleeds into personal conversations, a casual question lands in the middle of a forensic case, or the family assistant says something it really shouldn't.

OpenClaw is my attempt to solve that properly. Rather than one assistant that does everything, it's a set of purpose-built workspaces — each with its own context, tools, tone, and boundaries. When I start a conversation, it gets routed to the right place automatically based on what it is.

---

## The Four Workspaces

### Personal Claw
My private, direct assistant. Handles everyday coordination, general help, and anything I don't want mixed into work. Concise and direct — it doesn't need to write like a business report. This is the default if nothing else fits.

### Business Claw
Focused on [QuirkyIT](https://www.quirkyit.com.au) work — business planning, client-facing documents, scopes and proposals, and defensive OSINT. The business context here is kept clean and reusable across sessions, which matters when you're working on proposals or packaging services. If a piece of work turns evidence-heavy or starts looking more like a DFIR case, it hands off to Forensic Claw rather than trying to handle it inline.

### Forensic Claw
This one has the strictest operating rules. It's built for lawful DFIR and intrusion analysis — evidence triage, log analysis, disk images, memory dumps, PCAPs, and building timelines that hold up to scrutiny. The key behaviour here is separating confirmed facts from inferences and not guessing. A forensic report that blurs those lines is worse than no report at all, so the workspace is explicitly tuned to stay careful.

Cases live in their own isolated storage under a case ID, which keeps different engagements from contaminating each other.

### Family Claw
A separate Docker-based instance with a deliberately low-risk posture. Handles tutoring help, reminders, and calendar management using the shared family Google Calendar. It runs containerised so it can be moved to a different host without reconstructing everything from scratch. I remain the admin/operator behind the scenes — the family-facing experience is intentionally simple.

---

## Tools vs Skills

One of the design choices that makes this work in practice is the distinction between tools and skills.

**Tools** are what an agent can actually do — run shell commands, query Google Workspace, call forensic wrappers for disk and log analysis, run OSINT lookups. They're capabilities.

**Skills** are the instructions for how to use those capabilities well — when to use a tool, what the safe operating boundaries are, how to format output, what caveats apply. They're judgment.

Each workspace keeps its own set of both. That's what lets each claw behave differently even when the underlying model is the same: the forensic workspace has tight evidence-handling skills, the business workspace knows how to write a scope of work, the personal one doesn't need any of that overhead.

---

## Why the Separation Matters

It would be simpler to have one assistant and just describe the context at the start of each conversation. In practice that breaks down quickly. Context bleeds across sessions, the tone drifts, and you end up with a general-purpose assistant that's mediocre at everything rather than genuinely good at any one thing.

Keeping the workspaces separate also makes the routing decision explicit. When a request comes in, the right worker is inferred automatically:

- Personal or everyday → **Personal Claw**
- Business, client work, or OSINT → **Business Claw**
- Evidence, DFIR, or case work → **Forensic Claw**
- Family scheduling or household → **Family Claw**

If something is genuinely ambiguous, the setup picks the most evidence-aligned worker and explains why — rather than quietly guessing and getting it wrong.

---

## Technical Setup

### Workspace layout

Every workspace follows the same directory pattern. The root holds a small set of identity and config files that define who the agent is and how it operates:

| File | Purpose |
|---|---|
| `AGENTS.md` | Operating rules and hard boundaries |
| `SOUL.md` | Tone and persona |
| `IDENTITY.md` | Agent identity |
| `USER.md` | Operator context — who the agent is working for and why |
| `MEMORY.md` | Durable notes that persist across sessions |
| `HEARTBEAT.md` | Ongoing maintenance and checklist guidance |
| `TOOLS.md` | Local setup notes for available tooling |

Beneath that, working directories handle the actual output:

```
notes/        scratch notes and research checkpoints
outputs/      deliverables and final artifacts
templates/    reusable structures
history/      notable command and tool history
repos/        checked-out projects the agent works on
skills/       per-tool instruction files
tools/        wrapper scripts and Docker build files
.openclaw/    runtime state
```

The same layout is reused across every specialised workspace. What changes is the content — the forensic workspace has different skills, tools, and memory than the personal one, but the shape is identical. That consistency makes it easy to navigate across workspaces and to add a new one without reinventing the structure.

### Skills files

Skills are Markdown files with a small YAML frontmatter header. There is no plugin registry — the agent reads the file and uses the documentation inside to understand when and how to use a capability.

```markdown
---
name: business-tool-httpx
description: Use httpx from the tools container for HTTP probing and live web triage.
user-invocable: false
---

# business-tool-httpx

## What it's for
HTTP probing and fingerprinting during recon or triage.

## Invocation
`/path/to/wrapper httpx [args...]`

## Rules
- Only use on targets within the current engagement scope
- Save interesting findings to outputs/
- Do not run broad scans without explicit instruction
```

The body covers what the tool is for, how to call it, scope limits, what outputs to keep, and any caveats. That combination — the frontmatter for discoverability, the body for judgment — is what separates a skill from a simple alias.

### How tools are made available

Tool registration is a three-part convention rather than a central system:

1. **The image provides the binaries** — tool packages are installed into a Docker image, giving the agent a reproducible, isolated environment to run them in
2. **The skill documents the tool** — each tool gets its own file under `skills/`, explaining usage and boundaries
3. **A wrapper runs the tool** — `tools/run-tool.sh` is the standard launcher; it executes the command inside the container with the workspace mounted in

This keeps the setup simple to extend. Adding a new tool means building it into the image, writing a skill file, and adding a wrapper line — no framework to configure.

### Family Claw Docker layout

The Family Claw instance is fully containerised and designed to move hosts without reconstruction. The directory tree is split into three clear areas:

```
docker/
    Dockerfile          custom family image
    compose.yml         service definition (loopback-only binding)
    .env.example        template — real runtime env is gitignored

state/
    Machine-managed runtime data: config, approvals, logs, cron
    metadata, task state, memory, locks, and queues.
    This is what OpenClaw writes to; not intended to be edited by hand.

workspace/
    Human-readable assistant workspace: daily notes, agent docs,
    MEMORY.md, HEARTBEAT.md, family-specific working notes.
    This is what you read and occasionally edit directly.
```

The deliberate split between `state/` and `workspace/` matters for portability and recovery. If something goes wrong with the runtime, `workspace/` is unaffected — it's just files. Moving to a new host means copying the directory tree and pointing Docker at it.

### Design decisions worth knowing about

A few choices that are less obvious from the structure alone:

**Loopback-only exposure.** The gateway is bound to localhost, not the network interface. The family assistant isn't reachable from other devices on the network unless explicitly forwarded. That was a deliberate choice, not a default.

**No secrets in the repo.** Credential files, tokens, and environment-specific config are gitignored and live only in the runtime environment. The repo contains only the structure and documentation.

**Thin customisation over upstream.** The Family Claw image is a small derivative of upstream OpenClaw rather than a fork. That keeps it easy to update without merging diverged codebases.

**Separate instance trees, not separate configs.** Private, business, and family are completely separate directory trees, not the same instance with different config flags. The isolation is structural, not just conceptual.

---

Return to [Technology](../technology.html)
