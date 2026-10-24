import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-5 pt-18 text-center">
      <p className="eyebrow text-ink-muted">Page not found</p>
      <h1 className="heading-section mt-6">
        This page has <em className="text-maroon">wandered off</em>
      </h1>
      <p className="body-copy mt-6 max-w-md">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className={buttonStyles("dark", "mt-10")}>
        Back to home
      </Link>
    </section>
  );
}
