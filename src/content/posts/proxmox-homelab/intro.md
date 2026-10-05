---
project: proxmox-homelab
title: Introducing My Proxmox Homelab
description: An old desktop turned Proxmox host, hardened, then attacked by me to prove the SIEM could actually see it.
published: 2026-10-05
tags: [proxmox, linux, wazuh, detection]
---

## How it started

The homelab began as a way to learn infrastructure by actually running it. I turned
an old desktop into an always-on Proxmox host and kept building outward: hardened
containers, a Tailscale mesh, hardware-backed SSH keys, off-site backups, and a GPU
shared into a container for local LLMs.

## The gap

At some point I realized the whole lab was prevention with no visibility. I had
key-only SSH, YubiKey-backed authentication, and an isolated pull-based backup
mirror, but no way to know whether any of it had ever been tested. Prevention
without detection means you find out you were wrong from someone else.

## Closing it

So I stood up Wazuh on a Debian VM, put an agent on a sandbox container, and
brute-forced it from my own laptop. The individual login failures showed up as
low-severity events, and once enough of them came from one IP in a short window, the
manager correlated them into a single higher-severity alert, mapped to MITRE ATT&CK,
with my laptop's IP attached.

The most useful moment was the attack that didn't work at first: Hydra refused to even
try, because the target only accepted public-key authentication. The control had
already stopped the attack, which is the ideal outcome and also completely
invisible. I had to deliberately weaken the box to generate something worth
detecting.

## Where it stands

The lab is a living project. Everything runs on a single host with 16GB of RAM,
which shapes a lot of the decisions. The build log documents each step, including
the parts that didn't work the first time.

The [project page](/projects/proxmox-homelab) has the full architecture and the
reasoning behind it.
