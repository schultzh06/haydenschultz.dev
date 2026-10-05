---
project: music-visualizer
title: Introducing the Music Audio Visualizer
description: A real-time 3D visualizer that reacts to whatever's playing in your browser and re-themes itself from the album art.
published: 2026-10-05
tags: [typescript, react, threejs, audio]
---

## Why I built it

This came right after the insurance CMS project, where I found out I enjoyed
front-end work a lot more than I expected. I'm also big into music and had wanted a
visualizer for a while, so this was a project for myself rather than for a client.

The color idea came from Apple's lock screen, which tints itself to match the album
art. I wanted to push that the other way: instead of a quiet background tint, the
album's palette drives the whole visualizer.

## What it does

The visualizer captures audio from a browser tab, runs it through an FFT, and splits
it into bass, mid, and treble bands that drive a Three.js scene at 60fps. When the
track changes, it pulls the album art from Spotify, extracts a color palette, and
eases the entire scene into the new colors. Synced lyrics from LRCLIB follow along
with playback.

Each visualizer is a matched foreground and background pair, so both halves react to
the same audio and palette together instead of feeling like two separate layers.

## Working around Spotify

Spotify deprecated its audio-analysis endpoints for new apps in late 2024, so all of
the beat and onset detection happens client-side from the live audio. Spotify login
runs entirely in the browser with OAuth PKCE, so there's no backend secret to
protect.

## Where it stands

The audio pipeline, palette system, Spotify integration, and lyrics are working with
the first scene. Tab audio capture is reliable on desktop Chrome and Edge.

The [project page](/projects/music-visualizer) covers the rendering and performance
details.
