import Link from "next/link";
import type { ReactNode } from "react";
import { HeaderMenu } from "./HeaderMenu";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Surface } from "./Surface";

type NavLink = { href: string; label: string };

type SiteHeaderProps = {
  links: NavLink[];
  /**
   * Right-hand controls, such as the bag link. Below sm, keep them icon-only
   * (wrap the text in max-sm:sr-only) or the header overflows at 360px. A live
   * bag count reads cookies, so wrap it in <Suspense> to keep the static shell.
   */
  actions?: ReactNode;
};

/** The small-screen menu is a <details>. HeaderMenu only adds closing on navigation. */
export function SiteHeader({ links, actions }: SiteHeaderProps) {
  return (
    <Surface
      as="header"
      tone="roast"
      pad="none"
      className="relative z-20 flex h-20 items-center justify-between gap-3 border-b border-rule px-gutter md:gap-6"
    >
      <Link href="/" aria-label="Brew & Co. home" className="flex">
        <Logo />
      </Link>

      <nav aria-label="Main" className="hidden md:block">
        <ul className="flex gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="type-label underline-offset-8 hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        {actions}
        <HeaderMenu className="group md:hidden">
          <summary className="grid size-11 cursor-pointer list-none place-items-center [&::-webkit-details-marker]:hidden">
            <Icon name="menu" className="group-open:hidden" />
            <Icon name="close" className="hidden group-open:block" />
            <span className="sr-only">Menu</span>
          </summary>
          <nav
            aria-label="Main"
            className="absolute inset-x-0 top-full border-b border-rule bg-surface px-gutter py-4 shadow-overlay"
          >
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-12 items-center type-lead"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </HeaderMenu>
      </div>
    </Surface>
  );
}
