"use client";

import { m, type Variants } from "motion/react";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/config/site";
import { easeInOutQuint, easeOutQuint } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { whatsappUrl } from "@/lib/whatsapp";

const panel: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.7, ease: easeInOutQuint, delay: 0.15 } },
  shown: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.8, ease: easeInOutQuint } },
};

const fadePanel: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.3 } },
  shown: { opacity: 1, transition: { duration: 0.3 } },
};

const item: Variants = {
  hidden: { y: "110%", transition: { duration: 0.4, ease: easeInOutQuint } },
  shown: (i: number) => ({ y: "0%", transition: { duration: 0.9, ease: easeOutQuint, delay: 0.35 + i * 0.08 } }),
};

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <Modal open={open} onRequestClose={onClose} label="Menu">
      <m.div
        key="menu"
        className="on-dark fixed inset-0 flex flex-col bg-maroon-deep text-ivory"
        variants={reduceMotion ? fadePanel : panel}
        initial="hidden"
        animate="shown"
        exit="hidden"
      >
        <div className="container-page flex h-18 shrink-0 items-center justify-between">
          <span className="font-serif text-xl tracking-[0.24em] uppercase">{site.name}</span>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Close menu"
            className="-mr-2 grid size-11 place-items-center"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="container-page flex flex-1 flex-col justify-center">
          <ul className="space-y-3">
            {site.nav.map((link, i) => (
              <li key={link.href} className="overflow-hidden">
                <m.span custom={i} variants={item} className="block">
                  <Link href={link.href} onClick={onClose} className="font-serif text-5xl font-light leading-tight">
                    {link.label}
                  </Link>
                </m.span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-page shrink-0 pb-8">
          <a
            href={whatsappUrl(site.contact.messages.enquiry)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className={buttonStyles("light", "w-full")}
          >
            <WhatsAppIcon />
            Enquire on WhatsApp
          </a>
        </div>

        <div className="container-page flex shrink-0 items-center justify-between pb-[max(2.5rem,env(safe-area-inset-bottom))] text-ivory/70">
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="eyebrow tap-target hover:text-ivory">
            Instagram
          </a>
          <span className="eyebrow">{site.location}</span>
        </div>
      </m.div>
    </Modal>
  );
}
