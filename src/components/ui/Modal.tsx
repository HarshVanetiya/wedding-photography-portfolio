"use client";

import { AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onRequestClose: () => void;
  label: string;
  /** Must be a single keyed motion element with `exit` defined. */
  children: React.ReactNode;
};

/**
 * Full-screen native <dialog>: the browser handles focus trapping, inert
 * background and focus restore. Closing waits for the exit animation.
 */
export function Modal({ open, onRequestClose, label, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (open && dialog && !dialog.open) dialog.showModal();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className="m-0 size-full overflow-hidden bg-transparent p-0"
      onCancel={(event) => {
        // Esc: animate out first, then close.
        event.preventDefault();
        onRequestClose();
      }}
      onClose={() => {
        // Closed by the browser directly (e.g. repeated Esc): keep state in sync.
        if (open) onRequestClose();
      }}
    >
      <AnimatePresence onExitComplete={() => ref.current?.close()}>{open && children}</AnimatePresence>
    </dialog>
  );
}
