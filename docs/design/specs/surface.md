# Surface

A colour block, and the base of every layout. It sets `data-surface`, so all semantic tokens inside it resolve to values that pass contrast on that colour.

## Usage

```tsx
<div className="grid md:grid-cols-2">
  <Surface tone="kraft">Café menu</Surface>
  <Surface tone="stone">Questions</Surface>
</div>
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `as` | Element type | `"section"` | Rendered element |
| `tone` | `"roast" \| "stone" \| "kraft" \| "patina"` | `"roast"` | Colour |
| `pad` | `"block" \| "tight" \| "none"` | `"block"` | `block`: gutter and vertical rhythm. `tight`: 24–32px. `none`: no padding |
| Others | Props of the element | | Passed through |

## States and variants

The four tones are described in the [style guide](../style-guide.md#colour). Surfaces can nest, and the inner one wins.

## Tokens

Sets all semantic tokens. Background and text colour come from the `[data-surface]` rule in `tokens.css`.

## Accessibility

A `section` needs a name to count as a landmark, so pass `aria-labelledby` pointing at its heading. Use `as="div"` for purely visual blocks.

## Rendering

Server.
