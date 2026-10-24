"use client";

import { animate, AnimatePresence, m, useMotionValue, type Variants } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { easeInOutQuint, easeOutQuint } from "@/lib/motion";
import type { Photo as PhotoData } from "@/lib/photos";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type LightboxProps = {
  photos: PhotoData[];
  startIndex: number;
  /** Screen position of the tile that was clicked; the photo grows out of it. */
  origin: DOMRect;
  /** Finds a tile's current position, so closing can shrink back into it. */
  getTileRect: (index: number) => DOMRect | null;
  /** The `sizes` the tile used, so its cached image shows instantly underneath. */
  thumbSizes: (photo: PhotoData) => string;
  onClose: () => void;
};

type Size = { width: number; height: number };

const slide: Variants = {
  enter: (direction: number) => ({ x: direction * 60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.7, ease: easeOutQuint } },
  exit: (direction: number) => ({ x: direction * -60, opacity: 0, transition: { duration: 0.45, ease: easeInOutQuint } }),
};

function viewportSize(): Size {
  return { width: document.documentElement.clientWidth, height: window.innerHeight };
}

/** Largest box with the photo's aspect ratio that fits the screen, leaving room for controls. */
function fitFrame(photo: PhotoData, viewport: Size): Size {
  const mobile = viewport.width < 768;
  const maxWidth = viewport.width * (mobile ? 1 : 0.84);
  const maxHeight = viewport.height * (mobile ? 0.74 : 0.84);
  const ratio = photo.width / photo.height;
  const width = Math.min(maxWidth, maxHeight * ratio);
  return { width, height: width / ratio };
}

/** Transform that places the centred frame exactly over a tile. */
function frameToTile(tile: DOMRect, frame: Size, viewport: Size) {
  return {
    x: tile.left + tile.width / 2 - viewport.width / 2,
    y: tile.top + tile.height / 2 - viewport.height / 2,
    scale: tile.width / frame.width,
  };
}

