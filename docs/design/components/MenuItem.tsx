import Image from "next/image";
import { Tag } from "./Tag";

const price = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

type MenuItemProps = {
  name: string;
  priceGbp: number;
  description: string;
  /** Path to a square-cropped photo. Decorative, as the name sits beside it. */
  image: string;
  /** One short status, such as "Popular". */
  badge?: string;
};

/** A café menu item with a photo. Render inside a <ul>, under an h2. */
export function MenuItem({ name, priceGbp, description, image, badge }: MenuItemProps) {
  return (
    <li className="flex gap-4 md:gap-6">
      <div className="relative size-24 shrink-0 bg-raised md:size-36">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 768px) 144px, 96px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <h3 className="type-lead">{name}</h3>
          <span
            aria-hidden
            className="min-w-6 flex-1 translate-y-[-0.2em] border-b border-dotted border-control"
          />
          <span className="type-lead tabular-nums">{price.format(priceGbp)}</span>
        </div>
        <p className="mt-1 max-w-measure type-small text-ink-muted">{description}</p>
        {badge && (
          <Tag variant="solid" className="mt-2">
            {badge}
          </Tag>
        )}
      </div>
    </li>
  );
}
