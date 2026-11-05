# Logo and LogoMark

`Logo` is the mark and wordmark together. `LogoMark` is the mark alone. The mark is a pour-over cone above a cup, drawn as faceted line-work.

**This is a placeholder.** It stands in until a final logo is drawn. Replacing the SVG in `Logo.tsx` updates it everywhere, including the seal and bag.

## Usage

```tsx
<Logo />
<LogoMark size={64} />
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `size` | `number` | 40 (`Logo`), 48 (`LogoMark`) | Mark size in pixels. Keep it at 24 or above |
| `className` | `string` | | Layout |

## States and variants

The gradient follows the surface: gilt on roast and patina, dark on stone and kraft.

## Tokens

`--accent-from`, `--accent-to`, `font-display`.

## Accessibility

The mark is hidden from screen readers. When `Logo` is a link, name the link, as `SiteHeader` does with "Brew & Co. home".

## Rendering

Server. `useId` keeps gradient ids unique.
