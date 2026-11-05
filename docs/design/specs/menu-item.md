# MenuItem

One café menu item with a square photo, a dotted leader running to the price, a description and an optional badge. Use `MenuRow` instead when there's no photo.

## Usage

```tsx
<ul className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
  <MenuItem
    name="Flat White"
    priceGbp={3.6}
    description="Double espresso with silky steamed whole milk."
    image="/images/menu/flat-white.webp"
    badge="Popular"
  />
</ul>
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `name` | `string` | Required | Item |
| `priceGbp` | `number` | Required | Pounds |
| `description` | `string` | Required | One line |
| `image` | `string` | Required | Path to a photo. It's cropped to a square, so choose one that survives that |
| `badge` | `string` | | One short status, shown as a solid `Tag` |

## States and variants

Static. Works on every surface. The photo is 96px below `md` and 144px from `md` up.

## Tokens

`bg-raised`, `type-lead`, `type-small`, `text-ink-muted`, `border-control`, plus those of `Tag`.

## Accessibility

Must sit inside a `ul`, under an `h2`, as the name is an `h3`. The photo takes empty alt text because the name sits beside it. The leader is hidden from screen readers. Have any allergen wording checked before launch.

## Rendering

Server.
