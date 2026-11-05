# Accordion

Questions or details that open in place. Use it for optional information, not for content most people need.

## Usage

```tsx
<Accordion
  exclusiveName="faq"
  defaultOpen={0}
  items={[{ title: "When will my coffee arrive?", content: "Most orders arrive by Friday." }]}
/>
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `items` | `{ title: string, content: ReactNode }[]` | Required | Titles must be unique |
| `exclusiveName` | `string` | | Set to keep only one item open at a time |
| `defaultOpen` | `number` | | Index open on load |

## States and variants

Closed or open, with the chevron turning over 240ms. Panels open instantly. Rows are at least 56px tall.

## Tokens

`divide-rule`, `border-rule`, `type-lead`, `text-ink-muted`, `ease-pour`.

## Accessibility

Native `<details>`, so keyboard support and state come from the browser.

## Rendering

Server. No client JavaScript needed.
