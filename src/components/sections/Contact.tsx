import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

/** Placeholder values like "[Phone]" render as plain text until real details are added. */
function ContactValue({ value, href }: { value: string; href: string }) {
  if (value.startsWith("[")) return <span>{value}</span>;
  return (
    <a href={href} className="transition-colors duration-200 hover:text-maroon">
      {value}
    </a>
  );
}

export function Contact() {
  const { contact, instagram } = site;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-line bg-ivory py-28 md:py-40">
      <div className="container-page grid gap-16 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-ink-muted">Contact</p>
          <h2 id="contact-heading" className="heading-section mt-6">
            Let&apos;s tell <em className="text-maroon">your</em> story
          </h2>
          <p className="body-copy mt-6 max-w-md">
            Share a few details about your celebration and we&apos;ll be in touch to talk dates, ideas and how we can help.
          </p>

          <dl className="mt-12 grid gap-6 border-t border-line pt-10">
            <div>
              <dt className="eyebrow text-ink-muted">Phone</dt>
              <dd className="mt-2 text-lg">
                <ContactValue value={contact.phone} href={`tel:${contact.phone.replace(/\s/g, "")}`} />
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-ink-muted">Email</dt>
              <dd className="mt-2 text-lg">
                <ContactValue value={contact.email} href={`mailto:${contact.email}`} />
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-ink-muted">Studio</dt>
              <dd className="mt-2 text-lg">{contact.address}</dd>
            </div>
            <div>
              <dt className="eyebrow text-ink-muted">Instagram</dt>
              <dd className="mt-2 text-lg">
                <a
                  href={instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-maroon"
                >
                  {instagram.handle}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
