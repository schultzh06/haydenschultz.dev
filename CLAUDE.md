# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for Hayden Schultz (haydenschultz.dev), built with Astro + React islands + Tailwind CSS v4. Content (projects, and eventually posts) is authored as Markdown in content collections rather than hardcoded in pages.

## Development

Package manager is `pnpm` (see `pnpm-workspace.yaml` / `pnpm-lock.yaml`) — use `pnpm`, not `npm` or `yarn`.

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Other commands:

```
pnpm build     # production build to ./dist/
pnpm preview   # preview the production build locally
pnpm astro check   # type-check .astro files and content collection schemas
```

There is no test suite or linter configured in this repo.

## Architecture

- **Content collections drive the project list.** `src/content.config.ts` defines a `projects` collection (glob-loaded from `src/content/projects/*.md`) and a `posts` collection (not yet used on any page). The Zod schema enforces exact shapes — e.g. `bullets` must be exactly 3 strings, `tech` at least 1 — so adding/editing a project means matching that schema in frontmatter, not just writing prose.
- **Two routes consume the `projects` collection**: `src/pages/index.astro` lists all non-draft projects sorted by `order`, and `src/pages/projects/[...id].astro` is the dynamic per-project page (`getStaticPaths` from the collection). Shared fields (`title`, `hook`) use matching `transition:name` values across both pages so Astro's `ClientRouter` animates them as the same element during navigation.
- **`Layout.astro`** is the single shell for every page: fonts, global CSS, header/nav/socials, footer, and the dark-mode bootstrap script (reads `localStorage.theme`, falls back to `prefers-color-scheme`, sets the `dark` class before paint to avoid flash). It also shells out to `git log` at build time to render a "last updated" date in the footer — this only works when building inside a git checkout with history.
- **Theme toggling** (`ThemeToggle.astro`) toggles the `dark` class on `<html>` and persists to `localStorage`. Because the site uses Astro's `ClientRouter` (client-side navigation), the toggle re-binds and reapplies theme state on the `astro:page-load` event rather than only on initial `DOMContentLoaded` — any new script that touches page state on load needs the same pattern or it will break after client-side nav.
- **Styling** is Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config.js` — theme tokens are declared in `src/styles/global.css` under `@theme`, with light/dark color values swapped via a `.dark` class using `@custom-variant dark`). Colors, fonts (Fraunces/Geist/JetBrains Mono via Fontsource) are all CSS variables, not Tailwind config.
- **Icons** come from `astro-icon` backed by `@iconify-json/*` icon sets (`lucide`, `mdi`, `simple-icons`); reference icons by `"set:name"` string, no manual SVG imports.
- **`src/consts.ts`** centralizes cross-page data: `SOCIALS` (header/footer links) and `STACKROWS` (tech stack chips rendered by `StackMarquee.astro`).
- **`CONTENT.md`** at the repo root is a brainstorming/staging doc for project write-ups before they're turned into real entries under `src/content/projects/`. It intentionally contains TODOs and is not shipped.
