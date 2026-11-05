# Hero

The opening block of a landing page: headline on roast, visual on a second surface, and the seal across the seam between them. Use one per page.

## Usage

```tsx
<Hero
  lead="This week's roast"
  title="Roasted Tuesday."
  signature="Yours by Friday."
  body="Small-batch coffee, posted the week it's roasted."
  actions={<ButtonLink href="/coffee">Shop coffee</ButtonLink>}
  visual={<Image src="/daybreak.jpg" alt="" fill preload className="object-cover" />}
/>
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `title` | `string` | Required | Main headline. Keep it to about 3 words so it holds at 120px |
| `lead` | `string` | | Tracked line above the title |
| `signature` | `string` | | Script line closing the headline |
| `body` | `ReactNode` | | Up to 2 sentences |
| `actions` | `ReactNode` | | One or two `ButtonLink`s, primary first |
| `visual` | `ReactNode` | Required | `next/image` or `BagArt` |
| `visualTone` | `SurfaceTone` | `"stone"` | Must differ from roast, or the seam disappears |
| `animate` | `boolean` | `true` | Draws the pour line on load |

## States and variants

- **`md` and up:** 3:2 columns, seal centred on the vertical seam.
- **Below `md`:** stacked, seal on the horizontal seam.
- **Reduced motion:** the pour line appears drawn.

## Tokens

`type-stamp`, `type-display`, `type-signature`, `type-lead`, plus those of `Surface`, `PourRule` and `Seal`.

## Accessibility

`lead`, `title` and `signature` all sit inside the `h1`, so they are read as one headline. A photo that is purely atmospheric takes `alt=""`.

## Rendering

Server. Use `preload` on the image, not the deprecated `priority`.
