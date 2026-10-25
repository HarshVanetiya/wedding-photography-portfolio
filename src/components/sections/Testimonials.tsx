import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="bg-ivory py-20 md:py-40">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="eyebrow text-ink-muted">Kind Words</p>
          <h2 id="testimonials-heading" className="heading-section mt-6">
            From our <em className="text-maroon">couples</em>
          </h2>
        </Reveal>

        {/* Phones: swipe between quotes. Larger screens: three columns. */}
        <Reveal className="mt-12 md:mt-20">
          <ul className="-mx-5 scroll-px-5 gap-4 px-5 max-md:swipe-row md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:px-0">
            {site.testimonials.map((testimonial, i) => (
              <li key={i} className="w-[85%] shrink-0 snap-start md:w-auto">
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
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
