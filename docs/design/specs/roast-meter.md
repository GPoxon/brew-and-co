# RoastMeter

Shows how dark a coffee is roasted, on a five-step scale, in ticks and words.

## Usage

```tsx
<RoastMeter level={3} />
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `level` | `1 \| 2 \| 3 \| 4 \| 5` | Required | Light, Medium light, Medium, Medium dark, Dark |
| `className` | `string` | | Layout |

## States and variants

Read only. Filled ticks use `bg-ink` and empty ones are outlined, so it works on every surface.

## Tokens

`border-ink`, `bg-ink`, `text-ink-muted`, `type-caption`.

## Accessibility

Exposed as one image named, for example, "Roast: Medium, 3 of 5".

## Rendering

Server.
