## Using this design system

This is the **nycocado portfolio** — a single-page personal site. Its components are page-specific pieces (hero photo, project showcase, nav), not a general-purpose UI kit — compose new designs by reusing its exact tokens, type, and shapes, not by treating every component as an abstract building block.

### Wrapping and setup

Every component that reads translations or theme needs both providers in the tree, or it throws:

```jsx
<NextIntlClientProvider locale="en" messages={messages}>
  <ThemeProvider attribute="class">
    {/* your composition */}
  </ThemeProvider>
</NextIntlClientProvider>
```

Dark mode is a `.dark` class on the root element (`next-themes`, `attribute="class"`) — never a `prefers-color-scheme` media query directly. Theme transitions use the View Transitions API (300ms fade) in the real app; that's a nice-to-have, not required for a static composition.

### Styling idiom: Tailwind utilities + Gruvbox CSS vars

No component-scoped CSS-in-JS or class maps — plain Tailwind utility classes, with the brand palette exposed as custom color/font utilities (via `@theme inline` in `app/globals.css`, backing `--background`/`--gruvbox-*` CSS vars that flip value between `:root` and `.dark`):

| Utility | Token | Light | Dark | Use for |
|---|---|---|---|---|
| `bg-background` | `--background` | `#fbf1c7` | `#282828` | Page background |
| `text-foreground` | `--foreground` | `#3c3836` | `#ebdbb2` | Primary text |
| `text-gruvbox-yellow` / `border-gruvbox-yellow` | `--gruvbox-yellow` | `#b57614` | `#fabd2f` | Brand accent — headings, borders, active states |
| `text-gruvbox-yellow-aa` | `--gruvbox-yellow-aa` | `#925f10` | `#fabd2f` | AA-contrast text sitting on/near yellow |
| `text-gruvbox-gray` | `--gruvbox-gray` | `#665c54` | `#a89984` | Secondary text — labels, meta, footer |
| `border-gruvbox-outline` | `--gruvbox-outline` | `#a89984` | `#665c54` | Borders, outlines |
| `font-display` | Space Grotesk | — | — | Headings only |
| `font-sans` | Manrope | — | — | Body, UI, buttons |

Never introduce a new color outside this table — the whole site is built on these six tokens plus black/white overlays (e.g. the lightbox's `bg-black/90`).

### Signature shapes — reuse, don't reinvent

- **Organic blob crop**: `rounded-[45%_55%_58%_42%/55%_48%_52%_45%]` — the hero photo's asymmetric border-radius. Pair with a `border-gruvbox-yellow` border. Don't apply to other imagery (project photos use a plain `rounded-lg`).
- **Randomized blob marker** (`BlobMarker`): small outlined bullet with a per-mount randomized asymmetric radius, corners in the 38–62% range. Use as a list-item marker, never as a decorative one-off.

### Where the truth lives

Read `styles.css` (imports `_ds_bundle.css`, which carries every token and utility class above) and each component's own `.prompt.md` before styling anything. The `.d.ts` next to each component is its real prop contract — some components (`Navbar`, `ScrollCue`, `SocialLinks`) are async and floor-carded here (see their `.prompt.md`) but are real, working exports; compose around them using their documented props rather than guessing.

### Example composition

```jsx
<section className="bg-background text-foreground font-sans px-8 py-12">
  <h2 className="font-display text-3xl font-bold text-gruvbox-yellow mb-6">
    Projects
  </h2>
  <p className="text-gruvbox-gray/90 max-w-xl">
    A short description in body copy, using the secondary text color.
  </p>
  <span className="mt-4 inline-block text-xs px-2.5 py-1 rounded-full border border-gruvbox-outline text-gruvbox-gray">
    Tag
  </span>
</section>
```
