"use client";

import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { easeOutQuint } from "@/lib/motion";
import { whatsappUrl } from "@/lib/whatsapp";

type FieldName = "name" | "date" | "venue" | "message";
type Values = Record<FieldName, string>;

const EMPTY: Values = { name: "", date: "", venue: "", message: "" };

/** "2027-02-12" → "12 February 2027" (parsed as a local date, so it never shifts a day). */
function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

/** The WhatsApp message: greeting, then each detail the visitor filled in. */
function buildMessage(values: Values) {
  const details: [string, string][] = [
    ["Name", values.name],
    ["Wedding date", values.date && formatDate(values.date)],
    ["Venue", values.venue],
    ["Message", values.message],
  ];
  return [
    site.contact.messages.enquiry,
    "",
    ...details.filter(([, value]) => value).map(([label, value]) => `*${label}:* ${value}`),
  ].join("\n");
}

// The thank-you panel mounts after the form's exit animation, so focus it as it appears.
const focusOnMount = (element: HTMLElement | null) => element?.focus();

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutQuint } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [nameError, setNameError] = useState("");
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submitted = Object.fromEntries(
      (Object.keys(EMPTY) as FieldName[]).map((key) => [key, String(data.get(key) ?? "").trim()]),
    ) as Values;
    setValues(submitted);

    if (!submitted.name) {
      setNameError("Please tell us your name.");
      (event.currentTarget.elements.namedItem("name") as HTMLElement | null)?.focus();
      return;
    }
    setNameError("");

    const url = whatsappUrl(buildMessage(submitted));
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  }

  const firstName = values.name.split(/\s+/)[0];

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sentUrl ? (
        <m.div key="thanks" {...fade} className="flex min-h-[24rem] flex-col justify-center">
          <h3 ref={focusOnMount} tabIndex={-1} className="font-serif text-4xl font-light focus:outline-none md:text-5xl">
            Thank you{firstName ? `, ${firstName}` : ""}.
          </h3>
          <p className="body-copy mt-5 max-w-md">
            WhatsApp has opened with your details. Just press send and we&apos;ll reply to you there.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={sentUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles("dark")}>
              <WhatsAppIcon />
              Open WhatsApp again
            </a>
            <button type="button" onClick={() => setSentUrl(null)} className={buttonStyles("outline")}>
              Edit details
            </button>
          </div>
        </m.div>
      ) : (
        <m.form key="form" {...fade} noValidate onSubmit={onSubmit} className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
          <Field name="name" label="Your name" autoComplete="name" defaultValue={values.name} required error={nameError} />
          <Field name="date" label="Wedding date" type="date" defaultValue={values.date} optional />
          <Field name="venue" label="Venue" defaultValue={values.venue} optional className="sm:col-span-2" />
          <Field
            name="message"
            label="Tell us about your celebration"
            defaultValue={values.message}
            multiline
            optional
            className="sm:col-span-2"
          />
          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-muted">Your details open in WhatsApp, ready to send.</p>
            <button type="submit" className={buttonStyles("dark")}>
              <WhatsAppIcon />
              Send on WhatsApp
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
  defaultValue: string;
  required?: boolean;
  optional?: boolean;
  multiline?: boolean;
  error?: string;
  className?: string;
};

function Field({ name, label, type = "text", autoComplete, defaultValue, required, optional, multiline, error, className }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const inputClass =
    "mt-3 block w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink transition-[border-color,box-shadow] duration-300 focus:border-maroon focus:shadow-[0_1px_0_0_var(--color-maroon)] focus-visible:outline-none aria-invalid:border-maroon";
  const shared = {
    id,
    name,
    defaultValue,
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
