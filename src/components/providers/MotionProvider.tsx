"use client";

import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * Loads only the animation features the site uses, after first paint (smaller
 * initial bundle), and honours the visitor's reduced-motion setting everywhere.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
