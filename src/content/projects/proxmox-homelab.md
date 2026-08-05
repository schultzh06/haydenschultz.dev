---
title: "Proxmox Detection Engineering & Hobby Homelab"
hook: "Built a hardened Proxmox lab, attacked it myself, and proved the SIEM saw it."
summary: "A self-hosted Proxmox homelab used to close the gap between prevention and detection — hardening the stack, then running live attacks against it and verifying they surface as correlated MITRE-mapped alerts."
period: "2026"
role: "Solo · architecture, build, threat modeling, and documentation"
order: 3
tech:
  - Proxmox VE
  - LXC (unprivileged)
  - KVM/QEMU
  - Debian 12
  - Wazuh 4.14
  - MITRE ATT&CK
  - Hydra
  - Tailscale / WireGuard
  - OpenSSH (FIDO2 ed25519-sk)
  - YubiKey
  - restic + Backblaze B2
  - systemd
  - Ollama + Open WebUI
  - NVIDIA GPU passthrough
  - Bash
  - Git
bullets:
  - "Proxmox VE host running hardened LXCs and a Wazuh VM, with sensitive services bound to a Tailscale mesh rather than the flat LAN."
  - "Wazuh 4.14 all-in-one deployed on a Debian 12 VM, with an agent collecting SSH auth logs from a sandbox container."
  - "Layered hardening throughout: key-only SSH, FIDO2 hardware-backed host keys, and a pull-based backup mirror a compromised client cannot reach."
depth:
  - "The lab started as all prevention and no visibility — keys, read-only credentials, container isolation, but nothing watching. Entry-level security work is SOC-shaped, so the detection half was the actual gap worth closing."
  - "Chose a VM over an LXC for the Wazuh node: the OpenSearch indexer is memory-map-heavy and finicky under an unprivileged container, and the unprivileged-device-boundary story was already told elsewhere in the lab."
  - "The detection itself is the point: individual auth failures fired rule 5760 at level 5, but the composite rule 2502 fired at level 10 only once the manager correlated many failures from one source IP inside a window. Logging is not detection."
  - "The Ollama endpoint has no application-layer auth at all — it accepts and discards bearer tokens for client-library compatibility. That put the entire access-control burden on the network layer, which is the whole justification for binding it to a Tailscale IP instead of 0.0.0.0."
  - "Backups run pull-only: an isolated container fetches from Backblaze B2 using read-only, bucket-scoped keys, so a compromised laptop with delete-capable credentials has no path to the onsite copy."
  - "16GB of RAM is the binding constraint and shapes the architecture — the GPU/LLM container is stopped to free headroom before the SIEM starts. Sequence, don't stack."
  - "Documentation is treated as a deliverable, not an afterthought: rejected alternatives stay visible, and the split between publishable architecture and never-publishable credentials is itself a deliberate application of Kerckhoffs's principle."
limitations:
  - "Single physical host, 16GB RAM — the SIEM and the GPU workload cannot run concurrently, so no sustained multi-service telemetry."
  - "Flat home LAN with software-level isolation only; real VLAN segmentation needs a managed switch and is deferred."
  - "Detection so far uses Wazuh's built-in ruleset against a single technique (T1110). Custom rule authoring, tuning, file integrity monitoring, and active response are the next phase, not done."
  - "Attacking yourself from a laptop on the same subnet is a controlled drill, not adversary emulation — it validates the pipeline, not the coverage."
links:
  repo: "https://github.com/schultzh06/homelab-buildlog"
---

## Why I built this

This started as a way to learn infrastructure by running it — turning an old desktop into an always-on Proxmox host and building outward from there. What I kept pulling toward was the full loop: attack, detect, respond, against a stack I built myself and have to keep working, with the reasoning behind each decision written down as I went.

The turning point was noticing the lab was entirely defensive. I had key-only SSH, hardware-backed authentication, an isolated pull-based backup mirror, and a carefully minimal device hole for GPU sharing into an unprivileged container — and no way to know if any of it had ever been tested. Prevention without detection means you find out you were wrong from someone else. So I stood up Wazuh, put an agent on the target, brute-forced it from my own laptop, and watched the manager escalate a pile of auth failures into a single correlated alert with the attacker's IP attached.

The most instructive moment was the attack that didn't work: hydra refused to even try, because the target only offered public-key auth. The control pre-empted the attack, which is the ideal outcome and also completely invisible — I had to deliberately weaken the box to generate something worth detecting. That tension between what you prevent and what you can see is what the project keeps circling back to.

It's still in progress. Custom detection rules, file integrity monitoring, and tighter network isolation are the next things I'm working through, and the build log gets updated as I go — including the parts that didn't work the first time.