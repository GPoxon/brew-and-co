# ImageHero

The opening block with a full-bleed photograph behind the headline, and the seal across the seam with the block below. Use it instead of `Hero` when a photo should set the mood. Use one per page.

## Usage

```tsx
<ImageHero
  lead="Southend-on-Sea"
  title="Stay a while."
  signature="The kettle’s on."
  body="Speciality coffee, fresh pastries and light lunches."
  image={{ src: "/images/hero/cafe.webp", alt: "A dark café interior lit by warm lamps." }}
  actions={<ButtonLink href="/menu">See the menu</ButtonLink>}
/>
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `title` | `string` | Required | Main headline. Keep it to about 3 words |
| `image` | `{ src, alt }` | Required | Photo. Use `alt=""` if purely atmospheric |
| `lead` | `string` | | Tracked line above the title |
| `signature` | `string` | | Script line closing the headline |
| `body` | `ReactNode` | | Up to 2 sentences |
| `actions` | `ReactNode` | | One or two actions, primary first |
| `animate` | `boolean` | `true` | Draws the pour line on load |
| `heading` | `"h1" \| "h2"` | `"h1"` | Headline level, for a page that already has an `h1` |

## States and variants

- **All widths:** the seal sits on the bottom edge, at the right gutter.
- **Block below:** must be a different surface, and needs room for the seal's lower half. Use at least `pt-24` below `md`, and keep content clear of the right-hand 192px from `md` up.
- **Reduced motion:** the pour line appears drawn.

## Tokens

`bg-scrim`, `type-stamp`, `type-display`, `type-signature`, `type-lead`, `px-gutter`, `py-block`, `max-w-page`, plus those of `Surface`, `PourRule` and `Seal`.

## Accessibility

`lead`, `title` and `signature` sit inside one heading. `bg-scrim` leaves ivory at 6.2:1 and ember at 3.6:1 even over pure white, so any photo keeps its text legible. Measured over the current photo at 360, 768, 1440 and 1920px, the lowest values were 6.42 for text and 3.70 for the signature line.

## Rendering

Server. The image uses `preload`, not the deprecated `priority`.