export function Lightbox({ photos, startIndex, origin, getTileRect, thumbSizes, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const closing = useRef(false);
  const dragX = useMotionValue(0);
  const reduceMotion = usePrefersReducedMotion();

  const [index, setIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const [viewport, setViewport] = useState(viewportSize);

  const photo = photos[index];
  const frame = fitFrame(photo, viewport);
  const count = photos.length;

  // Open: show the dialog, then grow the photo out of the clicked tile.
  useLayoutEffect(() => {
    dialogRef.current?.showModal();
    const stage = stageRef.current;
    if (!stage) return;
    const fade = { duration: 0.5, ease: easeOutQuint };
    animate(backdropRef.current!, { opacity: [0, 1] }, fade);
    animate(chromeRef.current!, { opacity: [0, 1] }, { ...fade, delay: reduceMotion ? 0 : 0.35 });
    if (reduceMotion) {
      animate(stage, { opacity: [0, 1] }, fade);
    } else {
      const from = frameToTile(origin, fitFrame(photos[startIndex], viewportSize()), viewportSize());
      animate(
        stage,
        { x: [from.x, 0], y: [from.y, 0], scale: [from.scale, 1] },
        { duration: 0.8, ease: easeInOutQuint },
      );
    }
    // Runs once on open; later changes are handled by navigation and close.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onResize = () => setViewport(viewportSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      setIndex((i) => (i + step + count) % count);
    },
    [count],
  );

  // Close: shrink back into the tile if it's on screen, otherwise fade out.
  const close = useCallback(async () => {
    if (closing.current) return;
    closing.current = true;
    const stage = stageRef.current!;
    const tile = getTileRect(index);
    const tileVisible = tile && tile.bottom > 0 && tile.top < viewport.height && tile.width > 0;
    const fade = { duration: 0.45, ease: easeInOutQuint };

    await Promise.all([
      animate(chromeRef.current!, { opacity: 0 }, { duration: 0.25 }),
      animate(backdropRef.current!, { opacity: 0 }, { ...fade, duration: 0.6 }),
      reduceMotion || !tileVisible
        ? animate(stage, { opacity: 0, scale: reduceMotion ? 1 : 0.96 }, fade)
        : animate(stage, frameToTile(tile, frame, viewport), { duration: 0.7, ease: easeInOutQuint }),
    ]);
    dialogRef.current?.close();
    onClose();
  }, [frame, getTileRect, index, onClose, reduceMotion, viewport]);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") go(1);
    else if (event.key === "ArrowLeft") go(-1);
  }

  // Touch swipe: the photo follows the finger a little, then pages on release.
  function onPointerDown(event: React.PointerEvent) {
    if (event.pointerType === "mouse") return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
  }

  function onPointerMove(event: React.PointerEvent) {
    if (swipeStart.current) dragX.set((event.clientX - swipeStart.current.x) * 0.5);
  }

  function onPointerEnd(event: React.PointerEvent) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    animate(dragX, 0, { duration: 0.4, ease: easeOutQuint });
  }

  const neighbours = count > 1 ? [photos[(index + 1) % count], photos[(index - 1 + count) % count]] : [];

  return (
    <dialog
      ref={dialogRef}
      aria-label="Photo viewer"
      className="on-dark m-0 size-full overflow-hidden bg-transparent p-0 text-ivory"
      onKeyDown={onKeyDown}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
    >
      <div ref={backdropRef} className="absolute inset-0 bg-[#140909]/[0.98] opacity-0" />

      <div
        ref={stageRef}
        className="absolute inset-0 touch-pan-y"
        onClick={(event) => event.target === event.currentTarget && close()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          <m.div
            key={photo.slug}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 m-auto"
            style={{ width: frame.width, height: frame.height }}
          >
            <m.div className="absolute inset-0" style={{ x: dragX }}>
              {/* The tile's image is already cached, so it shows at once while the large one loads. */}
              <Photo slug={photo.slug} alt="" fill sizes={thumbSizes(photo)} className="object-cover" />
              <Photo
                slug={photo.slug}
                fill
                sizes={`${Math.ceil(frame.width)}px`}
                placeholder="empty"
                loading="eager"
                className="object-cover"
              />
            </m.div>
          </m.div>
        </AnimatePresence>

        {/* Preload the neighbours so paging feels instant. */}
        <div aria-hidden="true" className="invisible absolute size-px overflow-hidden">
          {neighbours.map((p) => (
            <div key={p.slug} className="relative size-px">
              <Photo slug={p.slug} alt="" fill sizes={`${Math.ceil(fitFrame(p, viewport).width)}px`} loading="eager" placeholder="empty" />
            </div>
          ))}
        </div>
      </div>

      <div ref={chromeRef} className="pointer-events-none absolute inset-0 opacity-0">
        <div className="flex items-center justify-between px-5 pt-4 md:px-10 md:pt-6">
          <p className="eyebrow tabular-nums text-ivory/80" aria-hidden="true">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
          <button
            type="button"
            autoFocus
            onClick={close}
            aria-label="Close photo viewer"
            className="pointer-events-auto -mr-2 grid size-11 place-items-center rounded-full transition-colors hover:bg-ivory/10"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        {count > 1 && (
          <div className="absolute inset-x-0 bottom-6 flex justify-center gap-4 md:inset-y-0 md:items-center md:justify-between md:px-8">
            <NavButton label="Previous photo" onClick={() => go(-1)} flip />
            <NavButton label="Next photo" onClick={() => go(1)} />
          </div>
        )}
      </div>

      <p aria-live="polite" className="sr-only">
        Photo {index + 1} of {count}: {photo.alt}
      </p>
    </dialog>
  );
}

function NavButton({ label, onClick, flip }: { label: string; onClick: () => void; flip?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="pointer-events-auto grid size-12 place-items-center rounded-full border border-ivory/30 transition-colors duration-300 hover:border-ivory hover:bg-ivory/10"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={flip ? "size-5 rotate-180" : "size-5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <path d="M4 12h16M14 6l6 6-6 6" />
      </svg>
    </button>
  );
}
