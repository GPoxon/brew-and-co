import type { Metadata } from "next";
import { Alert, MenuItem, Surface, type SurfaceTone } from "@/docs/design/components";
import { menu } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Espresso drinks, pastries, sandwiches and cold drinks at Brew & Co. in Southend-on-Sea.",
};

const tones: Record<string, SurfaceTone> = {
  "espresso-drinks": "roast",
  pastries: "stone",
  sandwiches: "kraft",
  "cold-drinks": "patina",
};

export default function MenuPage() {
  return (
    <>
      <Surface as="div" tone="roast" pad="none" className="px-gutter pt-block pb-10 md:pb-12">
        <div className="mx-auto max-w-page">
          <h1 className="type-h1">Menu</h1>
          <p className="mt-4 max-w-measure type-lead">
            Speciality coffee, fresh pastries and light lunches.
          </p>
          <Alert title="Allergies or intolerances?" className="mt-8 max-w-measure">
            Please tell a member of staff before you order.
          </Alert>
        </div>
      </Surface>

      <Surface
        as="nav"
        tone="roast"
        pad="none"
        aria-label="Menu sections"
        className="sticky top-0 z-10 overflow-x-auto border-y border-rule px-gutter"
      >
        <ul className="mx-auto flex max-w-page gap-6 py-1 md:gap-10">
          {menu.map((category) => (
            <li key={category.id} className="shrink-0">
              <a
                href={`#${category.id}`}
                className="flex min-h-12 items-center type-label underline-offset-8 hover:underline"
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </Surface>

      {menu.map((category) => (
        <Surface
          key={category.id}
          id={category.id}
          tone={tones[category.id]}
          aria-labelledby={`${category.id}-title`}
          className="scroll-mt-16"
        >
          <div className="mx-auto max-w-page">
            <h2 id={`${category.id}-title`} className="type-h2">
              {category.name}
            </h2>
            <ul className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-2">
              {category.items.map((item) => (
                <MenuItem
                  key={item.name}
                  name={item.name}
                  priceGbp={item.priceGbp}
                  description={item.description}
                  image={item.image}
                  badge={item.badge}
                />
              ))}
            </ul>
          </div>
        </Surface>
      ))}
    </>
  );
}
