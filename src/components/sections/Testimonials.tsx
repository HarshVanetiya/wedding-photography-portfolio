import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="bg-ivory py-28 md:py-40">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="eyebrow text-ink-muted">Kind Words</p>
          <h2 id="testimonials-heading" className="heading-section mt-6">
            From our <em className="text-maroon">couples</em>
          </h2>
        </Reveal>

        <ul className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3">
          {site.testimonials.map((testimonial, i) => (
            <li key={i}>
              <Reveal delay={i * 0.12} className="h-full">
                <figure className="flex h-full flex-col border border-line bg-paper p-8 md:p-7 lg:p-10">
                  <span aria-hidden="true" className="font-serif text-6xl leading-none text-sand">
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 flex-1 font-serif text-2xl leading-snug font-light text-ink/80 italic md:text-xl lg:text-2xl">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-10 border-t border-line pt-6">
                    <p className="eyebrow">{testimonial.name}</p>
                    <p className="mt-2 text-sm text-ink-muted">{testimonial.detail}</p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
