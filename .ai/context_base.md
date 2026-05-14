# rustpress-web-dev — AI Context

> **Purpose**: Orient an AI agent to this repo without reading the whole tree. Pair with the RustPress organisation context in `rustpress-core-base/.ai/context/CONTEXT_BASE.md`.

## Project

`rustpress-web-dev` is the **public documentation and marketing site** for RustPress, served at `dev.rustpress.net` (and linked from `rustpress.net`). It's a Vite-built React SPA with client-side routing — no SSR, no SSG, just a static `dist/` bundle for any static host (Cloudflare Pages, Vercel, Netlify, S3).

The site holds the **getting-started guides, plugin authoring docs, theme authoring docs, REST API + SDK reference, and code examples** that back the v1.0 launch narrative. Per the audit, content coverage is ~75% — solid for v1.0 but with known gaps (deployment guide, SDK code samples).

## Tech stack

- **Build**: Vite 5.4 + TypeScript 5.9
- **UI**: React 19.2 + React Router 6.30 (`react-router-dom`)
- **Styling**: Tailwind CSS 3.4 + PostCSS + autoprefixer
- **Animation**: framer-motion 12.23
- **UI primitives**: `@headlessui/react`, `lucide-react` icons
- **Syntax highlight**: `prismjs` + `@types/prismjs`
- **Toasts**: `react-hot-toast`
- **Lint**: eslint 9 + typescript-eslint
- **Package**: `dev-rustpress-net` v0.0.0 (private, not published)

## Directory layout

```
rustpress-web-dev/
├── package.json            # dev-rustpress-net, private
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig*.json
├── eslint.config.js
├── index.html              # Vite entry HTML
├── README.md               # currently the Vite-template boilerplate (P1 fix)
├── CONTRIBUTING.md
├── public/                 # static assets (vite.svg, etc.)
└── src/
    ├── main.tsx            # React root
    ├── App.tsx             # router root
    ├── App.css / index.css
    ├── assets/
    ├── components/
    │   ├── code/           # code-block / playground components
    │   ├── layout/         # nav, footer, doc shell
    │   ├── search/         # SearchModal (client-side index, no Algolia)
    │   └── ui/             # buttons, cards, etc.
    ├── context/            # React contexts (theme, search)
    ├── data/
    │   ├── docs-content.ts # docs content registry
    │   └── navigation.ts   # all top-level routes
    ├── pages/
    │   ├── Home.tsx        # animated hero, feature cards, social-proof stats
    │   └── docs/
    │       ├── getting-started/   # 6 pages: install, quick-start, structure, config, CLI
    │       ├── themes/            # 11 pages: basics → publishing
    │       ├── plugins/           # 11 pages: basics → publishing
    │       ├── api/               # overview, hooks, filters, DB, REST, GraphQL, webhooks, SDKs, auth, errors
    │       └── examples/          # theme/plugin/API examples + code playground
    ├── types/
    └── utils/
```

## Public API / what this repo exposes

The "API" here is the **set of routes** served. From `src/data/navigation.ts`:

- `/` — animated home (hero, features, quick-start, CTAs)
- `/docs/getting-started/*` — installation, quick-start, project structure, configuration, CLI commands
- `/docs/themes/*` — basics, structure, template hierarchy, tags, theme.json, styling, assets, hooks, responsive, testing, publishing
- `/docs/plugins/*` — basics, structure, hooks/actions, filters, database, REST API, admin pages, settings API, security, testing, publishing
- `/docs/api/*` — API overview, core functions, hooks reference, filters reference, database API, REST endpoints, GraphQL, webhooks, SDKs, rate limiting, authentication, error handling, types
- `/docs/examples/*` — theme/plugin/API examples, code playground

Search: in-page modal (`components/search/SearchModal.tsx`) over a client-side index. No external search service.

## How to build / test

```bash
npm install
npm run dev          # vite dev server (default port 5173)
npm run build        # tsc -b && vite build → dist/
npm run preview      # serve built dist/ for smoke-test
npm run lint         # eslint .
```

No test runner is configured yet. CI: `rustpress-net/rustpress-core-devops/actions/ci-node@main`.

## Cross-repo dependencies

- **Depends on**: nothing in the org at build time. All RustPress content is hand-authored markdown/TSX, not imported from other repos.
- **Implicit content debt**: this site must stay in sync with `rustpress-core-base` (API surface), the four SDK repos (signatures), `rustpress-ai-prompts` (prompt usage), and the enterprise theme docs. Out-of-sync content is the easy failure mode.
- **Depended on by**: nothing — leaf of the dependency graph; just a static deployable.

## Conventions

- **License**: missing (P1 blocker — add `LICENSE`, suggest MIT)
- **Commits**: Conventional Commits
- **Styling**: Tailwind utility classes; avoid bespoke CSS unless animations require it
- **Routing**: every new route MUST be registered in `src/data/navigation.ts`; the search index reads from there
- **Code blocks**: use the `components/code/` helpers for syntax-highlighted snippets so prismjs themes apply consistently
- **Dark mode**: supported in the home page palette; doc pages inherit the theme context

## Status

- Release readiness: **🟡 ALMOST READY** for v1.0 (see `AUDIT-docs-prompts.md` PART 1 and master `AUDIT.md`)
- Site shape is solid; home page is polished and launch-ready.
- Coverage ~75% — gaps are roadmap-acceptable but should be filled before public announce.

## Known issues / TODOs

From `AUDIT-docs-prompts.md` PART 1:

- **P0**: Social-proof stats on the home page (2.5k+ stars, 50k+ downloads, 1k+ contributors) are **placeholders** — verify against real GitHub/npm/crates.io numbers before public launch, or remove the stats block.
- **P1**: `README.md` is the Vite template boilerplate. Replace with a RustPress-specific README (what the site is, how to develop, how to deploy).
- **P1**: No `LICENSE` file at repo root. Add one (MIT recommended, consistent with the rest of the org).
- **P1**: No deployment guide in the docs themselves (`/docs/getting-started/` lacks a "deploy to X" page). Add at minimum: Docker, systemd, Cloudflare, generic VPS.
- **P1**: SDK reference page exists but lacks actual code samples for Rust/TS/Python/JS — pull from each SDK's README.
- **P1**: No hosting platform config committed (`vercel.json`, `_headers`, `wrangler.toml`). Pick a host and check in its config so deploys are reproducible.
- **P1**: `.ai/context_base.md` (this file) is now in place — close the audit item.

## When working in this repo

- The site is a **trust signal**. Visual polish on the home page and complete docs in `/docs/*` are non-negotiable for launch.
- When adding a new docs page: add the `.tsx` file under `src/pages/docs/<section>/`, register it in `src/data/navigation.ts`, add its content reference in `src/data/docs-content.ts`. Forgetting `navigation.ts` means the page works at the URL but is invisible to search and the sidebar.
- Code snippets that demonstrate API usage MUST match the live SDK signatures. When `rustpress-sdk-*` adds/renames a public symbol, find every example in `src/pages/docs/api/` that references the old name and update it.
- Don't pull marketing copy into TypeScript files — copy that needs to be edited by non-engineers should live in `src/data/` as plain data.
- Keep the bundle small. Audit dependencies before adding (the home animations already pull framer-motion + prismjs, which is non-trivial).
