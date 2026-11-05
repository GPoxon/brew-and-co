# Icon

Line icons on a 24px grid with a 1.5px stroke. They are drawn for this system, so no icon library is needed.

Names: `bean`, `flame`, `leaf`, `truck`, `cup`, `bag`, `pastry`, `lunch`, `music`, `calendar`, `menu`, `close`, `plus`, `minus`, `check`, `chevron`, `info`, `alert`.

## Usage

```tsx
<Icon name="bag" size={20} />
<Icon name="alert" label="Warning" />
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `name` | `IconName` | Required | Which icon |
| `size` | `number` | 24 | Pixels |
| `label` | `string` | | Accessible name. Leave out when next to text |
| Others | SVG props | | Passed through |

## States and variants

Colour comes from `currentColor`. To add an icon, add a path to the `paths` object and keep the same stroke and grid.

## Tokens

Inherits text colour.

## Accessibility

Hidden from screen readers unless `label` is set. An icon-only button needs `aria-label` on the button.

## Rendering

Server.
