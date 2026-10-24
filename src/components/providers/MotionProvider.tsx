"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";

/**
 * Loads only the animation features the site uses (smaller bundle) and
 * honours the visitor's reduced-motion setting for every animation.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
