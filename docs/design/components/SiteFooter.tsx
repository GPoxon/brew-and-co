import Link from "next/link";
import type { ReactNode } from "react";
import { Seal } from "./Seal";
import { Surface } from "./Surface";

type SiteFooterProps = {
  groups: { title: string; links: { href: string; label: string }[] }[];
  /** Columns before the links, such as the address and opening hours. Each starts with an h2. */
  info?: ReactNode;
  /** Company details, such as the registered name and address. */
  legal: ReactNode;
};

export function SiteFooter({ groups, info, legal }: SiteFooterProps) {
  return (
    <Surface as="footer" tone="roast" className="border-t border-rule">
      <div className="flex flex-col gap-12 md:flex-row md:justify-between">
        <Seal size={128} />
        {info && <div className="flex flex-wrap gap-x-16 gap-y-8">{info}</div>}
        <nav aria-label="Footer" className="flex flex-wrap gap-x-16 gap-y-8">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="mb-3 type-label">{group.title}</h2>
              <ul className="flex flex-col gap-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex min-h-8 items-center type-small text-ink-muted underline-offset-4 hover:text-ink hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="mt-12 border-t border-rule pt-6 type-caption text-ink-muted">
        {legal}
      </div>
    </Surface>
  );
}
