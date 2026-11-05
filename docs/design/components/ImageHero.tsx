import Image from "next/image";
import type { ReactNode } from "react";
import { PourRule } from "./PourRule";
import { Seal } from "./Seal";
import { Surface } from "./Surface";

type ImageHeroProps = {
  /** Short tracked line that leads into the headline. Part of the h1. */
  lead?: string;
  title: string;
  /** One line in the signature script, read as the end of the headline. */
  signature?: string;
  body?: ReactNode;
  /** One or two actions, primary first. */
  actions?: ReactNode;
  image: { src: string; alt: string };
  /** Draws the pour line on load. Leave on for the first hero on a page only. */
  animate?: boolean;
  /** The headline's level. Only a page that already has an h1 should change it. */
  heading?: "h1" | "h2";
};

/**
 * The opening block with a full-bleed photograph behind the headline. The block
 * below it must be a different surface, as the seal sits across that seam.
 */
export function ImageHero({
  lead,
  title,
  signature,
  body,
  actions,
  image,
  animate = true,
  heading: Heading = "h1",
}: ImageHeroProps) {
  return (
    <Surface as="div" tone="roast" pad="none" className="relative">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-scrim" />
      <div className="relative flex min-h-144 flex-col justify-center px-gutter pt-block pb-24 md:min-h-176 md:pb-block">
        <div className="mx-auto w-full max-w-page">
          <Heading className="flex flex-col">
            {lead && <span className="mb-4 type-stamp">{lead}</span>}
            <span className="type-display">{title}</span>
            {signature && <span className="mt-2 type-signature">{signature}</span>}
          </Heading>
          <PourRule animate={animate} className="mt-4" />
          {body && <div className="mt-8 max-w-measure type-lead">{body}</div>}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
      <div className="absolute right-gutter bottom-0 z-10 translate-y-1/2">
        <Seal size={152} />
      </div>
    </Surface>
  );
}
