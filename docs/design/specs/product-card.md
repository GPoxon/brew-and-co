# ProductCard

One coffee in a list. It is a flat panel with a colour block for the image, rather than a floating card.

## Usage

```tsx
<div className="grid border border-rule md:grid-cols-2 md:divide-x md:divide-rule xl:grid-cols-4">
  <ProductCard
    name="Daybreak"
    href="/coffee/daybreak"
    origin="House blend, Brazil and Colombia"
    notes={["Milk chocolate", "Hazelnut"]}
    roast={3}
    priceGbp={9.5}
    size="250g"
    image={<BagArt name="Daybreak" />}
    action={<Button size="sm">Add to bag</Button>}
  />
</div>
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `name` | `string` | Required | Product name, also the link |
| `href` | `string` | Required | Product page |
| `origin` | `string` | Required | Origin or blend description |
| `notes` | `string[]` | Required | 2–3 tasting notes |
| `roast` | `1`–`5` | Required | Roast level |
| `priceGbp` | `number` | Required | Pounds, formatted as `£9.50` |
| `size` | `string` | Required | Pack size for that price |
| `image` | `ReactNode` | Required | `next/image` or `BagArt` |
| `imageTone` | `SurfaceTone` | `"stone"` | Block behind the image |
| `status` | `string` | | One status, such as "New crop" |
| `action` | `ReactNode` | | Add-to-bag control |
| `headingLevel` | `"h2" \| "h3" \| "h4"` | `"h3"` | Match the page outline |

## States and variants

- **Hover:** the name underlines. The card does not lift.
- **Sold out:** a disabled secondary button labelled "Sold out".
- **Loading:** `ProductCardSkeleton`.

Vary `imageTone` across a row to keep the panelled look, and check the [BagArt colourway](bag-art.md).

## Tokens

`type-h3`, `type-small`, `type-label`, `text-ink-muted`, plus `Surface`, `Tag` and `RoastMeter`.

## Accessibility

The whole card is clickable through a stretched link on the name, which keeps the screen reader announcement short. The action sits above it, so it stays separately clickable.

## Rendering

Server. To show live stock, pass an `action` wrapped in `<Suspense>`, so the rest of the card can stay in the static shell. Cache product data with `use cache`.
