---
project: docket
title: Introducing Docket
description: A self-hosted academic dashboard that pulls Canvas and email into one terminal agenda, without any data leaving my homelab.
published: 2026-10-05
tags: [go, self-hosted, security]
---

## The problem

School happens in too many places at once. Deadlines live in Canvas, announcements
and professor emails land in my inbox, and none of it agrees on a single view of
what's due next. Docket is my answer: one agenda in the terminal that merges all
of those sources, running entirely on my own hardware.

## What it is

Docket is a single-user Go daemon. It polls Canvas (and soon email) on an
interval, stores everything in SQLite, and serves it over a Connect-RPC API that's
only reachable through Tailscale. An Ink terminal UI on my laptop talks to that
API and shows the merged agenda.

It runs as a locked-down systemd service in an unprivileged LXC on my Proxmox
homelab, so the data and, eventually, the model inference stay local.

## Why build it this way

Docket is as much a backend and security exercise as it is a tool for me. A few
principles drive most of the decisions:

- **Deterministic code first.** Fetching, scheduling, storage, and change
  detection are plain, testable Go. A local LLM only comes in where judgment is
  actually needed, like summarizing or triaging email.
- **Treat every input as hostile.** Email bodies and Canvas announcements are
  untrusted. The model that eventually reads raw mail gets no tools at all, and
  anything that writes data has to pass my approval in the TUI first.
- **Fail safe, not loud.** A broken upstream feed should never wipe my agenda, and
  a credential should never end up in a log line.

## Where it stands

Canvas ingestion, the API, the TUI, CI, and deployment are working. Email
ingestion through Fastmail is next, followed by the local LLM layer and calendar
support.

The [project page](/projects/docket) goes deeper into the architecture and the
tradeoffs behind it.
