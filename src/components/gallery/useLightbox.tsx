"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/photos";

const loadLightbox = () => import("@/components/gallery/Lightbox").then((mod) => mod.Lightbox);

// Kept out of the initial bundle; fetched while the browser is idle so the first click is instant.
const Lightbox = dynamic(loadLightbox, { ssr: false });

/**
 * Lightbox state for a gallery. Spread `listRef` onto the element that holds
 * the tiles, call `open(index, tile)` from a tile, and render `lightbox`.
 */
export function useLightbox<T extends HTMLElement>(photos: Photo[], thumbSizes: (photo: Photo) => string) {
  const listRef = useRef<T>(null);
  const [state, setState] = useState<{ index: number; origin: DOMRect } | null>(null);

  useEffect(() => {
    const prefetch = () => void loadLightbox();
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(prefetch, 2000);
    return () => clearTimeout(id);
  }, []);

  const open = useCallback((index: number, tile: HTMLElement) => {
    setState({ index, origin: tile.getBoundingClientRect() });
  }, []);

  const getTileRect = useCallback(
    (index: number) =>
      listRef.current
        ?.querySelector(`[data-gallery-tile="${photos[index].slug}"]`)
        ?.getBoundingClientRect() ?? null,
    [photos],
  );

  const lightbox = state && (
    <Lightbox
      photos={photos}
      startIndex={state.index}
      origin={state.origin}
      getTileRect={getTileRect}
      thumbSizes={thumbSizes}
      onClose={() => setState(null)}
    />
  );

  return { listRef, open, lightbox };
}
