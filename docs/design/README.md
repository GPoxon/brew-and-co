# Brew & Co. design system

Built for this repo's stack: Next.js 16.4 App Router with Cache Components, React 19.3, TypeScript and Tailwind CSS 4.3. It adds no dependencies.

Open [`style-guide.html`](style-guide.html) to see everything rendered. It is a self-contained snapshot of the real components, so you can double-click it or send it to someone.

| Path | What it is |
|---|---|
| [`style-guide.md`](style-guide.md) | Brand rules: colour, type, layout, imagery, motion, voice |
| [`tokens.md`](tokens.md) | Every token, how to use it, and measured contrast |
| [`tokens/tokens.css`](tokens/tokens.css) | Tailwind v4 theme. The source of truth for all values |
| [`tokens/fonts.ts`](tokens/fonts.ts) | `next/font` setup for the three typefaces |
| [`components/`](components/) | 26 component files, exported from `index.ts` |
| [`specs/`](specs/) | One spec per component: API, states, tokens, accessibility |
| [`preview/`](preview/) | Source for the style guide page, and the script that snapshots it |
| [`references/`](references/) | The two reference images |

## Install in the app

The system is installed in this app. These are the two edits that did it, kept here for reference.

`app/globals.css` contains:

```css
@import "tailwindcss";
@import "../docs/design/tokens/tokens.css";
```

`app/layout.tsx` applies the fonts on `<html>`:

```tsx
import { fontVariables } from "@/docs/design/tokens/fonts";
import "./globals.css";

<html lang="en-GB" className={`${fontVariables} h-full antialiased`}>
```

The tokens remove Tailwind's default colours such as `bg-zinc-50`, so those classes produce no CSS.

Then import components:

```tsx
import { Button, Surface } from "@/docs/design/components";

export default function Page() {
  return (
    <Surface tone="stone">
      <h1 className="type-h1">Coffee for the whole week</h1>
      <Button className="mt-8">Add to bag</Button>
    </Surface>
  );
}
```

## Working with Next.js 16

- **Server Components by default.** Only `QuantityStepper`, `Dialog` and `HeaderMenu` ship client JavaScript. The accordion uses `<details>`, the header menu uses `<details>` with a small script to close it on navigation, and tile selection uses CSS `:has(:checked)`.
- **Passing handlers.** A Server Component cannot pass `onClick` to `Button`. Use a form with a Server Action, or wrap the button in your own `"use client"` component.
- **Cache Components.** This repo sets `cacheComponents: true`, so anything reading cookies or uncached data must sit inside `<Suspense>`. A live bag count and stock levels are the likely cases. Use `ProductCardSkeleton` as the product fallback.
- **Images.** Use `preload` on the hero image. `priority` is deprecated in Next 16. If you replace a photo at the same path, delete `.next/cache/images`, or the optimiser keeps serving the old one.
- **Fonts.** `next/font` self-hosts them, so visitors' browsers make no requests to Google.

## Update the snapshot

`style-guide.html` does not update itself. After changing components or tokens:

1. Add `app/design-preview/page.tsx`:
   ```tsx
   import { StyleGuide } from "@/docs/design/preview/StyleGuide";
   export default function Page() { return <StyleGuide />; }
   ```
2. Run `npx next build`, then `npx next start -p 3457`.
3. In a second terminal, run `node docs/design/preview/snapshot.mjs docs/design/style-guide.html`.
4. Delete the route.

The snapshot has no JavaScript, so the quantity stepper's buttons do nothing in it, and the dialog appears as a static panel. They work in the app.

## What has been tested

| Check | Result |
|---|---|
| `tsc`, `eslint` and `next build` with the system installed | Pass, and the page prerenders as static |
| Contrast: 18 token pairs on 4 surfaces | 72 of 72 meet their WCAG AA target |
| Horizontal overflow at 360, 768 and 1440px | None |
| In Chrome: stepper, exclusive accordion, keyboard focus ring | Working |
| Automated DOM checks: unlabelled controls, duplicate ids, one `h1` | Pass |
| Browser console | No errors |

**Not tested:** screen readers, and browsers other than Chrome.

## Not built yet

Bag drawer, toast, tabs, pagination, and a filter bar for the shop. Add them as real pages need them, using the spec template in [`specs/`](specs/).
