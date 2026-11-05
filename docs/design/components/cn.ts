/**
 * Joins class names and skips falsy values. It does not resolve conflicts, so
 * use className for layout (margins, width), not to restyle a component.
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
