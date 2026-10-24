import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-sand-50 py-28 md:py-40">
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-6">
            <p className="eyebrow text-ink-muted">Services</p>
            <h2 id="services-heading" className="heading-section mt-6">
              How we can tell <em className="text-maroon">your</em> story
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <p className="body-copy">
              Every celebration is different. Tell us about yours and we&apos;ll shape our coverage around it.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 grid border-t border-ink/15 md:mt-20 md:grid-cols-3">
          {site.services.map((service, i) => (
            <li
              key={service.title}
              className="border-b border-ink/15 py-10 md:border-b-0 md:border-l md:px-10 md:py-14 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <Reveal delay={i * 0.12}>
                <span aria-hidden="true" className="font-serif text-xl text-maroon italic">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-serif text-3xl font-light md:text-4xl">{service.title}</h3>
                <p className="body-copy mt-5">{service.description}</p>
                <a
                  href="#contact"
                  className="eyebrow mt-8 inline-flex items-center gap-2 border-b border-ink/25 pb-1.5 transition-colors duration-300 hover:border-maroon hover:text-maroon"
                >
                  Enquire <span className="sr-only">about {service.title}</span>
                  <span aria-hidden="true">→</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
