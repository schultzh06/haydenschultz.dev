---
title: "Music Audio Visualizer"
hook: "Turns whatever's playing in your browser into a real-time, color-reactive 3D visualizer."
summary: "Real-time 3D audio visualizer driven by FFT analysis, with Spotify integration for track metadata, album-reactive color palettes, and synced lyrics."
period: "2026"
order: 2
role: "Sole Developer"
tech:
  - TypeScript
  - React
  - Vite
  - Three.js
  - react-three-fiber
  - Tailwind v4
  - Web Audio API
  - Spotify Web API
  - OAuth 2.0 PKCE
  - LRCLIB
  - node-vibrant
tech_note: "TODO — confirm react-router is still in use; not referenced in recent build notes."
bullets:
  - "Real-time FFT audio pipeline captures tab audio and drives frequency-reactive Three.js scenes at 60fps."
  - "Paired foreground/background scene architecture keeps visuals choreographed together instead of mixed-and-matched."
  - "Album artwork is color-extracted in real time and eased into the active visualizer's palette."
depth:
  - "Audio pipeline: tab audio is captured via getDisplayMedia (requiring a user-gesture-triggered share action and HTTPS in dev), piped through a Web Audio AnalyserNode, and grouped into bass/mid/treble bands for onset detection — all client-side, since Spotify deprecated its own audio-analysis endpoints for new apps in late 2024."
  - "Scene architecture: each visualizer is a matched foreground/background pair rather than independently swappable layers, so both halves react to the same audio and palette data in sync ('reactive parity'). The first scene, MinimalBars, pairs a bloom-postprocessed Three.js bar visualizer with a CSS blob background animated by a hand-rolled JS RGB-lerp loop, since CSS transitions can't interpolate gradients on their own."
  - "Palette system: node-vibrant extracts colors from album art, cached in a module-level store read via useSyncExternalStore so new palettes are derived during render rather than pushed through effect-driven setState. Colors then propagate to every palette-reactive element (blobs, bar glow) on a shared 800ms eased transition, so the whole scene re-themes as one unit rather than piecemeal."
  - "Rendering performance: AudioContext is lazily instantiated via a useState initializer to avoid recreating it per render, and all per-frame updates (bar heights, color lerps) mutate refs/DOM directly inside requestAnimationFrame instead of going through React state — keeping the animation-critical path off the render cycle. Missing Three.js material disposal in cleanup was the source of an early ~600MB memory leak, now fixed."
  - "Auth and metadata: Spotify's PKCE flow runs entirely client-side (no backend secret to hold), with silent refresh built in from the start rather than retrofitted, since access tokens expire hourly. Now-playing data is polled to drive both the overlay and the LRCLIB lyric sync, which parses LRC timestamps and tracks the active line against playback position."
limitations:
  - "Tab-audio capture is reliable on Chrome/Edge desktop only; macOS can't share system audio (tab audio only), so a fallback message is shown rather than silently failing."
  - "Spotify app runs in Development Mode, capped at a small manual user allowlist — acceptable for a portfolio piece, not meant to scale to public users."
  - "Spotify's /audio-analysis and /audio-features endpoints were deprecated for new apps in late 2024, so all beat/onset detection is derived client-side from live FFT data rather than Spotify's own analysis."
  - "TODO — behavior when no track is playing / no lyrics are found on LRCLIB."
  - "TODO — mobile fallback and settings panel are still on the roadmap, not yet shipped."
links:
  repo: "https://github.com/schultzh06/music-visualizer"
---

## Why I built this

This came right off the back of a CMA (insurance) project, where I found I really enjoyed front-end work more than I expected. At the same time, I'd been wanting a music visualizer for a while. I'm big into music, and it felt like a natural project to build for myself rather than for a client.

The album-art color extraction was inspired by Apple's lock screen display, but I wanted to push in the opposite direction: less subtle, more forefront. Instead of a quiet background tint, the palette drives the visualizer itself.