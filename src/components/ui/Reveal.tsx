"use client";

import { m, type Variants } from "motion/react";
import { cn } from "@/lib/cn";
import { easeInOutQuint, easeOutQuint, revealViewport } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/** Fades content up into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 1.1, ease: easeOutQuint, delay }}
    >
      {children}
    </m.div>
  );
}

const imageMask: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  shown: { clipPath: "inset(0% 0% 0% 0%)" },
};

const imageSettle: Variants = {
  hidden: { scale: 1.12 },
  shown: { scale: 1 },
};

/** Unveils an image with an upward wipe while it settles from a slight zoom. */
export function RevealImage({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <m.div
      className={cn("relative overflow-hidden", className)}
      variants={imageMask}
      initial="hidden"
      whileInView="shown"
      viewport={revealViewport}
      transition={{ duration: reduceMotion ? 0 : 1.3, ease: easeInOutQuint, delay }}
    >
      <m.div
        className="absolute inset-0"
        variants={imageSettle}
        transition={{ duration: 1.8, ease: easeOutQuint, delay }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
