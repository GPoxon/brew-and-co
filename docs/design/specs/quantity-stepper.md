# QuantityStepper

Sets how many of an item to buy. It's for small counts, typically in the bag or on a product page.

## Usage

```tsx
<form action={addToBag}>
  <QuantityStepper itemLabel="bags of Daybreak" />
  <Button type="submit">Add to bag</Button>
</form>
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `itemLabel` | `string` | Required | Used in accessible names: "Add one of bags of Daybreak" |
| `name` | `string` | `"quantity"` | Submitted form field |
| `defaultValue` | `number` | 1 | Starting value |
| `min` | `number` | 1 | Lowest value |
| `max` | `number` | 24 | Highest value |
| `onChange` | `(value: number) => void` | | Called on each change. Needs a client parent |
| `className` | `string` | | Layout |

## States and variants

The minus button disables at `min` and the plus button at `max`. Buttons fill with `bg-raised` on hover. The container is 46px tall.

## Tokens

`border-control`, `bg-raised`, `rounded-control`, `type-label`.

## Accessibility

A labelled group with an `output` that announces changes politely. Note that when a button disables at the limit, keyboard focus is lost from it.

## Rendering

**Client.** This is the only client component. It works inside a Server Component page, and the value is submitted through a hidden input.
