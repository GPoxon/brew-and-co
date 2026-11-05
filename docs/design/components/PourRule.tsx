import { useId } from "react";
import { cn } from "./cn";

type PourRuleProps = {
  /** Draws the line once on load. Use on the first hero of a page only. */
  animate?: boolean;
  className?: string;
};

/** A single rising gilt stroke that closes a headline. Decorative. */
export function PourRule({ animate = false, className }: PourRuleProps) {
  const gradient = useId();
  return (
    <svg
      viewBox="0 0 400 16"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      className={cn("block h-3 w-full max-w-md", className)}
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--accent-to)" }} />
          <stop offset="1" style={{ stopColor: "var(--accent-from)" }} />
        </linearGradient>
      </defs>
      <path
        d="M2 13C110 7 250 3 398 3"
        stroke={`url(#${gradient})`}
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        strokeDasharray={1}
        className={animate ? "animate-pour" : undefined}
      />
    </svg>
  );
}
