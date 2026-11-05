import { cn } from "./cn";
import { LogoMark } from "./Logo";

const colourways = {
  roast: { front: "var(--color-roast-900)", gusset: "var(--color-kraft-500)", base: "var(--color-stone-300)" },
  patina: { front: "var(--color-patina-800)", gusset: "var(--color-stone-300)", base: "var(--color-stone-100)" },
  kraft: { front: "var(--color-kraft-700)", gusset: "var(--color-roast-900)", base: "var(--color-stone-300)" },
};

type BagArtProps = {
  /** Printed on the label. Keep it under 14 characters. */
  name: string;
  colourway?: keyof typeof colourways;
  className?: string;
};

/**
 * Colour-blocked pack drawing, used until product photography exists. It is
 * decorative: ProductCard carries the product name as real text.
 */
export function BagArt({ name, colourway = "roast", className }: BagArtProps) {
  const colours = colourways[colourway];
  return (
    <div className={cn("relative aspect-[4/5] w-full max-w-72", className)} aria-hidden>
      <svg viewBox="0 0 240 300" className="absolute inset-0 size-full">
        {/* Gusset, split into two paper blocks. The pouch widens as it fills. */}
        <path d="M34 44 96 32v88l-74 12c1-30 5-60 12-88Z" fill={colours.gusset} />
        <path d="M22 132l74-12v168c-28-3-56-9-82-17 1-48 3-95 8-139Z" fill={colours.base} />
        {/* Front panel */}
        <path
          d="M96 32c40 1 80 4 116 9 6 76 10 154 12 230-42 8-86 14-128 17Z"
          fill={colours.front}
        />
        {/* Rolled top with a tin tie */}
        <path d="M34 44 96 32l116 9-1-21L96 12 35 24Z" fill="var(--color-roast-950)" />
        <path d="M30 34 96 22l120 8" fill="none" stroke="var(--color-gilt-500)" strokeWidth="2" />
        {/* Label */}
        <path d="M108 180l106 6c1 15 1 29 2 44l-108 5Z" fill="var(--color-ivory)" />
        <text
          x="161"
          y="212"
          textAnchor="middle"
          fill="var(--color-roast-900)"
          fontFamily="var(--font-display)"
          fontSize="15"
        >
          {name}
        </text>
      </svg>
      {/* Printed mark, always reversed on the dark front panel */}
      <div
        data-surface="roast"
        className="absolute top-[28%] left-[66%] -translate-x-1/2 bg-transparent!"
      >
        <LogoMark size={56} />
      </div>
    </div>
  );
}
