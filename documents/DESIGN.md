# Design System — portfolio

Visual identity of the portfolio — Gruvbox theme, dual display/body typography, light/dark theme via CSS variables.

> **Work in progress.** Colors and styles will be revisited.

## Overview

The design system is built on **Tailwind CSS v4** with Gruvbox tokens exposed as CSS custom properties (`--background`, `--foreground`, `--gruvbox-yellow`, `--gruvbox-yellow-aa`, `--gruvbox-gray`, `--gruvbox-outline`), switched by `next-themes` via the `.dark` class. Typography uses **Space Grotesk** for headings and **Manrope** for body text. The brand color is Gruvbox yellow — `#fabd2f` in dark theme, `#b57614` in light.

## Color tokens (`globals.css`)

Two sets of CSS variables — `:root` for light theme, `.dark` for dark theme:

| Token                 | Light (`#`) | Dark (`#`) | Meaning                                 |
| --------------------- | ----------- | ---------- | --------------------------------------- |
| `--background`        | `#fbf1c7`   | `#282828`  | Page background                         |
| `--foreground`        | `#3c3836`   | `#ebdbb2`  | Primary text                            |
| `--gruvbox-yellow`    | `#b57614`   | `#fabd2f`  | Brand color — headings, borders, accent |
| `--gruvbox-yellow-aa` | `#925f10`   | `#fabd2f`  | AA-contrast variant — text over yellow  |
| `--gruvbox-gray`      | `#665c54`   | `#a89984`  | Secondary text — role, footer, labels   |
| `--gruvbox-outline`   | `#a89984`   | `#665c54`  | Borders and outlines                    |

All tokens are exposed to Tailwind via `@theme inline` as `color-*`, allowing direct use with `text-gruvbox-yellow`, `border-gruvbox-outline`, etc.

## Typography

Two fonts loaded via `next/font/google`, both with `display: swap`:

| CSS variable           | Font          | Tailwind alias | Usage                            |
| ---------------------- | ------------- | -------------- | -------------------------------- |
| `--font-space-grotesk` | Space Grotesk | `font-display` | Headings — name, headings        |
| `--font-manrope`       | Manrope       | `font-sans`    | Body — role, footer, buttons, UI |

## Light/dark theme

Managed by `next-themes` with `attribute="class"` — the `.dark` class is added to `<html>`. Default is `system` (follows OS preference).

The transition between themes uses the **View Transitions API** (`document.startViewTransition`), with a 300ms fade (`cubic-bezier(0.4, 0, 0.2, 1)`). Browsers without support switch directly (fallback in `ThemeToggle`).

## Animations

| Name            | Duration | Usage                                                                                                                                           |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `fade-in/out`   | `300ms`  | View Transitions between themes                                                                                                                 |
| fade-in (photo) | `0.6s`   | `AnimatedPhoto` — CSS class + `useState`/`useEffect` (no animation library); only on the session's first mount, doesn't repeat on locale switch |

## Hero layout

Asymmetric split: photo on the left, text on the right left-aligned (`app/[locale]/page.tsx`). Stacks centered below `md:`. Text order: role (small uppercase eyebrow) → name → tagline → `SocialLinks`.

Content staggers in on load (`hp-in`): each element fades up 14px, delayed `(--hp-i - 1) * 0.1s` from its index, so photo → role → name → underline → tagline → `SocialLinks` arrive in sequence rather than all at once. `ProjectsSection`'s heading/nav/article get the same idea in reverse — `hp-reveal`, triggered per-element via `IntersectionObserver` (15% visible) instead of on load, staggered `0.12s` apart.

## Hero photo — 3D tilt

`HeroPhoto` tracks the cursor within its bounds and rotates the photo in 3D (`perspective: 700px`, up to ±8° on both axes via `rotateY`/`rotateX`, computed from cursor position relative to center), resetting to flat on mouse leave. Paired with the blob's own hover state (shadow spreads further, see above) — the two respond to the same hover independently.

## Navbar — glass on scroll

`NavbarScrollWrapper` toggles a class once the page scrolls past 40px: transparent border and background become a translucent `color-mix` background + `backdrop-filter: blur(12px)` + visible bottom border (`hp-nav-scrolled`). Reads solid over the hero at the top, then becomes a glass bar once content scrolls underneath it.

## Photo crop — organic blob

The hero profile photo uses an asymmetric `border-radius` for an organic crop, instead of circle/rectangle, echoing the avocado silhouette from the logo without copying it (repeating it letter-for-letter felt too rigid in prototypes).

```
rounded-[45%_55%_58%_42%/55%_48%_52%_45%]
```

Same `border-gruvbox-yellow` border as the old circle. **Not** adopted for other images on the site — project photos use a standard crop (see below), not the blob.

## Project photo carousel

