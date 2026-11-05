import type { ReactNode } from "react";
import { cn } from "./cn";
import { Icon, type IconName } from "./Icon";

const tones: Record<string, { icon: IconName; style: string }> = {
  info: { icon: "info", style: "border-control text-ink" },
  success: { icon: "check", style: "border-success text-success" },
  danger: { icon: "alert", style: "border-danger text-danger" },
};

type AlertProps = {
  tone?: "info" | "success" | "danger";
  title: string;
  children?: ReactNode;
  /** Set when the alert appears after the page loads, so screen readers announce it. */
  live?: boolean;
  className?: string;
};

export function Alert({
  tone = "info",
  title,
  children,
  live = false,
  className,
}: AlertProps) {
  const { icon, style } = tones[tone];
  const role = !live ? undefined : tone === "danger" ? "alert" : "status";
  return (
    <div
      role={role}
      className={cn(
        "flex gap-3 rounded-control border bg-raised p-4",
        style,
        className,
      )}
    >
      <Icon name={icon} className="shrink-0" />
      <div>
        <p className="type-label">{title}</p>
        {children && <div className="mt-1 type-small text-ink">{children}</div>}
      </div>
    </div>
  );
}
