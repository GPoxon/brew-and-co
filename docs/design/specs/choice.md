# Checkbox and ChoiceGroup

`Checkbox` is a yes-or-no choice. `ChoiceGroup` picks one option from a set, as a plain list or as tiles.

## Usage

```tsx
<Checkbox label="Email me when new coffees land" name="updates" />

<ChoiceGroup
  legend="Grind"
  name="grind"
  appearance="tiles"
  defaultValue="filter"
  options={[
    { value: "whole", label: "Whole bean", detail: "Grind at home" },
    { value: "espresso", label: "Espresso", detail: "Out of stock", disabled: true },
  ]}
/>
```

## Props

### ChoiceGroup

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `legend` | `string` | Required | Names the group |
| `name` | `string` | Required | Form field name |
| `options` | `{ value, label, detail?, disabled? }[]` | Required | Choices |
| `defaultValue` | `string` | | Selected on load |
| `appearance` | `"list" \| "tiles"` | `"list"` | Use tiles for choices people compare |
| `required` | `boolean` | | Form validation |

### Checkbox

Takes `label` and the props of `input`.

## States and variants

| State | List and checkbox | Tile |
|---|---|---|
| Rest | Native control in `action` colour | 1px `border-control` |
| Hover | Browser default | `border-ink` |
| Selected | Filled | 2px `border-ink`, `bg-raised` |
| Focus | Ring on the control | Ring on the tile |
| Disabled | 50% opacity | 50% opacity |

Tiles go from two columns to four at `md`. A selected tile compensates for its thicker border, so nothing shifts.

## Tokens

`--action`, `border-control`, `border-ink`, `bg-raised`, `outline-focus`, `text-ink-muted`, `type-label`, `type-small`, `type-caption`.

## Accessibility

Built on native radios in a `fieldset` with a `legend`, so arrow keys move through the group. Every row is at least 44px tall, and the whole label is clickable.

## Rendering

Server. Selected and focus styling are CSS `:has()`, so no JavaScript is needed.
