"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

type DialogPanelProps = {
  title: string;
  titleId?: string;
  onClose?: () => void;
  children: ReactNode;
};

/** The dialog's contents without the modal behaviour. Used alone only in the style guide. */
export function DialogPanel({ title, titleId, onClose, children }: DialogPanelProps) {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <h2 id={titleId} className="type-h3">
          {title}
        </h2>
        <Button
          variant="secondary"
          size="icon"
          aria-label="Close"
          onClick={onClose}
          className="shrink-0"
        >
          <Icon name="close" />
        </Button>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}

type DialogProps = {
  open: boolean;
  /** Called for Esc and the close button. Set open to false in response. */
  onClose: () => void;
  title: string;
  children: ReactNode;
};

/**
 * A modal built on the native <dialog>, so the browser handles focus trapping,
 * Esc, the inert page behind it and returning focus. On opening, focus goes to
 * the element marked data-autofocus, or else the close button.
 */
export function Dialog({ open, onClose, title, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      data-surface="stone"
      aria-labelledby={titleId}
      onClose={onClose}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto shadow-overlay"
    >
      <DialogPanel title={title} titleId={titleId} onClose={onClose}>
        {children}
      </DialogPanel>
    </dialog>
  );
}
