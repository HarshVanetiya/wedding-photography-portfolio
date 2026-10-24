"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { easeOutQuint } from "@/lib/motion";

type Status = "idle" | "sending" | "sent";
type FieldName = "name" | "phone" | "email" | "date" | "venue" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData): Errors {
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const errors: Errors = {};

  if (!name) errors.name = "Please tell us your name.";
  if (phone && phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number.";
  if (email && !EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (!phone && !email) errors.email = "Please add an email or phone number so we can reply.";
  return errors;
}

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutQuint } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [firstName, setFirstName] = useState("");
  const thanksRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "sent") thanksRef.current?.focus();
  }, [status]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    setFirstName(String(data.get("name")).trim().split(/\s+/)[0]);
    // Demo only: nothing is sent. Connect a form service (e.g. Formspree, Web3Forms) here before launch.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("sent");
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <m.div key="thanks" {...fade} className="flex min-h-[28rem] flex-col justify-center">
          <h3 ref={thanksRef} tabIndex={-1} className="font-serif text-4xl font-light focus:outline-none md:text-5xl">
            Thank you{firstName ? `, ${firstName}` : ""}.
          </h3>
          <p className="body-copy mt-5 max-w-md">
            Your enquiry has been received. We&apos;ll be in touch soon to talk about your celebration.
          </p>
          <p className="mt-3 text-sm text-ink-muted">This is a demo, so no message was actually sent.</p>
          <div className="mt-10">
            <button type="button" onClick={() => setStatus("idle")} className={buttonStyles("outline")}>
              Send another enquiry
            </button>
          </div>
        </m.div>
      ) : (
        <m.form key="form" {...fade} noValidate onSubmit={onSubmit} className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
          <Field name="name" label="Your name" autoComplete="name" required error={errors.name} />
          <Field name="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} />
          <Field name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
          <Field name="date" label="Wedding date" type="date" optional />
          <Field name="venue" label="Venue" optional className="sm:col-span-2" />
          <Field name="message" label="Tell us about your celebration" multiline optional className="sm:col-span-2" />
          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-muted">Share a phone number or email, whichever you prefer.</p>
            <button type="submit" disabled={status === "sending"} className={buttonStyles("dark", "disabled:opacity-60")}>
              {status === "sending" ? "Sending…" : "Send enquiry"}
            </button>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
}

type FieldProps = {
  name: FieldName;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  optional?: boolean;
  multiline?: boolean;
  error?: string;
  className?: string;
};

function Field({ name, label, type = "text", autoComplete, required, optional, multiline, error, className }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const inputClass =
    "mt-3 block w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink transition-[border-color,box-shadow] duration-300 focus:border-maroon focus:shadow-[0_1px_0_0_var(--color-maroon)] focus-visible:outline-none aria-invalid:border-maroon";
  const shared = {
    id,
    name,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow text-ink-muted">
        {label}
        {optional && <span className="tracking-normal normal-case"> (optional)</span>}
      </label>
      {multiline ? (
        <textarea {...shared} rows={4} className={cn(inputClass, "resize-y")} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} className={inputClass} />
      )}
      {error && (
        <p id={errorId} className="mt-2 text-sm text-maroon">
          {error}
        </p>
      )}
    </div>
  );
}
