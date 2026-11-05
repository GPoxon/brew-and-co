# Component specs

Every component renders as a Server Component except `QuantityStepper`, `Dialog` and `HeaderMenu`, the small client part of `SiteHeader`. Import from `@/docs/design/components`.

| Group | Components |
|---|---|
| Brand | [Logo](logo.md), [Seal](seal.md), [PourRule](pour-rule.md), [Icon](icon.md), [BagArt](bag-art.md) |
| Layout | [Surface](surface.md), [Hero](hero.md), [ImageHero](image-hero.md), [SiteHeader](site-header.md), [SiteFooter](site-footer.md), [Dialog](dialog.md) |
| Actions | [Button](button.md), [TextLink](text-link.md) |
| Forms | [Field](field.md), [Choice](choice.md), [QuantityStepper](quantity-stepper.md) |
| Coffee | [ProductCard](product-card.md), [RoastMeter](roast-meter.md), [Tag](tag.md), [MenuRow](menu-row.md), [MenuItem](menu-item.md), [ProofRow](proof-row.md) |
| Content and feedback | [Accordion](accordion.md), [Alert](alert.md), [Skeleton](skeleton.md) |

`className` is for layout such as margins and width. `cn` does not resolve conflicting classes, so don't use it to restyle a component. Add a variant instead.

## Template for new components

```markdown
# Name
What it is, and when to use it.

## Usage
A short example.

## Props
Table of prop, type, default and purpose.

## States and variants
Every visual state.

## Tokens
Which semantic tokens it uses.

## Accessibility
Semantics, keyboard behaviour, what screen readers hear.

## Rendering
Server or Client, and why.
```
