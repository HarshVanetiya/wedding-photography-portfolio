"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  // Pages that open with a full-bleed photo get a transparent navbar until scrolled.
  const hasHero = pathname === "/" || pathname.startsWith("/stories/");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !hasHero;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,color,border-color] duration-500 ease-out-quint",
          solid ? "border-line bg-ivory/90 text-ink backdrop-blur-md" : "on-photo border-transparent bg-transparent text-ivory",
        )}
      >
        <nav aria-label="Main" className="container-page flex h-18 items-center justify-between">
          <Link href="/" className="font-serif text-xl tracking-[0.24em] uppercase">
            {site.name}
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {site.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="eyebrow relative py-2 after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-out-quint hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="-mr-2 grid size-11 place-items-center md:hidden"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h18M3 16h18" />
            </svg>
          </button>
        </nav>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
