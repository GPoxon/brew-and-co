# SiteHeader

The logo, main navigation and right-hand controls. Use once, at the top of the layout.

## Usage

```tsx
<SiteHeader
  links={[{ href: "/coffee", label: "Coffee" }]}
  actions={
    <Suspense fallback={<BagLink count={null} />}>
      <LiveBagLink />
    </Suspense>
  }
/>
```

`BagLink` and `LiveBagLink` above stand for your own components.

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `links` | `{ href, label }[]` | Required | Up to 5 links |
| `actions` | `ReactNode` | | Controls on the right |

## States and variants

- **`md` and up:** inline navigation.
- **Below `md`:** the menu icon opens a panel over the page, with 48px rows. The icon changes to a close icon.
- **Link hover:** underline.

Below `sm`, make `actions` icon-only by wrapping their text in `max-sm:sr-only`, or the header overflows at 360px.

## Tokens

`bg-surface`, `border-rule`, `type-label`, `type-lead`, `shadow-overlay`.

## Accessibility

Navigation is a labelled `nav`. The menu is a native `<details>`, so it opens with Enter or Space and exposes its state. 

`HeaderMenu` closes the panel when a link inside it is followed, including a link to the current page.

**Known limitation:** the panel stays open when someone clicks outside it.

## Rendering

Server, apart from `HeaderMenu`, a small client wrapper around the `<details>`. A live bag count reads cookies, so wrap it in `<Suspense>` to keep the header in the static shell.
