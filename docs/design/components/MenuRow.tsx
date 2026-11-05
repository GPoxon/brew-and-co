import { TastingNotes } from "./Tag";

const price = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

type MenuRowProps = {
  name: string;
  priceGbp: number;
  description?: string;
  /** Dietary or allergen marks, in words: "Oat milk", "Contains nuts". */
  marks?: string[];
};

/** One item on the café menu. Render inside a <ul>. */
export function MenuRow({ name, priceGbp, description, marks }: MenuRowProps) {
  return (
    <li className="py-3">
      <div className="flex items-baseline gap-2">
        <span className="type-lead">{name}</span>
        <span
          aria-hidden
          className="min-w-6 flex-1 translate-y-[-0.2em] border-b border-dotted border-control"
        />
        <span className="type-lead tabular-nums">{price.format(priceGbp)}</span>
      </div>
      {description && (
        <p className="mt-0.5 max-w-measure type-small text-ink-muted">
          {description}
        </p>
      )}
      {marks && marks.length > 0 && (
        <TastingNotes notes={marks} className="mt-2" />
      )}
    </li>
  );
}
