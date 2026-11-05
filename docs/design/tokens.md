# Design tokens

All values live in [`tokens/tokens.css`](tokens/tokens.css) as Tailwind v4 theme variables. Tailwind generates the utilities from them, so there is no config file or build step to maintain.

Tailwind's default colours, text sizes, radii and shadows are removed, so `bg-zinc-50` or `rounded-lg` produce no CSS. If something renders unstyled, check that it uses a token.

## Semantic colours

Use these in components. Each resolves against the nearest `data-surface`, so wrap a block in `Surface` and everything inside adapts.

| Utility | Role | Roast | Stone | Kraft | Patina |
|---|---|---|---|---|---|
| `bg-surface` | Block background | roast-900 | stone-200 | kraft-500 | patina-800 |
| `bg-raised` | Inputs, selected tiles, alerts | roast-800 | stone-100 | kraft-400 | patina-700 |
| `text-ink` | Main text | ivory | roast-900 | roast-950 | ivory |
| `text-ink-muted` | Secondary text | stone-300 | roast-600 | roast-800 | stone-200 |
| `border-rule` | Decorative dividers | roast-700 | stone-400 | kraft-700 | patina-600 |
| `border-control` | Input and button outlines | stone-500 | roast-500 | roast-900 | stone-400 |
| `text-accent-ink` | Links, stamps | gilt-300 | kraft-800 | roast-950 | gilt-300 |
| `text-signature` | Script line | ember-400 | kraft-800 | roast-950 | ember-400 |
| `bg-action` | Primary button | kraft-500 | roast-900 | roast-950 | kraft-400 |
| `text-on-action` | Text on primary button | roast-950 | ivory | ivory | roast-950 |
| `bg-action-hover` | Primary button hover | kraft-400 | roast-700 | roast-700 | gilt-300 |
| `outline-focus` | Focus ring | ember-400 | patina-800 | roast-950 | ember-400 |
| `text-danger` | Errors | rust-300 | rust-700 | roast-950 | rust-300 |
| `text-success` | Confirmation | sage-300 | sage-700 | roast-950 | sage-300 |

`--accent-from` and `--accent-to` are the two stops of the line-art gradient. They are plain CSS variables, used by `LogoMark`, `Seal` and `PourRule`.

## Primitive colours

Use these only inside `tokens.css`. `BagArt` is the one exception, since it depicts printed packaging.

| Group | Values |
|---|---|
| Roast | 950 `#171411`, 900 `#1F1B1A`, 800 `#2B2522`, 700 `#3F3631`, 600 `#5A4F48`, 500 `#6E625A` |
| Stone | 500 `#8F867D`, 400 `#A89E95`, 300 `#BAB2A9`, 200 `#D3CDC6`, 100 `#E6E1DB` |
| Kraft | 800 `#5F4322`, 700 `#7A5A36`, 500 `#B18758`, 400 `#C49A69` |
| Gilt | 100 `#F3E4CC`, 300 `#E8C7A0`, 500 `#D8AC78` |
| Ember | 400 `#F1B34F` |
| Patina | 800 `#1F3335`, 700 `#2B4043`, 600 `#4A5F62` |
| Ivory | `#FBF7EE` |
| Scrim | Roast 950 at 70%. For `ImageHero` photos and modal backdrops only. Even over pure white, it leaves ivory at 6.2:1 and ember at 3.6:1 |
| Rust | 300 `#EB9A7C`, 700 `#8C2F12` |
| Sage | 300 `#B9C78C`, 700 `#46561F` |

## Type

Sizes follow Bringhurst's classical scale. Fluid styles move between the two sizes shown.

| Utility | Size | Face | Line height | Use |
|---|---|---|---|---|
| `type-display` | 60–120px | Gloock | 1 | Hero headline |
| `type-h1` | 48–72px | Gloock | 1.12 | Page titles |
| `type-h2` | 36–60px | Gloock | 1.12 | Section titles |
| `type-h3` | 24–36px | Gloock | 1.12 | Product names |
| `type-h4` | 24px | Jost 500 | 1.25 | Small headings |
| `type-signature` | 36–72px | Mr Dafoe | 1.1 | One script line. Sets its own colour |
| `type-lead` | 21px | Jost 400 | 1.5 | Intro copy, menu items |
| `type-body` | 18px | Jost 400 | 1.6 | Default body text |
| `type-small` | 16px | Jost 400 | 1.5 | Secondary copy |
| `type-label` | 16px | Jost 500 | 1.25 | Buttons, field labels |
| `type-caption` | 14px | Jost 400 | 1.45 | Hints, tags |
| `type-stamp` | 13px | Jost 500, capitals, 0.22em tracking | 1.5 | Packaging-style marks |

