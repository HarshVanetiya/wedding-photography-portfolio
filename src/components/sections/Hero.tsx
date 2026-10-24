"use client";

import { useEffect, useRef, useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { photoUrl } from "@/lib/photos";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const SLIDE_MS = 6500;

export function Hero() {
  const { hero, heroVideoSrc } = site;
  const [paused, setPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const showSlideshow = !heroVideoSrc && !reduceMotion;

  return (
    <section aria-label="Introduction" className="on-photo relative h-[92svh] min-h-[34rem] overflow-hidden bg-maroon-deep text-ivory md:h-svh">
      {heroVideoSrc ? (
        <HeroVideo src={heroVideoSrc} paused={paused || reduceMotion} />
      ) : (
        <HeroSlideshow paused={paused || reduceMotion} />
      )}

      {/* Keeps the navbar and title legible over any photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-black/40 via-black/0 via-40% to-black/70"
      />

      {/* Text sits in a low band so faces in the upper half of each photo stay clear. */}
      <div className="container-page relative flex h-full flex-col justify-end pb-24 md:pb-28 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div>
          <p className="eyebrow animate-[fade-up_1s_var(--ease-out-quint)_0.2s_both]">{hero.eyebrow}</p>
          <h1 className="mt-4 flex flex-wrap gap-x-[0.25em] font-serif text-[clamp(3.5rem,9vw,8rem)] leading-[0.95] font-light tracking-[0.04em] uppercase">
            {hero.title.split(" ").map((word, i) => (
              <span key={word} className="block overflow-hidden pb-[0.04em]">
                <span
                  className="block animate-[rise_1.3s_var(--ease-out-quint)_both]"
                  style={{ animationDelay: `${0.35 + i * 0.12}s` }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>
        </div>
        <div className="max-w-md lg:max-w-sm lg:pb-3">
          <p className="mt-5 text-lg/relaxed text-ivory/90 animate-[fade-up_1s_var(--ease-out-quint)_0.8s_both] lg:mt-0">
            {hero.tagline}
          </p>
          <div className="mt-8 animate-[fade-up_1s_var(--ease-out-quint)_1s_both]">
            <a href={hero.cta.href} className={buttonStyles("light")}>
              {hero.cta.label}
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/80 md:flex"
      >
        <span className="eyebrow text-[0.625rem]">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-ivory/25">
          <span className="absolute inset-x-0 top-0 h-1/3 bg-ivory animate-[scroll-cue_2.2s_var(--ease-in-out-quint)_infinite]" />
        </span>
      </a>

      {(showSlideshow || (heroVideoSrc && !reduceMotion)) && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="eyebrow absolute right-5 bottom-6 flex items-center gap-2 text-[0.625rem] text-ivory/80 hover:text-ivory md:right-10"
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
          {paused ? "Play" : "Pause"}
        </button>
      )}
    </section>
  );
}

/** Full-screen crossfading slideshow with a slow Ken Burns zoom. */
function HeroSlideshow({ paused }: { paused: boolean }) {
  const slides = site.hero.slides;
  // `mounted` stays one slide ahead of `active`, so only the first photo competes with page load.
  const [{ active, previous, mounted }, setState] = useState({ active: 0, previous: -1, mounted: 1 });

  useEffect(() => {
    if (paused) return;
    const preload = window.setTimeout(() => setState((s) => ({ ...s, mounted: Math.max(s.mounted, 2) })), 1500);
    const timer = window.setInterval(() => {
      setState((s) => {
        const next = (s.active + 1) % slides.length;
        return { active: next, previous: s.active, mounted: Math.min(slides.length, Math.max(s.mounted, next + 2)) };
      });
    }, SLIDE_MS);
    return () => {
      window.clearTimeout(preload);
      window.clearInterval(timer);
    };
  }, [paused, slides.length]);

  return (
    <div aria-hidden="true" className="absolute inset-0 isolate">
      {slides.slice(0, mounted).map((slide, i) => {
        const isActive = i === active;
        const isLeaving = i === previous;
        return (
          <div
            key={slide.slug}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1600ms] ease-in-out",
              isActive ? "z-20 opacity-100" : isLeaving ? "z-10 opacity-100" : "z-0 opacity-0",
            )}
          >
            <div
              className={cn(
                "absolute inset-0",
                (isActive || isLeaving) && "animate-[kenburns_8s_linear_both]",
                paused && "[animation-play-state:paused]",
              )}
            >
              <Photo
                slug={slide.slug}
                alt=""
                fill
                sizes="100vw"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                className="object-cover object-(--pos-mobile) md:object-(--pos-desktop)"
                style={{ "--pos-mobile": slide.position.mobile, "--pos-desktop": slide.position.desktop } as React.CSSProperties}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Background video; the poster shows until it plays (and stays when motion is reduced or paused). */
function HeroVideo({ src, paused }: { src: string; paused: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (paused) video.pause();
    else video.play().catch(() => {
      // Autoplay can be blocked (e.g. low-power mode); the poster stays visible.
    });
  }, [paused]);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 size-full object-cover"
      src={src}
      poster={photoUrl(site.heroVideoPoster, 1920)}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className="size-2.5" fill="currentColor">
      <rect x="2" y="1" width="2.5" height="10" />
      <rect x="7.5" y="1" width="2.5" height="10" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className="size-2.5" fill="currentColor">
      <path d="M2.5 1l8 5-8 5z" />
    </svg>
  );
}
