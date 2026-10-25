"use client";

import { m, type Variants } from "motion/react";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";
import { easeInOutQuint, easeOutQuint, revealViewport } from "@/lib/motion";
import type { Photo as PhotoData } from "@/lib/photos";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const mask: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  shown: { clipPath: "inset(0% 0% 0% 0%)" },
};

const settle: Variants = {
  hidden: { scale: 1.12 },
  shown: { scale: 1 },
};

type GalleryTileProps = {
  photo: PhotoData;
  sizes: string;
  /** Stagger offset for the reveal, in seconds. */
  delay?: number;
  onOpen: (tile: HTMLElement) => void;
  className?: string;
};

/** A photo that unveils on scroll and opens the lightbox when clicked. */
export function GalleryTile({ photo, sizes, delay = 0, onOpen, className }: GalleryTileProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <m.button
      type="button"
      data-gallery-tile={photo.slug}
      aria-haspopup="dialog"
      onClick={(event) => onOpen(event.currentTarget)}
      className={cn(
        "group relative block w-full cursor-zoom-in overflow-hidden bg-sand-50 focus-visible:outline-ivory focus-visible:-outline-offset-8",
        className,
      )}
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      variants={mask}
      initial="hidden"
      whileInView="shown"
      viewport={revealViewport}
      transition={{ duration: reduceMotion ? 0 : 1.2, ease: easeInOutQuint, delay }}
    >
      <m.span className="absolute inset-0" variants={settle} transition={{ duration: 1.6, ease: easeOutQuint, delay }}>
        <Photo
          slug={photo.slug}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[900ms] ease-out-quint group-hover:scale-[1.04]"
        />
      </m.span>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15 group-focus-visible:bg-ink/25 group-active:bg-ink/25"
      />
      <span
        aria-hidden="true"
        className="absolute right-3 bottom-3 grid size-9 translate-y-1 place-items-center rounded-full bg-ivory/90 text-ink opacity-0 transition duration-500 ease-out-quint group-hover:translate-y-0 group-hover:opacity-100"
      >
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.25">
          <path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9" />
        </svg>
      </span>
    </m.button>
  );
}
