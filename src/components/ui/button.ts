import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-xs font-medium uppercase tracking-[var(--tracking-button)] transition-colors duration-300 ease-out-quint";

const variants = {
  /** Dark pill on light backgrounds (primary action). */
  dark: "bg-ink text-ivory hover:bg-maroon",
  /** Outline on light backgrounds. */
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-ivory",
  /** Outline on photos and dark backgrounds. */
  light: "border border-ivory/70 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink",
};

export function buttonStyles(variant: keyof typeof variants, className?: string) {
  return cn(base, variants[variant], className);
}