Font families are also available as `font-display`, `font-sans` and `font-signature`.

## Spacing and layout

Tailwind's 4px spacing scale stays, so `p-4` is 16px. These add page-level rhythm:

| Token | Utility | Value | Use |
|---|---|---|---|
| `--spacing-gutter` | `px-gutter` | 20–56px | Page side margin |
| `--spacing-block` | `py-block` | 56–120px | Vertical padding of a block |
| `--container-measure` | `max-w-measure` | 608px | Maximum width of running text |
| `--container-page` | `max-w-page` | 1440px | Maximum width of content |

## Shape and depth

| Token | Utility | Value | Use |
|---|---|---|---|
| None | No radius utility | 0 | Blocks |
| `--radius-control` | `rounded-control` | 2px | Buttons, inputs, tags |
| None | `rounded-full` | Circle | Seals only |
| `--shadow-overlay` | `shadow-overlay` | `0 24px 48px -16px` roast-950 at 65% | Things floating over the page |

## Motion

| Token | Usage | Value | Use |
|---|---|---|---|
| `--duration-quick` | `duration-(--duration-quick)` | 120ms | Hover colour |
| `--duration-settle` | `duration-(--duration-settle)` | 240ms | Things opening |
| `--duration-pour` | Used by `animate-pour` | 1400ms | Pour line |
| `--ease-pour` | `ease-pour` | `cubic-bezier(0.22, 0.7, 0.2, 1)` | Anything that moves |
| `--animate-pour` | `animate-pour` | Draw once | `PourRule` |
| `--animate-steam` | `animate-steam` | Slow fade, 1800ms | Loading states |

## Contrast

Measured from `tokens.css` using the WCAG formula. All 72 combinations pass.

| Pair | Target | Roast | Stone | Kraft | Patina |
|---|---|---|---|---|---|
| ink on surface | 4.5 | 15.97 | 10.83 | 5.66 | 12.41 |
| ink on raised | 4.5 | 14.13 | 13.14 | 7.14 | 10.24 |
| ink-muted on surface | 4.5 | 8.15 | 5.03 | 4.66 | 8.41 |
| ink-muted on raised | 4.5 | 7.21 | 6.10 | 5.88 | 6.95 |
| accent-ink on surface | 4.5 | 10.66 | 5.76 | 5.66 | 8.28 |
| signature on surface | 3 (large) | 9.19 | 5.76 | 5.66 | 7.14 |
| on-action on action | 4.5 | 5.66 | 15.97 | 17.16 | 7.14 |
| on-action on action-hover | 4.5 | 7.14 | 11.01 | 11.01 | 11.45 |
| control on surface | 3 | 4.78 | 3.74 | 5.27 | 5.05 |
| control on raised | 3 | 4.22 | 4.54 | 6.65 | 4.17 |
| action on surface | 3 | 5.27 | 10.83 | 5.66 | 5.16 |
| focus on surface | 3 | 9.19 | 8.41 | 5.66 | 7.14 |
| danger on surface | 4.5 | 7.68 | 5.26 | 5.66 | 5.97 |
| danger on raised | 4.5 | 6.79 | 6.39 | 7.14 | 4.93 |
| success on surface | 4.5 | 9.44 | 5.10 | 5.66 | 7.33 |
| success on raised | 4.5 | 8.35 | 6.19 | 7.14 | 6.06 |
| accent-from on surface | 3 | 13.64 | 10.83 | 5.66 | 10.60 |
| accent-to on surface | 3 | 8.21 | 3.98 | 4.66 | 6.37 |

Tightest text pairs: ink-muted on kraft at 4.66, danger on raised patina at 4.93, and ink-muted on stone at 5.03. Recheck these if you change kraft, patina or stone.

## Changing tokens

- **Change a value:** edit `tokens.css`, recheck contrast, and update this file.
- **Add a colour role:** add it to all four surfaces and to the `@theme inline` block.
- **Use a token outside Tailwind:** primitives are always available as CSS variables, for example `var(--color-kraft-500)`.
