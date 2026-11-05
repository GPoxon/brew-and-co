# SiteFooter

Seal, optional shop details, grouped links and company details. Use once, at the end of the layout.

## Usage

```tsx
<SiteFooter
  groups={[{ title: "Shop", links: [{ href: "/coffee", label: "Coffee" }] }]}
  legal={<p>Registered company details go here.</p>}
/>
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `groups` | `{ title, links: { href, label }[] }[]` | Required | Link columns |
| `info` | `ReactNode` | | Columns before the links, such as the address and opening hours. Start each with an `h2` |
| `legal` | `ReactNode` | Required | Company details |

## States and variants

Links darken from muted to ink and underline on hover. The layout stacks below `md`.

## Tokens

`border-rule`, `text-ink-muted`, `text-ink`, `type-label`, `type-small`, `type-caption`.

## Accessibility

Uses a `footer` landmark and a labelled `nav`. Group titles are `h2`s. Link rows are 32px tall, which is under the system's 44px target but acceptable for lists of text links in a footer.

## Rendering

Server.
