import Link from "next/link";
import type { ReactNode } from "react";
import { RoastMeter } from "./RoastMeter";
import { Surface, type SurfaceTone } from "./Surface";
import { Tag, TastingNotes } from "./Tag";

const price = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export type ProductCardProps = {
  name: string;
  href: string;
  /** Where it comes from, or what kind of blend it is. */
  origin: string;
  notes: string[];
  roast: 1 | 2 | 3 | 4 | 5;
  /** Price in pounds for the stated size. */
  priceGbp: number;
  size: string;
  /** A next/image or BagArt. */
  image: ReactNode;
  /** Colour of the block behind the image. */
  imageTone?: SurfaceTone;
  /** A single status, such as "New crop". */
  status?: string;
  /** Add-to-bag control. Sits above the card's link, so it stays clickable. */
  action?: ReactNode;
  /** Heading level for the product name. Match the page outline. */
  headingLevel?: "h2" | "h3" | "h4";
};

export function ProductCard({
  name,
  href,
  origin,
  notes,
  roast,
  priceGbp,
  size,
  image,
  imageTone = "stone",
  status,
  action,
  headingLevel: Heading = "h3",
}: ProductCardProps) {
  return (
    <article className="group relative flex flex-col">
      <Surface
        as="div"
        tone={imageTone}
        pad="none"
        className="relative grid aspect-square place-items-center p-8"
      >
        {image}
        {status && (
          <Tag variant="solid" className="absolute top-4 left-4">
            {status}
          </Tag>
        )}
      </Surface>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <Heading className="type-h3">
            <Link
              href={href}
              className="underline-offset-4 group-hover:underline after:absolute after:inset-0"
            >
              {name}
            </Link>
          </Heading>
          <p className="mt-1 type-small text-ink-muted">{origin}</p>
        </div>
        <TastingNotes notes={notes} />
        <RoastMeter level={roast} />
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="type-label">
            {price.format(priceGbp)}
            <span className="ml-2 font-normal text-ink-muted">{size}</span>
          </p>
          {action && <div className="relative z-10">{action}</div>}
        </div>
      </div>
    </article>
  );
}
