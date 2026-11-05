import { cn } from "./cn";

const names = ["Light", "Medium light", "Medium", "Medium dark", "Dark"];

type RoastMeterProps = {
  /** 1 (light) to 5 (dark). */
  level: 1 | 2 | 3 | 4 | 5;
  className?: string;
};

export function RoastMeter({ level, className }: RoastMeterProps) {
  const name = names[level - 1];
  return (
    <div
      role="img"
      aria-label={`Roast: ${name}, ${level} of 5`}
      className={cn("flex items-center gap-3", className)}
    >
      <span aria-hidden className="flex items-center gap-1">
        {names.map((_, index) => (
          <span
            key={index}
            className={cn(
              "h-3 w-5 border border-ink",
              index < level && "bg-ink",
            )}
          />
        ))}
      </span>
      <span aria-hidden className="type-caption text-ink-muted">
        {name}
      </span>
    </div>
  );
}
