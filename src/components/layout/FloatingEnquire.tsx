"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Phones only: a WhatsApp button within thumb reach. It steps aside while any
 * element marked `data-hide-enquire` (hero, contact form, footer) is on screen.
 */
export function FloatingEnquire() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });
    document.querySelectorAll("[data-hide-enquire]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <a
      href={whatsappUrl(site.contact.messages.enquiry)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
      className={cn(
        "fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex items-center gap-2.5 rounded-full bg-ink py-3.5 pr-5 pl-4 text-ivory shadow-[0_10px_30px_-6px_rgba(37,11,11,0.45)] transition-[translate,opacity,scale] duration-500 ease-out-quint active:scale-95 md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <WhatsAppIcon className="size-5" />
      <span className="eyebrow">Enquire</span>
    </a>
  );
}