`ProjectPhotoStack` — horizontal filmstrip with scroll-snap, `rounded-lg` corners (not the hero's organic blob). The active photo shows in full color; the rest get `grayscale` + `brightness-[0.55]`. Navigation via prev/next arrows and dots (one per photo); the active photo is detected by proximity to the scroller's center on the `scroll` event (`requestAnimationFrame`). Accepts photos and videos (`.webm`/`.mp4`, autoplay/muted/loop).

Clicking the active photo opens `ProjectPhotoLightbox`, a full-screen view (`bg-black/90` backdrop) with the same prev/next controls, a thumbnail strip, and swipe/arrow-key navigation. Closes via the X button, `Escape`, or clicking the backdrop outside the media itself.

## Scroll cue — regular oscillation (signature motif)

`ScrollCue` (bottom of the hero section, links to `#projects`) is the second signature shape in the system, deliberately the opposite character from the blob: **regular**, not deformed. It's a single hand-authored SVG path — 5 evenly-spaced swings (built with consecutive `S` curve commands so each join is tangent-continuous, never a visible kink), settling into a straight vertical "leg," ending in a plain arrowhead:

```
M35 6 C 47 9.5, 47 16.5, 35 20 S 23 30.5, 35 34 S 47 44.5, 35 48 S 23 58.5, 35 62 S 35 72.5, 35 76 L 35 88
```

Key numbers: swings are 14 units apart (half the 28-unit wave period), amplitude ±12 from the center line, `stroke-width` 4, rendered at `w-16` (64px). The last swing's own end-control point sits directly above its endpoint (same x), which is what makes the curve arrive already vertical — the straight leg is a continuation, not a separate patched-on piece.

This shape went through many animation experiments (a traveling sine wave, a "worm" crawling dash, per-swing pulsing) — all were tried and rejected as either too subtle, too distorted, or not matching the intended motion. Current state: **fully static**, no animation. If motion is revisited, any approach must leave this exact `d` string undistorted at rest and never move the leg/arrowhead.

Hidden below `md:` — on some mobile browsers the fixed bottom position read as visually broken, so the cue only shows on larger viewports. Links to `#about` (not `#projects`). Hover uses `--gruvbox-yellow-aa` in light mode, but that token is identical to `--gruvbox-yellow` in dark mode — so dark mode overrides with Gruvbox's real orange (`dark:hover:text-[#fe8019]`) to keep a genuine color-change hover in both themes rather than falling back to opacity/scale.

## About section — recruiter/personal toggle

`AboutSection` is a client component with a `mode` state (`"recruiter" | "personal"`), switched by a pill toggle next to the heading. Bio copy, quick facts, and photo (`config/about.ts`) all key off `mode`; bio paragraphs use `t.rich` with `richText` for inline `<b>` emphasis (`--gruvbox-yellow-aa`, not plain yellow — plain yellow fails AA contrast in light mode at that weight). The active toggle pill also uses `-aa` for the same reason.

The photo (`aspect-[3/4]` on mobile, `aspect-[2/5]` on desktop) crops live via `object-cover` + `objectPosition` from config — source files are kept at full/natural resolution, never pre-cropped, so the crop can be retuned without re-exporting images.

Recruiter mode adds a career timeline (`timelineIds`, a dotted vertical line + period/title pairs). Personal mode adds `FilmStrip` and `LastFmWidget` below the article instead — each mode owns independent content rather than sharing a fixed-height container, so one mode's shorter content doesn't leave a dead gap sized for the other's.

## Analog filmstrip (`FilmStrip`)

A horizontal, auto-scrolling strip of real 35mm scans (`config/about.ts`'s `analogPhotos`), styled as a literal film reel: black background, `filmstrip-sprockets` (repeating radial-gradient circles) above and below the photo row. Scrolls via `animate-filmstrip-scroll` (duplicate the photo list, `translateX(-50%)` keyframe) for a seamless loop; pauses on hover. Respects `prefers-reduced-motion`. Clicking a photo opens the existing `ProjectPhotoLightbox`. Each real photo gets a numbered `aria-label` (`"{alt} — {n}/{count}"`); the duplicated half of the loop is `aria-hidden` + `tabIndex={-1}` so it's invisible to assistive tech and keyboard nav.

## Last.fm weekly widget (`LastFmWidget`)

Two side-by-side lists (top artists, top tracks — last 7 days, top 5 each) fetched server-side in `lib/lastfm.ts` from the Last.fm API, with cover art enriched via Spotify's Client Credentials flow (`lib/spotify.ts`) since Last.fm's own image API is deprecated and returns a placeholder for every entry. Shares a `LastFmList` sub-component for the artist/track row markup. Renders only when `lastFm` data is available (`AboutSection`'s `lastFm` prop, fetched once in `page.tsx`).

## Footer

Minimal: social icons (`SocialLinks size="sm"`), a nav reusing the same labels as the navbar (`Navbar.home`, `About.heading`, `Projects.heading` — no separate `Footer` i18n namespace), and a copyright line. `Navbar`'s logo is decorative-only (`aria-hidden`, empty `alt`, no wrapping link) now that "Home" has its own nav link — it no longer doubles as the home affordance.

## List marker — organic blob, randomized (`BlobMarker`)

Project highlight bullets (in `ProjectsSection`) use `BlobMarker` instead of a plain dot: a small (14px) **outlined** shape (2px `border-gruvbox-yellow`, transparent fill) with a random asymmetric `border-radius` — same technique as the hero photo crop, not hand-picked this time but generated per mount, each corner independently randomized in the 38-62% range (tighter than the wide 15-85% tried and rejected during design — that read as too spiky/erratic; this range stays visibly lopsided without looking broken).

To avoid an SSR/hydration mismatch, the component renders a plain `50%` circle on the server and swaps to the randomized shape client-side via `useLayoutEffect` (before paint, so there's no visible flash). Every page load — and every remount, e.g. switching project tabs — gets fresh random shapes per bullet.

## Tooltip — hand-drawn bubble (`hp-tip`)

`SocialLinks` icons carry a `data-tip` attribute rendered via `.hp-tip::after` — a small yellow speech-bubble bearing the icon's label, asymmetric corner radii and a slight `-2deg` rotation for a hand-drawn feel, shown on hover/focus above the icon. `font-display` (Space Grotesk), not the body font — matches headings, not UI text.
