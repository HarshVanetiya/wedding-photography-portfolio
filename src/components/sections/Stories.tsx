import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { site, type Story } from "@/config/site";

export function Stories() {
  return (
    <section id="stories" aria-labelledby="stories-heading" className="bg-ivory py-20 md:py-40">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow text-ink-muted">Wedding Stories</p>
            <h2 id="stories-heading" className="heading-section mt-6">
              Love, <em className="text-maroon">in chapters</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm">
            <p className="body-copy">Every celebration is its own story. Step inside a few of our favourites.</p>
          </Reveal>
        </div>

        {/* Phones: a swipeable row with the next card peeking in. Larger screens: a staggered grid. */}
        <ul className="-mx-5 mt-12 scroll-px-5 gap-4 px-5 max-md:swipe-row md:mx-0 md:mt-20 md:grid md:grid-cols-3 md:gap-x-8 md:px-0">
          {site.stories.map((story, i) => (
            <li key={story.slug} className="w-[82%] shrink-0 snap-start md:w-auto md:even:mt-24">
              <Reveal delay={i * 0.12}>
                <StoryCard story={story} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
        <p aria-hidden="true" className="eyebrow mt-8 text-ink-muted md:hidden">
          Swipe for more <span>→</span>
        </p>
      </div>
    </section>
  );
}

function StoryCard({ story, index }: { story: Story; index: number }) {
  return (
    <Link href={`/stories/${story.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand-50">
        <Photo
          slug={story.cover}
          fill
          sizes="(min-width: 768px) 31vw, 82vw"
          className="object-cover transition-[scale,opacity] duration-[1200ms] ease-out-quint group-hover:scale-[1.04] group-active:opacity-85"
        />
      </div>
      <p className="eyebrow mt-6 text-ink-muted">
        {String(index + 1).padStart(2, "0")} · {story.type}
      </p>
      <h3 className="mt-3 font-serif text-3xl font-light md:text-[2rem]">{story.title}</h3>
      <p className="mt-2 text-ink-muted">
        {story.couple} · {story.venue}
      </p>
      <span className="eyebrow mt-6 inline-flex items-center gap-2 border-b border-ink/25 pb-1.5 transition-colors duration-300 group-hover:border-maroon group-hover:text-maroon">
        View story <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
