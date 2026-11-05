"use client";

import { useState } from "react";
import { cn } from "./cn";
import { Icon } from "./Icon";

type QuantityStepperProps = {
  /** Field name submitted with the surrounding form. */
  name?: string;
  /** What is being counted, used in the accessible labels: "bags of Daybreak". */
  itemLabel: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
};

const stepButton =
  "grid size-11 place-items-center transition-colors duration-(--duration-quick) hover:bg-raised disabled:cursor-not-allowed disabled:opacity-40";

export function QuantityStepper({
  name = "quantity",
  itemLabel,
  defaultValue = 1,
  min = 1,
  max = 24,
  onChange,
  className,
}: QuantityStepperProps) {
  const [value, setValue] = useState(defaultValue);

  function update(next: number) {
    setValue(next);
    onChange?.(next);
  }

  return (
    <div
      role="group"
      aria-label={`Quantity of ${itemLabel}`}
      className={cn(
        "inline-flex items-center rounded-control border border-control",
        className,
      )}
    >
      <button
        type="button"
        className={stepButton}
        disabled={value <= min}
        aria-label={`Remove one of ${itemLabel}`}
        onClick={() => update(value - 1)}
      >
        <Icon name="minus" size={18} />
      </button>
      <output
        aria-live="polite"
        className="w-8 text-center type-label tabular-nums"
      >
        {value}
      </output>
      <button
        type="button"
        className={stepButton}
        disabled={value >= max}
        aria-label={`Add one of ${itemLabel}`}
        onClick={() => update(value + 1)}
      >
        <Icon name="plus" size={18} />
      </button>
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
