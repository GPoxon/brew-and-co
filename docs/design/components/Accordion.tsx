import type { ReactNode } from "react";
import { Icon } from "./Icon";

type AccordionProps = {
  items: { title: string; content: ReactNode }[];
  /** Give a name to keep only one item open at a time. */
  exclusiveName?: string;
  /** Index of the item open on load. */
  defaultOpen?: number;
};

/** Built on <details>, so it works without client JavaScript. */
export function Accordion({ items, exclusiveName, defaultOpen }: AccordionProps) {
  return (
    <div className="divide-y divide-rule border-y border-rule">
      {items.map((item, index) => (
        <details
          key={item.title}
          name={exclusiveName}
          open={index === defaultOpen}
          className="group"
        >
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 type-lead [&::-webkit-details-marker]:hidden">
            {item.title}
            <Icon
              name="chevron"
              className="shrink-0 transition-transform duration-(--duration-settle) ease-pour group-open:rotate-180"
            />
          </summary>
          <div className="max-w-measure pb-5 text-ink-muted">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
