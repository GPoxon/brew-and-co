# PourRule

A single rising gilt stroke that closes a headline. Use it under hero headlines, not as a general divider. Use `border-rule` for dividers.

## Usage

```tsx
<PourRule animate className="mt-4" />
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `animate` | `boolean` | `false` | Draws once on load. First hero on a page only |
| `className` | `string` | | Layout. Maximum width is 448px |

## States and variants

Static or animated. With reduced motion the line appears at once. It stays 2px thick at any width.

## Tokens

`--accent-from`, `--accent-to`, `animate-pour`.

## Accessibility

Decorative and hidden from screen readers.

## Rendering

Server. The animation is CSS only.
