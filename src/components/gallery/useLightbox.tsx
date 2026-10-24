"use client";

import { useCallback, useRef, useState } from "react";
import { Lightbox } from "@/components/gallery/Lightbox";
import type { Photo } from "@/lib/photos";

/**
 * Lightbox state for a gallery. Spread `listRef` onto the element that holds
 * the tiles, call `open(index, tile)` from a tile, and render `lightbox`.
 */
export function useLightbox<T extends HTMLElement>(photos: Photo[], thumbSizes: (photo: Photo) => string) {
  const listRef = useRef<T>(null);
  const [state, setState] = useState<{ index: number; origin: DOMRect } | null>(null);

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
