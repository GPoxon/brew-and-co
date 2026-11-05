# BagArt

A colour-blocked pack drawing, used until product photography exists.

## Usage

```tsx
<BagArt name="Daybreak" colourway="roast" />
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `name` | `string` | Required | Label text. Under 14 characters |
| `colourway` | `"roast" \| "patina" \| "kraft"` | `"roast"` | Pack colours |
| `className` | `string` | | Layout. Maximum width is 288px |

## States and variants

Colourway must contrast with the block behind it:

| Colourway | Avoid on |
|---|---|
| `roast` (kraft side panel) | Kraft surface |
| `patina` (dark teal front) | Patina surface |
| `kraft` (dark side panel) | Roast surface |

## Tokens

Primitive colours, because it depicts printed packaging and shouldn't change with the surface. The mark is always forced to the roast surface.

## Accessibility

Hidden from screen readers. `ProductCard` carries the name as real text.

## Rendering

Server.
