import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "./cn";

const style =
  "text-accent-ink underline decoration-1 underline-offset-4 transition-colors duration-(--duration-quick) hover:text-ink";

/** Inline link inside running text. */
export function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return <Link className={cn(style, className)} {...props} />;
}

/** For other sites. Opens in a new tab and says so to screen readers. */
export function ExternalLink({
  className,
  children,
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(style, className)}
      {...props}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
