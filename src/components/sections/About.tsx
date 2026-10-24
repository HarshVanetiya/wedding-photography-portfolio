import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealImage } from "@/components/ui/Reveal";
import { site } from "@/config/site";

export function About() {
  const { about } = site;

  return (
    <section id="about" aria-labelledby="about-heading" className="bg-ivory py-28 md:py-40">
      <div className="container-page grid items-center gap-14 md:grid-cols-12 md:gap-10">
        <RevealImage className="aspect-[4/5] md:col-span-5">
          <Photo slug={about.photo} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        </RevealImage>

        <div className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow text-ink-muted">{about.eyebrow}</p>
            <h2 id="about-heading" className="heading-section mt-6">
              {about.heading} <em className="text-maroon">{about.headingAccent}</em>
            </h2>
          </Reveal>
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <p className="body-copy mt-6">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <a
              href={about.cta.href}
              className="eyebrow mt-10 inline-flex items-center gap-3 border-b border-ink/30 pb-2 transition-colors duration-300 hover:border-maroon hover:text-maroon"
            >
              {about.cta.label} <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
