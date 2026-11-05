# TextLink and ExternalLink

Links inside running text. `TextLink` is for pages on this site, and `ExternalLink` opens other sites in a new tab.

## Usage

```tsx
<p>Read our <TextLink href="/brew/v60">V60 guide</TextLink>.</p>
<ExternalLink href="https://example.com">Grower report</ExternalLink>
```

## Props

Takes the props of `next/link` or `a`, respectively.

## States and variants

Always underlined. Changes from accent to ink on hover, and shows the focus ring on keyboard focus.

## Tokens

`text-accent-ink`, `text-ink`.

## Accessibility

The underline means links aren't identified by colour alone. `ExternalLink` adds hidden text saying it opens in a new tab. Link text should make sense on its own, so avoid "click here".

## Rendering

Server.
