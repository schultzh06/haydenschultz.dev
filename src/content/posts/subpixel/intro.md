---
project: subpixel
title: Introducing Subpixel
description: A Python CLI that encrypts a message with a passphrase and hides it in the low bits of a PNG.
published: 2026-10-05
tags: [python, cryptography, steganography]
---

## Why I built it

Subpixel started as a way to get back into Python after a stretch of not writing
any. It took its direction from cybersecurity: a municipal government IT internship,
plus reading about key derivation and brute-force defense. I wanted to implement
encryption hands-on instead of just reading about it. Steganography was a second
topic I'd stumbled onto and wanted to build, so the two ended up in one tool.

## What it does

You give Subpixel a message, a passphrase, and a PNG. It:

1. Derives a key from the passphrase with Argon2id, using a fresh random salt for
   every message.
2. Encrypts the message with AES-256-GCM.
3. Hides the result in the least significant bits of the image's pixels, after
   checking that the image is big enough to hold it.

The output looks identical to the original image. Anyone with the same passphrase
can extract the message. With the wrong passphrase, or if the image has been
modified, extraction fails with an error instead of returning garbage.

## What it isn't

Subpixel demonstrates the technique; it isn't a covert channel. LSB embedding can
be detected with statistical analysis, and it only survives lossless formats, since
JPEG compression destroys the hidden bits. The encryption is what keeps the message
private. The steganography only keeps it out of sight.

The [project page](/projects/subpixel) has the payload layout and the cryptographic
parameters.
