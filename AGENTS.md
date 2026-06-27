# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

## Architecture

Single-page portfolio built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and TypeScript.

**Key flows:**
- `app/layout.tsx` — root layout; wraps everything in `ThemeProvider` (next-themes, `attribute="class"`), loads Google Fonts (`Space_Grotesk` → `--font-space-grotesk`, `Manrope` → `--font-manrope`), mounts Vercel Analytics and Speed Insights
- `app/page.tsx` — single `"use client"` page; pulls all copy from `portfolioConfig`
- `app/providers.tsx` — thin wrapper re-exporting `next-themes` `ThemeProvider`
- `app/globals.css` — Tailwind base + CSS variables for Gruvbox palette and theme-aware `background`/`foreground` tokens; defines `font-display` (Space Grotesk) and `font-sans` (Manrope)

**Content configuration:**
All personal content (name, role, motto, social links, CV path, profile image) lives in `config/portfolio.ts` as `portfolioConfig`. This is the single place to edit when updating portfolio data.

**Design system:**
Gruvbox color palette applied via Tailwind custom colors (`gruvbox-yellow`, `gruvbox-gray`, etc.) and CSS variables. Theme toggle uses View Transitions API with a fallback for unsupported browsers.

**Static assets:**
Profile photo (`public/photo.webp`) and CV (`public/cv.pdf`) are served from `public/`.

**Deployment:** Vercel (`@vercel/analytics`, `@vercel/speed-insights`).

## Comments & docs

**No documentation in code** — zero JSDoc, zero narrative comments. A strictly-typed symbol with a good name already says _what_; the _why_ belongs in a test or a clearer structure. By file type:

- **`.ts`/`.tsx`** — no JSDoc, no inline `//`/`/* */`. The only survivors are tool directives (`// eslint-disable`, `// @ts-*`). Identifiers and error/log messages stay in **English**.
- **`.env`** — boxed header (`# ===`), variables grouped by UPPERCASE category; no per-variable comments.
- **`.md`** — concise prose, no redundancy.

## Git / commits

- **No `Co-Authored-By` trailer** — keep authorship clean.
- **Format: `[scope:type] subject`.** Subject in **Portuguese**, lowercase, descriptive, **no action-noun** (the type carries the verb). The type lives **inside the brackets** — never a loose `tipo:` prefix.
  - **scope**: `web` `config` `infra` `docs` `root`; join with `/` when spanning two (`web/config`).
  - **type** (EN jargon): `feat` `fix` `refactor` `docs` `chore` `perf` `build`. Drop `:type` when the scope _is_ the type (e.g. `[docs]`). Capitalize tech names in the body (NextJS, Vercel, Tailwind).
- **Subject ≤ ~72 chars, one line** — usually all it needs. Add a body **only** when the _why_ genuinely requires it, and keep it to a couple of short bullets — never a file-by-file list.

```
[web:feat] secção de projetos com filtro por tecnologia
[config:fix] cvPath apontando para ficheiro correto
[web:refactor] ThemeToggle com View Transitions
[docs] AGENTS.md atualizado
```

## Subagents & skills

Delegate parallel/repetitive or context-heavy work to subagents (Agent tool); invoke skills (`/<name>`) when a task matches. Prefer a Sonnet subagent for mechanical/verbose work.
