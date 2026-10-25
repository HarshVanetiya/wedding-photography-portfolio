import { JustifiedGallery } from "@/components/gallery/JustifiedGallery";
import { SplitHeading } from "@/components/sections/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

export function FeaturedWork() {
  const { work } = site;

  return (
    <section id="work" aria-labelledby="work-heading" className="overflow-hidden bg-paper py-20 md:py-40">
      <div className="container-page">
        <p className="eyebrow text-ink-muted">{work.eyebrow}</p>
        <div className="mt-8">
          <SplitHeading id="work-heading" start={work.headingStart} end={work.headingEnd} />
        </div>
        <Reveal className="mt-10 max-w-md md:mt-14">
          <p className="body-copy">{work.intro}</p>
          <p className="eyebrow mt-5 hidden text-ink-muted pointer-coarse:block">Tap any photo to see it full screen</p>
        </Reveal>
      </div>

      <div className="mx-auto mt-10 max-w-[1600px] px-1 md:mt-20 md:px-10">
        <JustifiedGallery
          slugs={work.photos}
          label="Featured photographs"
          footer={
            <a
              href="#stories"
              className="group flex w-full flex-col items-center justify-center gap-4 bg-sand-50 p-8 text-center transition-colors duration-500 hover:bg-sand/40"
            >
              <span className="font-serif text-3xl font-light md:text-4xl">
                Every story, <em className="text-maroon">in full</em>
              </span>
              <span className="eyebrow inline-flex items-center gap-2 text-ink-muted transition-colors group-hover:text-ink">
                View wedding stories <span aria-hidden="true">→</span>
              </span>
            </a>
          }
        />
      </div>
    </section>
  );
}
