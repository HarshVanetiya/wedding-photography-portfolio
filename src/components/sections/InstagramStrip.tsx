import { buttonStyles } from "@/components/ui/button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

export function InstagramStrip() {
  const { instagram, instagramStrip } = site;

  return (
    <section aria-labelledby="instagram-heading" className="bg-paper py-20 md:py-36">
      <div className="container-page flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <p className="eyebrow text-ink-muted">Instagram</p>
          <h2 id="instagram-heading" className="heading-section mt-6">
            Follow our <em className="text-maroon">journey</em>
          </h2>
          <p className="body-copy mt-4">{instagram.handle}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <a href={instagram.url} target="_blank" rel="noopener noreferrer" className={buttonStyles("dark")}>
            <InstagramIcon />
            Follow us on Instagram
          </a>
        </Reveal>
      </div>

      {/* One link for the whole strip keeps keyboard and screen reader users to a single stop. */}
      <a
        href={instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`See more of our work on Instagram, ${instagram.handle}`}
        className="mt-10 grid grid-cols-3 gap-1 px-1 focus-visible:outline-offset-[-2px] md:mt-16 md:grid-cols-6"
      >
        {instagramStrip.map((slug) => (
          <span key={slug} className="group relative block aspect-square overflow-hidden bg-sand-50 transition-opacity active:opacity-80">
            <Photo
              slug={slug}
              alt=""
              fill
              sizes="(min-width: 768px) 17vw, 33vw"
              className="object-cover transition-transform duration-[900ms] ease-out-quint group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 grid place-items-center bg-ink/0 text-ivory opacity-0 transition duration-500 group-hover:bg-ink/25 group-hover:opacity-100">
              <InstagramIcon className="size-6" />
            </span>
          </span>
        ))}
      </a>
    </section>
  );
}

function InstagramIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}
