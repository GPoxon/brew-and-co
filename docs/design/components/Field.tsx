import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "./cn";
import { Icon } from "./Icon";

type FieldText = {
  label: string;
  /** Help shown under the label, before the person types. */
  hint?: string;
  /** What went wrong and how to fix it. Replaces nothing, adds to the hint. */
  error?: string;
};

const control =
  "w-full rounded-control border border-control bg-raised px-3 text-ink placeholder:text-ink-muted transition-colors duration-(--duration-quick) hover:border-ink disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger aria-invalid:border-2";

function describedBy(id: string, { hint, error }: FieldText) {
  return (
    cn(hint && `${id}-hint`, error && `${id}-error`) || undefined
  );
}

function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  children,
}: FieldText & { id: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="type-label">
        {label}
        {!required && (
          <span className="ml-2 font-normal text-ink-muted">Optional</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="type-caption text-ink-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="flex items-start gap-1.5 type-caption text-danger"
        >
          <Icon name="alert" size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  label,
  hint,
  error,
  className,
  ...props
}: FieldText & ComponentProps<"input">) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={props.required}
    >
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { label, hint, error })}
        className={cn(control, "h-12", className)}
        {...props}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  hint,
  error,
  className,
  rows = 4,
  ...props
}: FieldText & ComponentProps<"textarea">) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={props.required}
    >
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { label, hint, error })}
        className={cn(control, "py-2.5", className)}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  label,
  hint,
  error,
  className,
  children,
  ...props
}: FieldText & ComponentProps<"select">) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={props.required}
    >
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, { label, hint, error })}
          className={cn(control, "h-12 appearance-none pr-10", className)}
          {...props}
        >
          {children}
        </select>
        <Icon
          name="chevron"
          size={20}
          className="pointer-events-none absolute top-3.5 right-3"
        />
      </div>
    </FieldShell>
  );
}
