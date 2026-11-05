# Tag and TastingNotes

`Tag` is a small descriptive label. `TastingNotes` renders a labelled list of them. Tags are not interactive.

## Usage

```tsx
<TastingNotes notes={["Bergamot", "Peach"]} />
<Tag variant="solid">New crop</Tag>
```

## Props

### Tag

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `variant` | `"outline" \| "solid"` | `"outline"` | `outline` describes. `solid` is a status |
| `className` | `string` | | Layout |

### TastingNotes

`notes: string[]` and `className`.

## States and variants

Use at most one solid tag per item, and keep notes to 2–3.

## Tokens

`border-rule`, `text-ink`, `bg-ink`, `text-surface`, `rounded-control`, `type-caption`.

## Accessibility

`TastingNotes` is a list labelled "Tasting notes". The tag border is decorative, because the text identifies it.

## Rendering

Server.
