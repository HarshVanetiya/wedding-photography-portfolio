import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryGallery } from "@/components/gallery/StoryGallery";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { site, type Story } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return site.stories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = site.stories.find((s) => s.slug === slug);
  if (!story) return {};
  const path = `/stories/${story.slug}`;
  const description = `${story.excerpt} A ${story.type.toLowerCase()} story by ${site.name}, ${site.location}.`;
  return {
    title: story.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: "en_IN",
      url: path,
      title: `${story.title} · ${site.name}`,
      description,
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function StoryPage({ params }: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const index = site.stories.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const story = site.stories[index];
  const next = site.stories[(index + 1) % site.stories.length];

  return (
    <>
      <section className="relative h-[88svh] min-h-[32rem] overflow-hidden bg-maroon-deep text-ivory">
        <div className="absolute inset-0 animate-[kenburns_10s_var(--ease-out-quint)_both]">
          <Photo
            slug={story.cover}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-(--pos-mobile) md:object-(--pos-desktop)"
            style={
              {
                "--pos-mobile": story.coverPosition.mobile,
                "--pos-desktop": story.coverPosition.desktop,
              } as React.CSSProperties
            }
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-black/40 via-black/0 via-40% to-black/70" />
        <div className="container-page relative flex h-full flex-col justify-end pb-16 md:pb-20">
          <p className="eyebrow animate-[fade-up_1s_var(--ease-out-quint)_0.2s_both]">{story.type}</p>
          <h1 className="mt-4 overflow-hidden pb-[0.06em] font-serif text-[clamp(3rem,8vw,7rem)] leading-[1] font-light">
            <span className="block animate-[rise_1.3s_var(--ease-out-quint)_0.35s_both]">{story.title}</span>
          </h1>
          <p className="mt-5 text-lg text-ivory/90 animate-[fade-up_1s_var(--ease-out-quint)_0.7s_both]">
            {story.couple} · {story.venue}
          </p>
        </div>
      </section>

      <section aria-label="About this story" className="bg-ivory py-24 md:py-32">
        <Reveal className="container-page max-w-3xl text-center">
          <p className="eyebrow text-ink-muted">The Story</p>
          <p className="mt-8 font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-snug font-light">{story.intro}</p>
        </Reveal>
      </section>

      <section aria-label="Photographs" className="bg-ivory px-1 pb-28 md:px-10 md:pb-40">
        <StoryGallery slugs={story.photos} />
        <div className="mt-16 text-center md:mt-24">
          <Link
            href="/#stories"
            className="eyebrow inline-flex items-center gap-2 border-b border-ink/25 pb-1.5 transition-colors duration-300 hover:border-maroon hover:text-maroon"
          >
            <span aria-hidden="true">←</span> All stories
          </Link>
        </div>
      </section>

      <NextStory story={next} />
    </>
  );
}

function NextStory({ story }: { story: Story }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group relative flex h-[70svh] min-h-[26rem] items-center justify-center overflow-hidden bg-maroon-deep text-center text-ivory"
    >
      <Photo
        slug={story.cover}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-(--pos-mobile) transition-transform duration-[1600ms] ease-out-quint group-hover:scale-[1.04] md:object-(--pos-desktop)"
        style={
          {
            "--pos-mobile": story.coverPosition.mobile,
            "--pos-desktop": story.coverPosition.desktop,
          } as React.CSSProperties
        }
      />
      <span aria-hidden="true" className="absolute inset-0 bg-black/45 transition-colors duration-700 group-hover:bg-black/35" />
      <span className="relative px-5">
        <span className="eyebrow block">Next Story</span>
        <span className="mt-5 block font-serif text-[clamp(2.75rem,7vw,6rem)] leading-none font-light">{story.title}</span>
        <span className="eyebrow mt-8 inline-flex items-center gap-2 border-b border-ivory/50 pb-1.5">
          View story <span aria-hidden="true">→</span>
        </span>
      </span>
    </Link>
  );
}
