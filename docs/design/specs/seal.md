# Seal and SealOnSeam

A round stamp with ring text and the logo mark. `SealOnSeam` places it across the edge of a block, which is the system's signature move.

## Usage

```tsx
<Surface as="div" tone="stone" pad="none" className="relative">
  <SealOnSeam>
    <Seal size={152} />
  </SealOnSeam>
</Surface>
```

## Props

### Seal

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `text` | `string` | `"Brew & Co. Southend-on-Sea"` | 24–34 characters. Uppercased automatically |
| `size` | `number` | 200 | Diameter in pixels. Keep it at 96 or above |
| `tone` | `SurfaceTone` | `"roast"` | The seal's own background |
| `className` | `string` | | Layout |

### SealOnSeam

Takes `children` only. Sits on the top edge of its parent below `md`, and on the left edge from `md` up. The parent must be `position: relative` with no clipped overflow.

## States and variants

Static. Do not animate or spin it. The seal should use a different tone from at least one of the blocks it crosses.

## Tokens

`--accent-from`, `--accent-to`, `--accent-ink`, `--font-sans`, `bg-surface`.

## Accessibility

Exposed as one image named with `text`. The SVG text is hidden so it isn't read letter by letter.

## Rendering

Server.
