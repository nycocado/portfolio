# design-sync notes — portfolio

This repo is a single-page Next.js app, not a component library — there's no
`dist/` build, so the converter runs in synth-entry mode directly against
`components/`. Several components are tightly coupled to Next.js's own
runtime (RSC, the app router, `next-intl`'s request pipeline); the notes below
record what that coupling meant for the sync.

## Floor-card components (unauthored, by design — not a gap to fill)

- **Navbar, ScrollCue, SocialLinks** — real React Server Components
  (`export async function X()`, using `next-intl/server`'s `getTranslations`).
  React's client renderer refuses to render an async function as a JSX
  component at all ("Only Server Components can be async"); this isn't a
  props/provider problem, it's a hard structural mismatch between "async RSC"
  and any renderer outside Next's own RSC pipeline. Not authorable without
  reimplementing the component.
- **LanguageSwitcher** — uses `usePathname()` from `@/i18n/navigation`
  (next-intl → `next/navigation`), which reads a router context only Next's
  own App Router installs. No config knob supplies that context standalone.
- **HtmlLangSync, SmoothScroll** — both literally `return null`; they're
  side-effect-only (sync `<html lang>`, wire up Lenis smooth scroll). Nothing
  to preview visually — the floor card is the honest, correct outcome.

If a future Next/next-intl version exposes a way to run these standalone
(e.g. a testing harness for RSC), revisit — until then these six stay on the
floor card indefinitely, not "to author later."

## Known render warns

- `MobileMenu` — the real component root is `className="md:hidden"` (Tailwind
  `md` = 768px), so it's invisible at our local validate tool's fixed 1200px
  viewport. `cfg.overrides.MobileMenu` forces `cardMode:"single"` +
  `viewport:"375x220"` so package-capture.mjs's per-card viewport renders it
  correctly for grading; `package-validate.mjs`'s render check has no
  per-card viewport (always 1200x800) and will keep printing
  `[RENDER_BLANK]`/`[RENDER_THIN]` for this one — expected, non-blocking,
  don't chase it. The claude.ai/design card pane itself is narrower than the
  md breakpoint per the tool's own comment, so it should show correctly there.

## process.env / next/image shims (`.design-sync/process-shim.mjs`)

Several components import `next/image` and next-intl's navigation helpers,
both written assuming Next's own webpack build defines `process.*` at
compile time (DefinePlugin). Bundled standalone via esbuild there's no such
define beyond `NODE_ENV`, so:

- Bare `process` access (from `next/navigation` internals) threw
  `ReferenceError` before `window.Portfolio` was ever assigned — fixed with a
  minimal `globalThis.process` polyfill, loaded first via `cfg.extraEntries`
  so it runs before anything that needs it.
- `next/image` reads `process.env.__NEXT_IMAGE_OPTS` for its image-config
  default. Without it, the component tries to route every `<Image>` through
  a `/_next/image?url=...` proxy that doesn't exist here. The shim sets
  `__NEXT_IMAGE_OPTS` to `imageConfigDefault` + `unoptimized:true` so images
  render from their raw `src` directly. **This must be a real object, not a
  JSON string** — `image-component.js` does
  `configEnv || configContext || imageConfigDefault` then spreads
  `c.deviceSizes` straight off whichever wins; a string there breaks with
  `c.deviceSizes is not iterable`.

## next-intl / next-themes context (`cfg.provider`)

Most components read translations via `useTranslations`/`useLocale`
(next-intl) or theme via `useTheme` (next-themes) — both need their provider
in the React tree or they throw "no context found". `cfg.extraEntries`
merges the real `next-intl` and `next-themes` packages onto `window.Portfolio`
(their own exports, not new DS components), and `cfg.provider` wraps every
preview in `NextIntlClientProvider` (real messages via `{"$ref":"enMessages"}`,
backed by `.design-sync/messages-ref.mjs` re-exporting `messages/en.json` —
never inline a copy, that rots) nested inside `ThemeProvider`.

## CSS: compiled, not source (`cfg.cssEntry`)

`app/globals.css` is Tailwind v4 CSS-first (`@import "tailwindcss"` +
`@theme inline`) — copying it raw ships an unresolved `@import` and zero
utility classes. `cfg.cssEntry` instead points at
`.design-sync/.cache/chunks/compiled.css`, a copy of the actual compiled
stylesheet from `.next/static/chunks/` after `bun run build` (real Tailwind
output: Gruvbox tokens + every utility class the app actually uses + real
`@font-face` rules with real `woff2` files copied alongside into
`.design-sync/.cache/media/`, preserving the `../media/` relative structure
the original chunk's `url()`s expect — **flattening into one directory loses
this and silently drops every font** (hit this once; fixed by mirroring the
two-level directory structure instead of a bare `cp`).

`cfg.buildCmd` runs `bun run build` then re-does that copy — **re-run it
before every sync**, since the compiled chunk's filename is content-hashed
and changes on every build (picked via `ls -S ... | head -1`, i.e. "biggest
chunk", which has held so far but isn't a guarantee — if it ever grabs the
wrong chunk, `[CSS_IMPORT_MISSING]`/missing Gruvbox tokens in validate's
output is the tell).

## Project media + brand asset copy (manual — not automated by any cfg key)

`ProjectsSection`'s default state selects the first project (`capo`), whose
media are `.webm` videos referenced by **absolute path**
(`/projects/capo/01.webm`, from `config/projects.ts`) — not imported modules,
so they don't get data-URL-inlined by the preview compiler. Isolated preview
environments 404 those unless the files are actually reachable at that path.
Fix applied for this sync: `cp -r public/projects ds-bundle/projects` **after**
`package-build.mjs` runs (package-build wipes `--out` at the start of every
run, so this can't be a `buildCmd` step — buildCmd runs *before* the
converter). **Re-run this copy after every rebuild, before validate/capture/
upload**, or `ProjectsSection`'s default preview silently 404s its media again.
This also assumes claude.ai/design serves extra uploaded root paths as static
files the same way it serves `fonts/`/`_vendor/` — unverified for the
non-standard `projects/` path; if the DS pane shows a blank video for
ProjectsSection, this assumption was wrong and the fix is either dropping the
plan to serve project media this way, or authoring ProjectsSection's preview
around a project with static images instead of the video-only `capo`.

**Brand assets** (logo, OG image, manifest icons) get the same treatment —
none of them are rendered by any synced component (`Navbar`, which shows the
logo, is itself floor-carded), so without a manual copy the design agent has
no visibility into them at all. Copied once into `ds-bundle/brand/`:

```sh
cp public/logo-light.svg public/logo-dark.svg public/og-light.png \
   public/web-app-manifest-192x192.png public/web-app-manifest-512x512.png \
   ds-bundle/brand/
```

Same rule as `projects/`: redo this after every rebuild (wiped along with
everything else in `--out`), before upload. Documented for the design agent
in `conventions.md`'s "Brand assets" section.

## Re-sync risks

- `cfg.pkg: "portfolio"` + `cfg.entry: "./dist/index.js"` is a deliberate
  non-existent placeholder — it exists only so `package-build.mjs`'s
  PKG_DIR-walk-up lands on this repo's own `package.json` (there's no real
  dist entry; the converter synthesizes one from `components/`). Don't "fix"
  this path to point at something real.
- The compiled-CSS and project-media copy steps above are both manual,
  outside the converter's own idempotent rebuild — a re-sync that skips them
  will build against a STALE cached CSS/media (harmless but outdated) rather
  than failing loudly.
- `messages-ref.mjs` re-exports `messages/en.json` only (previews are
  authored/graded against English copy only) — if `pt.json` diverges
  structurally (keys removed), previews won't catch it since they never read
  the Portuguese bundle.
- The 6 floor-card components are a structural ceiling, not a to-do list —
  see above. Don't spend a future sync trying to author them without new
  information (e.g. a next-intl/Next version that changes this).
