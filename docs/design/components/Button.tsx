import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "./cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control type-label whitespace-nowrap transition-colors duration-(--duration-quick) disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-action text-on-action hover:bg-action-hover",
  secondary:
    "border border-control text-ink hover:border-ink hover:bg-raised",
  quiet: "text-ink underline-offset-4 hover:underline",
};

const sizes = {
  md: "h-12 px-6",
  sm: "h-10 px-4",
  icon: "size-12",
};

type Style = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

type ButtonProps = ComponentProps<"button"> &
  Style & {
    /** Disables the button and marks it busy. Keep the label unchanged. */
    pending?: boolean;
  };

export function Button({
  variant = "primary",
  size = "md",
  pending = false,
  type = "button",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        pending && "animate-steam disabled:opacity-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/** Looks like a Button, navigates like a link. Use when the action changes page. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & Style) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
