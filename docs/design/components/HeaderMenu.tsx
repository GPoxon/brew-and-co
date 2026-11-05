"use client";

import type { ComponentProps, MouseEvent } from "react";

/**
 * The header's small-screen <details>. The header stays mounted across client
 * navigation, so this closes the panel when a link inside it is followed. That
 * includes links to the current page, such as /#events from the home page.
 */
export function HeaderMenu(props: ComponentProps<"details">) {
  function closeOnLink(event: MouseEvent<HTMLDetailsElement>) {
    if ((event.target as Element).closest("a")) {
      event.currentTarget.removeAttribute("open");
    }
  }

  return <details onClick={closeOnLink} {...props} />;
}
