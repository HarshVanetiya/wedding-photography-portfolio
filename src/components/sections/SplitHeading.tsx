"use client";

import { m, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type SplitHeadingProps = { id: string; start: string; end: string };

/**
 * Two-word display heading whose halves drift apart as it scrolls past —
 * the scroll-linked split from the reference site, kept subtle.
 */
export function SplitHeading({ id, start, end }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Overdamped spring: smooth, weighted, never overshoots.
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.6 });
  const startX = useTransform(progress, [0, 1], ["6%", "-6%"]);
  const endX = useTransform(progress, [0, 1], ["-6%", "6%"]);

  return (
    <h2
      ref={ref}
      id={id}
      className="flex flex-col font-serif text-[clamp(4rem,14vw,13rem)] leading-[0.9] font-light tracking-[-0.02em] uppercase"
    >
      <m.span className="self-start" style={reduceMotion ? undefined : { x: startX }}>
        {start}
      </m.span>
      <m.span className="self-end text-maroon italic normal-case" style={reduceMotion ? undefined : { x: endX }}>
        {end}
      </m.span>
    </h2>
  );
}
