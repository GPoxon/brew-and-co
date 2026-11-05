import { cn } from "./cn";

const variants = {
  /** Descriptive: tasting notes, dietary marks. */
  outline: "border border-rule text-ink",
  /** One status per item: "New crop", "Sold out". */
  solid: "bg-ink text-surface",
};

export function Tag({
  variant = "outline",
  className,
  children,
}: {
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-control px-2 py-0.5 type-caption",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TastingNotes({
  notes,
  className,
}: {
  notes: string[];
  className?: string;
}) {
  return (
    <ul aria-label="Tasting notes" className={cn("flex flex-wrap gap-1.5", className)}>
      {notes.map((note) => (
        <li key={note}>
          <Tag>{note}</Tag>
        </li>
      ))}
    </ul>
  );
}
