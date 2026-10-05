---
title: "Docket"
hook: "A self-hosted academic dashboard that merges Canvas and email into one terminal agenda, without data leaving the homelab."
summary: "A single-user Go daemon that ingests Canvas, email, and calendar sources into SQLite, serves them over a Connect-RPC API reachable only through Tailscale, and presents a merged agenda in an Ink terminal UI, with a local LLM layer planned for summarizing and triaging untrusted mail."
role: "Sole Developer"
period: "2026"
order: 5
tech:
  - Go
  - Connect-RPC
  - Protocol Buffers (buf)
  - SQLite
  - sqlc
  - goose
  - TypeScript
  - Ink
  - Ollama
  - Tailscale
  - systemd
  - Proxmox LXC
  - just
  - GitHub Actions
bullets:
  - "Go daemon with incremental Canvas ICS sync into SQLite, using conditional GETs and per-item hashing so unchanged data is never rewritten."
  - "Protobuf-first Connect-RPC API generated into a Go handler and a typed TypeScript client, with CI failing on contract drift or stale codegen."
  - "Deployed as a sandboxed systemd service in an unprivileged LXC, listening only on Tailscale behind a constant-time bearer-token check."
depth:
  - "Sync is split into three layers: fetch (timeouts, conditional GET, size-limited reads), parse (a pure function tested against fixture files), and persist (change detection inside one transaction). Because many calendar servers stamp every response with a fresh DTSTAMP, a whole-body hash isn't enough, so each item also gets a hash of only its meaningful fields."
  - "Removal is windowed and defensive: an item missing from the feed is marked removed (never hard-deleted) only if it falls on or after the feed's earliest item, and an empty feed skips the removal pass entirely, so a broken upstream response cannot mass-delete the agenda. Manual 'done' status survives syncs, even when a deadline moves."
  - "SQLite is configured deliberately on every pooled connection: WAL mode, foreign keys on, a busy timeout, and immediate transaction locking to avoid read-then-upgrade deadlocks. Tables are STRICT, timestamps are UTC Unix seconds, and goose migrations are embedded in the binary so the daemon migrates its own database and deploy stays a single-file copy."
  - "The Canvas feed URL is itself a bearer credential, so the fetcher redacts URLs from network errors before they reach the logs. Otherwise the first transient failure would write the secret into journald."
  - "Secrets live in a root-owned 0600 env file that systemd reads before dropping privileges, so the service user gets the values but can't read the file. The unit runs with ProtectSystem=strict, NoNewPrivileges, an empty capability set, and MemoryDenyWriteExecute; its only writable path is its own state directory."
  - "Untrusted input is the threat model's center: every email body and Canvas announcement is treated as hostile. The planned LLM layer gives the model that reads raw mail no tools at all, only schema-constrained JSON output, and every write must pass human approval in the TUI and land in an audit log."
limitations:
  - "In progress: Canvas ingestion, the API skeleton, TUI, CI, and deployment are done; email ingestion via Fastmail JMAP is next, and the LLM layer, digest, and calendar writes are still planned."
  - "WPI blocks third-party Microsoft Graph apps, so school mail has to reach docket through server-side redirects into Fastmail rather than direct API access."
  - "The Canvas ICS feed has no submission status, announcements, or undated assignments, so completion is tracked with a manual status instead."
  - "Known gap: if the single earliest item in a feed is deleted upstream, the removal window shrinks past it and that deletion goes undetected."
  - "Single-user and private by design. There is no multi-user support, public hosting, or mobile app, and none is planned."
links:
  repo: "https://github.com/schultzh06/docket"
---

## What it is

docket is a personal academic dashboard: it pulls deadlines and messages from the
places school actually happens — Canvas, email, and eventually calendars — and
merges them into a single agenda in the terminal. It runs on my Proxmox homelab,
is reachable only over Tailscale, and keeps all data and inference local.

It's also a deliberate exercise in backend and security design. Fetching,
scheduling, storage, and change detection are plain deterministic code; a local
model (qwen2.5 7B on Ollama) will only be brought in where judgment is actually
needed — summarizing, categorizing, and pulling deadlines out of unstructured
email. Every boundary is enforced in code, and the known gaps are written down.

## Architecture

```text
                       ┌──────────── homelab (Proxmox) ─────────────┐
 Canvas ICS feed ──┐   │  ┌─ docket LXC ─────────────┐  ┌─ Ollama LXC ─┐
 Fastmail JMAP ────┼──────▶│ docket daemon (Go)       │  │ qwen2.5 7B   │
 (WPI + Gmail      │   │  │  pollers ─▶ SQLite (WAL) │─▶│ RTX 2060 6GB │
  redirected in)   │   │  │  Connect-RPC API         │  └──────────────┘
                   │   │  └───────────▲──────────────┘                  │
                   │   └──────────────│─────────────────────────────────┘
                   │                  │ Tailscale + bearer token
                   │           ┌──────┴───────┐
                   │           │ Ink TUI (TS) │  laptop
                   │           └──────────────┘
```

The daemon is one static Go binary. Pollers fetch each source on an interval and
write to SQLite, and the TUI talks to the daemon over Connect-RPC. The HTTP server
and pollers share an errgroup, so a fatal error in one cancels the others and
systemd restarts the process, while a single failed sync is just logged and
retried on the next tick.

## Why these choices

**Go for the daemon.** Goroutines fit the workload — pollers, a GPU worker, and a
server running concurrently in one process — and it builds to a single static
binary, so deployment is copying one file.

**Connect-RPC over REST.** The API is written once in protobuf and generated into
both sides, so the compiler catches contract drift. It still runs over plain HTTP,
which keeps curl debugging and a future browser client simple.

**sqlc instead of an ORM.** Queries are real SQL, and a reference to a missing
column fails at build time rather than at runtime.

**Decide in Go, not in one clever upsert.** Each event is looked up and then
inserted, updated, or skipped by explicit logic. It costs an extra query per
event, which is negligible with an in-process database, and keeps the rules
readable and testable.
