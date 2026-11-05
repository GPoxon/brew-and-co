import { cn } from "./cn";
import { Icon, type IconName } from "./Icon";

type ProofRowProps = {
  /** Three or four short promises the business can back up. */
  items: { icon: IconName; label: string }[];
  className?: string;
};

export function ProofRow({ items, className }: ProofRowProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-y-6 md:flex md:divide-x md:divide-rule",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item.label}
          className="flex flex-col items-center gap-2 px-4 text-center md:flex-1 md:px-6"
        >
          <Icon name={item.icon} size={32} className="text-accent-ink" />
          <span className="type-stamp text-accent-ink">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
