import Link from "next/link";
import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer data-hide-enquire className="on-dark bg-maroon-deep text-ivory">
      <div className="container-page grid gap-12 py-20 md:grid-cols-[2fr_1fr_1fr] md:py-24">
        <div>
          <Link href="/" className="tap-target font-serif text-3xl tracking-[0.24em] uppercase">
            {site.name}
          </Link>
          <p className="mt-5 max-w-xs leading-relaxed text-ivory/70">
            Wedding photography in {site.location}.
          </p>
        </div>

        <div>
          <h2 className="eyebrow text-sand">Explore</h2>
          <ul className="mt-4 space-y-1">
            {site.nav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-block py-1.5 text-ivory/80 transition-colors duration-200 hover:text-ivory">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-sand">Connect</h2>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target mt-5 inline-block text-ivory/80 transition-colors duration-200 hover:text-ivory"
          >
            Instagram <span aria-hidden="true">↗</span>
          </a>
          <p className="mt-2 text-sm text-ivory/60">{site.instagram.handle}</p>
          <a
            href={whatsappUrl(site.contact.messages.enquiry)}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target mt-5 inline-block text-ivory/80 transition-colors duration-200 hover:text-ivory"
          >
            WhatsApp <span aria-hidden="true">↗</span>
          </a>
          <p className="mt-2 text-sm text-ivory/60">{site.contact.whatsappDisplay}</p>
        </div>
      </div>

      <div className="container-page flex flex-col gap-3 border-t border-ivory/15 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-sm text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <a href="#top" className="tap-target self-start transition-colors duration-200 hover:text-ivory">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
