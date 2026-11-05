# MenuRow

One café menu item, with a dotted leader running to the price.

## Usage

```tsx
<ul>
  <MenuRow
    name="Flat white"
    priceGbp={3.6}
    description="Double shot of Daybreak, steamed whole milk."
    marks={["Contains milk"]}
  />
</ul>
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `name` | `string` | Required | Item |
| `priceGbp` | `number` | Required | Pounds |
| `description` | `string` | | One line |
| `marks` | `string[]` | | Dietary or allergen marks, in words |

## States and variants

Static. Works on every surface. Kraft is the intended home.

## Tokens

`type-lead`, `type-small`, `text-ink-muted`, `border-control`.

## Accessibility

Must sit inside a `ul`. The leader is hidden from screen readers. Allergen information must be written out, never shown only by icon. Have allergen wording checked before launch.

## Rendering

Server.
