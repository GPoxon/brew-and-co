import { cn } from "./cn";

/** A placeholder shape. Size it with className to match what will load. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block animate-steam bg-raised", className)}
    />
  );
}

/**
 * Suspense fallback for ProductCard. It matches the card's layout, so the page
 * does not shift when stock or price data streams in.
 */
export function ProductCardSkeleton() {
  return (
    <div role="status" aria-label="Loading product" className="flex flex-col">
      <Skeleton className="aspect-square w-full" />
      <div className="flex flex-col gap-4 p-6">
        <div>
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="mt-2 h-5 w-1/2" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="mt-2 h-10 w-full" />
      </div>
    </div>
  );
}
