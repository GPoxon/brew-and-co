# Skeleton and ProductCardSkeleton

Placeholder shapes for content that is still loading. This repo uses Cache Components, so these are the `<Suspense>` fallbacks that ship in the static shell.

## Usage

```tsx
<Suspense fallback={<ProductCardSkeleton />}>
  <LiveProductCard id="daybreak" />
</Suspense>

<Skeleton className="h-6 w-1/2" />
```

`LiveProductCard` above stands for your own component.

## Props

`Skeleton` takes `className` for its size. `ProductCardSkeleton` takes no props and mirrors `ProductCard`'s layout to limit layout shift.

## States and variants

A slow fade in `bg-raised`. With reduced motion it stays still.

## Tokens

`bg-raised`, `animate-steam`.

## Accessibility

`Skeleton` is hidden from screen readers. `ProductCardSkeleton` has `role="status"` and the label "Loading product". For a grid of them, label the group once instead of repeating it on each card.

## Rendering

Server.
