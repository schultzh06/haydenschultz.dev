---
title: "Subpixel"
role: "Sole Developer"
hook: "Encrypts a message and hides the ciphertext in the low bits of a PNG."
summary: "Python CLI that encrypts a message using AES-256-GCM and Argon2id key derivation, then embeds it in an image's least significant bits, where it can be symmetrically extracted by a recipient with the right passphrase."
period: "2026"
order: 2
tech:
  - Python
  - cryptography
  - Pillow
  - argparse
  - pytest
  - AES-256-GCM
  - Argon2id
  - LSB steganography
bullets:
  - "Derives an encryption key from a passphrase via Argon2id with a random per-message salt."
  - "Encrypts with AES-256-GCM so a wrong passphrase or a modified carrier fails loudly."
  - "Embeds the ciphertext across the least significant bits of a PNG, checking capacity first."
depth:
  - "Derives the key with Argon2id at m=64 MiB, t=3, p=4, using a 16-byte random salt per message so identical passphrases produce distinct keys and precomputation does not apply."
  - "Generates a 12-byte random nonce per message so no key/nonce pair repeats, and verifies GCM's 16-byte authentication tag on extraction so tampering or a wrong passphrase raises rather than returning garbage."
  - "Checks carrier capacity against payload size before writing, and packs the blob as a length prefix followed by salt, nonce, ciphertext, and tag."
  - "Covers the encode/decode round trip, capacity limits, and tamper detection with pytest so regressions surface between versions."
limitations:
  - "Requires a lossless carrier — PNG only. JPEG's lossy compression destroys the embedded bits."
  - "Capacity is 3 bits per pixel, so a 1920x1080 PNG carries roughly 750 KB."
  - "LSB embedding is statistically detectable via chi-square and RS analysis. This demonstrates the technique; it is not a covert channel."
links:
  repo: "https://github.com/schultzh06/subpixel"
---

## Why I built this

Started as a way to brush up on Python after a stretch of not writing any. It took
its direction from cybersecurity work — a municipal government IT internship, plus
reading on key derivation and brute-force defense — and became a chance to implement
encryption hands-on rather than only read about it. LSB steganography got bundled in
as a second topic I'd stumbled onto and wanted to actually build.

## Payload layout

The embedded blob is structured as:

```text
┌──────────┬──────────┬───────────┬──────────────┬──────────┐
│  length  │   salt   │   nonce   │  ciphertext  │   tag    │
│  4 bytes │ 16 bytes │  12 bytes │   N bytes    │ 16 bytes │
└──────────┴──────────┴───────────┴──────────────┴──────────┘
```

The length prefix lets the extractor know how many bits to read before it can
authenticate anything, so a truncated or oversized carrier is caught early.