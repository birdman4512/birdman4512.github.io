# OpenClaw setup overview

This is the current layout of the OpenClaw setup and how the pieces
fit together.

## 1) The main agent workspaces

### Personal Claw
- Purpose: Dean’s private/direct assistant.
- Best for: personal tasks, private context, general help, and
everyday coordination.
- Tone/style: concise, discreet, composed.
- Current home: `/home/dean/openclaw-agents/personal-claw`
- This is the default place for private conversations.

### Business Claw
- Purpose: QuirkyIT business support.
- Best for: business planning, defensive OSINT, service packaging,
client-ready reports, scopes, and proposals.
- Current home: `/home/dean/openclaw-agents/business-claw`
- It is kept separate from private work so business context stays
clean and reusable.
- If work becomes evidence-heavy, DFIR-heavy, or case-driven, it hands
off to Forensic Claw.

### Forensic Claw
- Purpose: lawful DFIR and intrusion analysis.
- Best for: evidence triage, log analysis, timelines, disk images,
memory, PCAPs, and report-ready findings.
- Current home: `/home/dean/openclaw-agents/forensic-claw`
- Case storage lives under: `/home/dean/openclaw-cases/cases/<case-id>/`
- It is strict about evidence: confirm facts, separate inferences, and
do not guess.

### Family Claw
- Purpose: family-facing assistant.
- Best for: tutoring help, reminders, calendar management, and safe
household assistance.
- Current home: `/home/dean/openclaw-instances/family`
- It is intentionally separate from Dean private and business work.
- Dean is the admin/operator for the family setup.

## 2) How the agents work

The setup is intentionally split by job:
- **Personal Claw** handles private/direct work.
- **Business Claw** handles QuirkyIT business and OSINT-style work.
- **Forensic Claw** handles technical evidence and case work.
- **Family Claw** handles family-safe scheduling and assistance.

That separation keeps each workspace focused and reduces
cross-contamination between private, business, forensic, and family
context.

## 3) How tools and skills work

### Tools
Tools are the actual commands and wrappers an agent can use.
Examples:
- shell commands
- Google Workspace access via `gog`
- forensic wrappers for disk/log/memory analysis
- business OSINT/discovery tools

### Skills
Skills are the instructions for how to use those tools well.
They usually cover:
- when to use the tool
- safe operating boundaries
- preferred command patterns
- caveats and limitations
- output expectations

In practice:
- **tools** do the work
- **skills** tell the agent how to use them properly

Each workspace keeps its own skills and notes so the setup can stay
tuned to the job it does.

## 4) Family Claw setup

Family Claw is a portable Docker-based OpenClaw instance.

### Layout
- `docker/` — compose and environment files
- `state/` — OpenClaw config/state mount
- `workspace/` — family-specific workspace
- `env/` — reserved for secrets/env support

### Current runtime details
- Custom family image pinned via `docker/Dockerfile` and `docker/.env.example`
- Host port `18801` maps to container port `18789`
- Google credential paths and gateway tokens live only in ignored runtime files
- Designed to be moved to a new host later by copying the directory tree

### Family behavior
- Focused on tutoring, reminders, and calendar help
- Uses the shared `Bird Family` calendar for normal scheduling
- Uses `Birthdays / Anniversarys` for birthdays and anniversaries
- Keeps a low-risk, family-safe posture
- Dean remains the admin/operator behind the scenes

## 5) Why this structure works

- Keeps private, business, forensic, and family work separated
- Makes it easier to add specialist behavior without turning
everything into one giant pile
- Lets each workspace have its own tools, skills, memory, and tone
- Makes handoffs cleaner when work moves from one domain to another

## 6) Practical routing rule

When a request comes in, the assistant should infer the right worker
automatically:
- private/direct → Personal Claw
- business/OSINT/client work → Business Claw
- evidence/case/DFIR work → Forensic Claw
- family scheduling/help → Family Claw

If the request is ambiguous, it should choose the most
evidence-aligned worker and explain why.