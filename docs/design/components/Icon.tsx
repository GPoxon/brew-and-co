import type { ReactNode, SVGProps } from "react";

const paths = {
  bean: (
    <>
      <ellipse cx="12" cy="12" rx="7" ry="9.5" transform="rotate(30 12 12)" />
      <path d="M16.75 3.77C11 8 16 15 7.25 20.23" />
    </>
  ),
  flame: (
    <path d="M12 3c.6 3.4 5.5 5.6 5.5 11a5.5 5.5 0 0 1-11 0c0-2.3 1.2-3.8 2.5-5 .2 1.5.9 2.4 1.7 2.8C10.4 8.7 10.6 5.4 12 3Z" />
  ),
  leaf: <path d="M5 19C4 10 10 4 20 4c0 10-6 16-15 15Zm0 0 9-9" />,
  truck: (
    <>
      <path d="M3 7h11v10H9.5M14 10h4l3 3.5V17h-1.5M14.5 17H14" />
      <path d="M5.5 17H3v-4" />
      <circle cx="7.5" cy="17.5" r="2" />
      <circle cx="17" cy="17.5" r="2" />
    </>
  ),
  cup: (
    <path d="M5 9h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V9Zm12 1h1.5a2.5 2.5 0 0 1 0 5H17M9 3v3M13 3v3" />
  ),
  bag: <path d="M6 8h12l1 12H5L6 8Zm3 0V7a3 3 0 0 1 6 0v1" />,
  pastry: (
    <path d="M3 15c0-6 4-10 9-10s9 4 9 10c0 1.5-1.8 2-2.7.8-1.5-2.2-3.7-3.3-6.3-3.3s-4.8 1.1-6.3 3.3C4.8 17 3 16.5 3 15ZM9 5.6l1.2 7.1M15 5.6l-1.2 7.1" />
  ),
  lunch: (
    <path d="M4 10c0-3.5 3.500-6 8-6s8 2.500 8 6H4ZM4 13.500h16M4 17h16v.5a2.500 2.500 0 0 1-2.500 2.500h-11A2.500 2.500 0 0 1 4 17.500V17Z" />
  ),
  music: (
    <>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.500" cy="18" r="2.500" />
      <circle cx="16.500" cy="16" r="2.500" />
    </>
  ),
  calendar: <path d="M4 6h16v14H4V6Zm0 5h16M8 3v5M16 3v5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.5v.5" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
      <path d="M12 10v4.5M12 17v.5" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  /** Rendered width and height in pixels. */
  size?: number;
  /** Accessible name. Leave out when the icon sits next to a text label. */
  label?: string;
};

export function Icon({ name, size = 24, label, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
