import type { ReactNode } from "react";
import { PourRule } from "./PourRule";
import { Seal, SealOnSeam } from "./Seal";
import { Surface, type SurfaceTone } from "./Surface";

type HeroProps = {
  /** Short tracked line that leads into the headline. Part of the h1. */
  lead?: string;
  title: string;
  /** One line in the signature script, read as the end of the headline. */
  signature?: string;
  body?: ReactNode;
  /** One ButtonLink, or a primary and a secondary. */
  actions?: ReactNode;
  /** A next/image with fill and preload, or BagArt. */
  visual: ReactNode;
  visualTone?: SurfaceTone;
  /** Draws the pour line on load. Leave on for the first hero on a page only. */
  animate?: boolean;
};

export function Hero({
  lead,
  title,
  signature,
  body,
  actions,
  visual,
  visualTone = "stone",
  animate = true,
}: HeroProps) {
  return (
    <div className="grid md:grid-cols-[3fr_2fr]">
      <Surface
        as="div"
        tone="roast"
        className="flex flex-col justify-center pb-24 md:pb-block"
      >
        <h1 className="flex flex-col">
          {lead && <span className="mb-4 type-stamp">{lead}</span>}
          <span className="type-display">{title}</span>
          {signature && <span className="mt-2 type-signature">{signature}</span>}
        </h1>
        <PourRule animate={animate} className="mt-4" />
        {body && <div className="mt-8 max-w-measure type-lead">{body}</div>}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </Surface>
      <Surface
        as="div"
        tone={visualTone}
        pad="none"
        className="relative grid min-h-96 place-items-center px-12 pt-28 pb-12 md:p-16"
      >
        {visual}
        <SealOnSeam>
          <Seal size={152} />
        </SealOnSeam>
      </Surface>
    </div>
  );
}
