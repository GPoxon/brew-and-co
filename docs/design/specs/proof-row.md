# ProofRow

Three or four short promises, each an icon and a stamp label, split by thin rules. Use it once on a page, directly below the hero or above the footer.

## Usage

```tsx
<ProofRow
  items={[
    { icon: "bean", label: "Single estate" },
    { icon: "truck", label: "Posted weekly" },
    { icon: "leaf", label: "Fairly paid" },
  ]}
/>
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `items` | `{ icon: IconName, label: string }[]` | Required | 3–4 items, labels of 1–3 words |
| `className` | `string` | | Layout |

## States and variants

A two-column grid below `md`, then one row with dividers. Labels may wrap to two lines at 360px.

## Tokens

`text-accent-ink`, `divide-rule`, `type-stamp`.

## Accessibility

A real list. Icons are hidden, since the label says it all.

## Rendering

Server.
