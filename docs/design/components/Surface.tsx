import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "./cn";

export type SurfaceTone = "roast" | "stone" | "kraft" | "patina";

const padding = {
  none: "",
  block: "px-gutter py-block",
  tight: "p-6 md:p-8",
};

type SurfaceProps<T extends ElementType> = {
  as?: T;
  tone?: SurfaceTone;
  pad?: keyof typeof padding;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * A colour block. Sets data-surface, so every semantic token inside it (ink,
 * action, rule, accent and so on) resolves to values that pass contrast on it.
 */
export function Surface<T extends ElementType = "section">({
  as,
  tone = "roast",
  pad = "block",
  className,
  ...props
}: SurfaceProps<T>) {
  const Tag: ElementType = as ?? "section";
  return (
    <Tag
      data-surface={tone}
      className={cn(padding[pad], className)}
      {...props}
    />
  );
}
