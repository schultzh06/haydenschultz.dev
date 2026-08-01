# haydenschultz.dev

Source for my personal portfolio site, built with [Astro](https://astro.build), React islands, and Tailwind CSS v4.

## Stack

- **Astro** — pages, layouts, and routing
- **React** — for interactive islands where needed
- **Tailwind CSS v4** — styling, theme tokens defined in `src/styles/global.css`
- **Content Collections** — projects are authored as Markdown with a typed schema (`src/content.config.ts`), not hardcoded in pages
- **astro-icon** — icons from the `lucide`, `mdi`, and `simple-icons` sets

## Project Structure

```text
/
├── public/                         # static assets (favicons, etc.)
├── src/
│   ├── components/                 # Hero, StackMarquee, ThemeToggle
│   ├── content/
│   │   └── projects/                # one Markdown file per project
│   ├── content.config.ts            # content collection schemas
│   ├── consts.ts                    # socials + tech stack data
│   ├── layouts/
│   │   └── Layout.astro             # shared page shell (header/footer/theme)
│   ├── pages/
│   │   ├── index.astro              # home page (hero + project list)
│   │   └── projects/[...id].astro   # per-project detail page
│   └── styles/global.css            # Tailwind theme tokens, light/dark colors
├── astro.config.mjs
└── CONTENT.md                       # scratch notes for project write-ups in progress
```

## Adding a project

Add a new Markdown file under `src/content/projects/`, following the frontmatter schema in `src/content.config.ts` (title, hook, summary, period, order, tech, exactly 3 `bullets`, plus optional `depth`, `limitations`, `links`, and `media`). It'll automatically appear on the home page and get its own `/projects/<slug>` route.

## Commands

All commands are run from the root of the project, using `pnpm`:

| Command             | Action                                          |
| :------------------ | :----------------------------------------------- |
| `pnpm install`       | Installs dependencies                            |
| `pnpm dev`           | Starts local dev server at `localhost:4321`      |
| `pnpm build`         | Builds the production site to `./dist/`          |
| `pnpm preview`       | Previews the production build locally            |
| `pnpm astro check`   | Type-checks `.astro` files and content schemas   |
| `pnpm astro ...`     | Runs other Astro CLI commands (e.g. `astro add`) |
