import type { ComponentProps } from "react";
import { cn } from "./cn";

const mark = "size-5 shrink-0 cursor-pointer accent-(--action)";

export function Checkbox({
  label,
  className,
  ...props
}: { label: string } & Omit<ComponentProps<"input">, "type">) {
  return (
    <label
      className={cn(
        "flex min-h-11 cursor-pointer items-center gap-3 type-small has-disabled:cursor-not-allowed has-disabled:opacity-50",
        className,
      )}
    >
      <input type="checkbox" className={mark} {...props} />
      {label}
    </label>
  );
}

export type Choice = {
  value: string;
  label: string;
  /** Second line, for example "For V60 and Chemex". */
  detail?: string;
  disabled?: boolean;
};

type ChoiceGroupProps = {
  legend: string;
  name: string;
  options: Choice[];
  defaultValue?: string;
  /** list: a plain stack. tiles: a grid for choices people compare, such as grind. */
  appearance?: "list" | "tiles";
  required?: boolean;
  className?: string;
};

/** One choice from a set. Selected state is CSS only, so this stays a Server Component. */
export function ChoiceGroup({
  legend,
  name,
  options,
  defaultValue,
  appearance = "list",
  required,
  className,
}: ChoiceGroupProps) {
  const tiles = appearance === "tiles";
  return (
    <fieldset className={className}>
      <legend className="mb-2 type-label">{legend}</legend>
      <div
        className={cn(
          "grid",
          tiles ? "grid-cols-2 gap-2 md:grid-cols-4" : "gap-0",
        )}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-50",
              tiles
                ? "relative flex-col rounded-control border border-control p-3 transition-colors duration-(--duration-quick) hover:border-ink has-checked:border-2 has-checked:border-ink has-checked:bg-raised has-checked:p-[11px] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus"
                : "min-h-11 items-center",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={option.value === defaultValue}
              disabled={option.disabled}
              required={required}
              className={tiles ? "peer sr-only" : mark}
            />
            <span className="flex flex-col">
              <span className="type-small">{option.label}</span>
              {option.detail && (
                <span className="type-caption text-ink-muted">
                  {option.detail}
                </span>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
