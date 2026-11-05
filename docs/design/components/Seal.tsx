import { useId } from "react";
import { cn } from "./cn";
import { LogoMark } from "./Logo";

const RADIUS = 72;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type SealProps = {
  /** Ring text. Keep it between 24 and 34 characters so spacing stays even. */
  text?: string;
  /** Diameter in pixels. Keep it at 96 or larger or the ring text stops being readable. */
  size?: number;
  tone?: "roast" | "stone" | "kraft" | "patina";
  className?: string;
};

export function Seal({
  text = "Brew & Co. Southend-on-Sea",
  size = 200,
  tone = "roast",
  className,
}: SealProps) {
  const pathId = useId();
  const ringId = useId();
  return (
    <div
      data-surface={tone}
      role="img"
      aria-label={text}
      style={{ width: size, height: size }}
      className={cn("relative shrink-0 rounded-full", className)}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0" aria-hidden>
        <defs>
          <linearGradient id={ringId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "var(--accent-from)" }} />
            <stop offset="1" style={{ stopColor: "var(--accent-to)" }} />
          </linearGradient>
          <path
            id={pathId}
            d={`M100 100m-${RADIUS} 0a${RADIUS} ${RADIUS} 0 1 1 ${RADIUS * 2} 0a${RADIUS} ${RADIUS} 0 1 1 -${RADIUS * 2} 0`}
          />
        </defs>
        <circle
          cx="100"
          cy="100"
          r="97"
          fill="none"
          stroke={`url(#${ringId})`}
          strokeWidth="1.5"
        />
        <text
          fill="var(--accent-ink)"
          fontFamily="var(--font-sans)"
          fontSize="20"
          fontWeight="500"
        >
          <textPath
            href={`#${pathId}`}
            textLength={CIRCUMFERENCE - 6}
            lengthAdjust="spacing"
          >
            {`${text.toUpperCase()} • `}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <LogoMark size={Math.round(size * 0.32)} />
      </span>
    </div>
  );
}

/**
 * Pins a Seal across a block edge: the top edge on small screens, the left edge
 * from md up. Put it inside a position: relative block with no overflow clipping.
 */
export function SealOnSeam({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:left-0">
      {children}
    </div>
  );
}
