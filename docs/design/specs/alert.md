# Alert

A message that stays on the page, about the order, the account or a form.

## Usage

```tsx
<Alert tone="danger" title="Payment declined" live>
  Check your card details, or try another card.
</Alert>
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `tone` | `"info" \| "success" \| "danger"` | `"info"` | Meaning |
| `title` | `string` | Required | What happened |
| `children` | `ReactNode` | | What to do next |
| `live` | `boolean` | `false` | Set when it appears after page load |
| `className` | `string` | | Layout |

## States and variants

| Tone | Icon | Border and title |
|---|---|---|
| Info | `info` | `border-control`, `text-ink` |
| Success | `check` | `border-success`, `text-success` |
| Danger | `alert` | `border-danger`, `text-danger` |

On kraft, status colours are all dark, so the icon and title carry the meaning. Prefer another surface for errors.

## Tokens

`bg-raised`, `border-control`, `border-success`, `border-danger`, `text-success`, `text-danger`, `text-ink`, `type-label`, `type-small`.

## Accessibility

With `live`, danger uses `role="alert"` and others use `role="status"`, so screen readers announce them. For that to work, render the live region when the alert appears, not on page load.

## Rendering

Server.
