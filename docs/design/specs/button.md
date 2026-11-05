# Button and ButtonLink

`Button` performs an action. `ButtonLink` looks the same but goes to another page, using `next/link`. If it changes the URL, use `ButtonLink`.

## Usage

```tsx
<Button type="submit">Add to bag</Button>
<ButtonLink href="/coffee" variant="secondary">Shop coffee</ButtonLink>
<Button size="icon" variant="secondary" aria-label="Close">
  <Icon name="close" />
</Button>
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "quiet"` | `"primary"` | Emphasis |
| `size` | `"md" \| "sm" \| "icon"` | `"md"` | 48px, 40px, or 48px square |
| `pending` | `boolean` | `false` | `Button` only. Disables it and marks it busy |
| `type` | Button type | `"button"` | `Button` only. Set `"submit"` in forms |
| Others | Props of `button` or `Link` | | Passed through |

## States and variants

| State | Primary | Secondary | Quiet |
|---|---|---|---|
| Rest | `bg-action`, `text-on-action` | `border-control`, `text-ink` | `text-ink` |
| Hover | `bg-action-hover` | `border-ink`, `bg-raised` | Underline |
| Focus | 2px `outline-focus`, 2px offset | Same | Same |
| Disabled | 50% opacity | Same | Same |
| Pending | Slow fade | Same | Same |

Use one primary per view. Write labels as a verb in sentence case, and don't change them mid-flow: "Add to bag" leads to "Added to bag".

`pending` works with `useFormStatus` in a client child of the form.

## Tokens

`bg-action`, `text-on-action`, `bg-action-hover`, `border-control`, `bg-raised`, `text-ink`, `rounded-control`, `type-label`.

## Accessibility

Native elements, so Enter and Space work by default. Icon-only buttons need `aria-label`. `sm` is below the 44px touch target, so use it only in dense product layouts.

## Rendering

Server, but `onClick` needs a client parent. A Server Action in a `<form>` doesn't.
