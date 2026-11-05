import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/docs/design/components";
import { fontVariables } from "@/docs/design/tokens/fonts";
import { ReserveTable } from "@/components/site/ReserveTable";
import { navLinks, openingHoursSummary, site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader links={navLinks} actions={<ReserveTable compact variant="secondary" />} />
        <main className="flex-1">{children}</main>
        <SiteFooter
          groups={[{ title: "Explore", links: navLinks }]}
          info={
            <>
              <div>
                <h2 className="mb-3 type-label">Visit</h2>
                <address className="type-small text-ink-muted not-italic">
                  {site.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <a
                    href={site.phone.href}
                    className="mt-1 flex min-h-11 items-center underline-offset-4 hover:text-ink hover:underline"
                  >
                    {site.phone.display}
                  </a>
                </address>
              </div>
              <div>
                <h2 className="mb-3 type-label">Opening hours</h2>
                <dl className="type-small text-ink-muted">
                  {openingHoursSummary.map(({ days, hours }) => (
                    <div key={days} className="flex flex-wrap gap-x-2">
                      <dt>{days}</dt>
                      <dd className="tabular-nums">{hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </>
          }
          legal={<p>{site.name}, Southend-on-Sea.</p>}
        />
      </body>
    </html>
  );
}
