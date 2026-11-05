import { useId } from "react";
import { cn } from "./cn";

/** Pour-over cone over a cup, as faceted line-work. Inherits the surface accent. */
export function LogoMark({
  size = 48,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const gradient = useId();
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke={`url(#${gradient})`}
      strokeWidth={1.75}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient
          id={gradient}
          gradientUnits="userSpaceOnUse"
          x1="32"
          y1="6"
          x2="32"
          y2="60"
        >
          <stop offset="0" style={{ stopColor: "var(--accent-from)" }} />
          <stop offset="1" style={{ stopColor: "var(--accent-to)" }} />
        </linearGradient>
      </defs>
      {/* Cone */}
      <path d="M10 8h44L38 32H26L10 8Z" />
      <path d="M23 8l7 24M41 8l-7 24" />
      {/* Collar */}
      <path d="M20 36h24" />
      {/* Cup */}
      <path d="M22 40h20l-3 18H25l-3-18Z" />
      <path d="M26 40l3 18M38 40l-3 18" />
    </svg>
  );
}

/** Mark and wordmark together. Use once in each header and footer. */
export function Logo({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark size={size} />
      <span className="font-display text-[1.5rem] leading-none whitespace-nowrap">
        Brew &amp; Co.
      </span>
    </span>
  );
}
