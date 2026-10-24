import { site } from "@/config/site";

/** Slow keyword marquee between the hero and the intro. */
export function Ticker() {
  // Each copy repeats the list twice so it always spans wide screens.
  const words = [...site.ticker, ...site.ticker];

  return (
    <div className="overflow-hidden border-b border-line bg-ivory py-6 md:py-7">
      <div className="flex w-max animate-[marquee_60s_linear_infinite] hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {words.map((word, i) => (
              <li key={i} className="flex items-center font-serif text-2xl text-ink/80 italic md:text-3xl">
                <span className="px-8 md:px-12">{word}</span>
                <span aria-hidden="true" className="text-sm text-sand not-italic">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
