"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ContactInfo } from "@/lib/cms";
import { resolveContactCards } from "@/lib/contactFields";

const FORMS_ENDPOINT =
  (process.env.NEXT_PUBLIC_CMS_FORMS_ENDPOINT ??
    "https://cms-backend-roman.vercel.app/forms") +
  "/it-global-services/contact_form_email";

/* ---- Status overlay (sending → sent → fade out) ---- */
function StatusOverlay({
  phase,
  onDone,
}: {
  phase: "sending" | "sent";
  onDone: () => void;
}) {
  const t = useTranslations("form");
  useEffect(() => {
    if (phase === "sent") {
      const timer = setTimeout(onDone, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, onDone]);

  const isSending = phase === "sending";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <motion.div
        role="status"
        aria-live="polite"
        className="w-full max-w-md rounded-2xl bg-surface-card px-6 py-10 text-center shadow-2xl sm:px-10"
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {isSending ? (
            <motion.div
              key="sending"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center">
                <svg
                  className="h-10 w-10 animate-spin text-ink"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth={3}
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-ink sm:text-2xl">
                {t("sendingTitle")}
              </h3>
              <p className="text-sm leading-relaxed text-ink opacity-70 sm:text-base">
                {t("sendingBody")}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                <svg
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-ink sm:text-2xl">
                {t("sentTitle")}
              </h3>
              <p className="text-sm leading-relaxed text-ink opacity-70 sm:text-base">
                {t("sentBody")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

interface ContactFormProps {
  /** Optional heading override */
  heading?: string;
  /** Hide the side contact details column */
  hideDetails?: boolean;
  /** Contact info (from CMS) for the sidebar — required if hideDetails is false. */
  contact?: ContactInfo;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  company_fax: string; // anti-spam honeypot
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm({
  heading,
  hideDetails = false,
  contact = {},
}: ContactFormProps) {
  const t = useTranslations("form");
  const tCards = useTranslations("contactCards");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    company_fax: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  function validate(): boolean {
    const errs: Errors = {};
    if (!form.name.trim()) errs.name = t("nameRequired");
    if (!form.email.trim()) {
      errs.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = t("emailInvalid");
    }
    if (!form.message.trim()) errs.message = t("messageRequired");
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.company_fax) return;
    if (!validate()) return;

    setStatus("sending");

    try {
      const res = await fetch(FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });

      if (!res.ok) {
        throw new Error(`Form submit failed: ${res.status}`);
      }

      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "", company_fax: "" });
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof Errors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  }

  // Render every CMS entry as an aside row. Replaces the old
  // hardcoded phone/email/address/hours block — operator can now name
  // their fields anything (`program`, `whatsapp`, `mobil`, etc.) and
  // they all show up with appropriate icons via `resolveContactCards`.
  const asideCards = resolveContactCards(contact);

  return (
    <section className="pb-10">
      <div className="container-main">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 200px 0px" }}
          transition={{ duration: 0.5 }}
        >
          {heading ?? t("contactInfoHeading")}
        </motion.h2>

        <div
          className={`grid gap-10 ${hideDetails ? "" : "lg:grid-cols-[1fr_380px]"}`}
        >
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 200px 0px" }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
            noValidate
          >
            {/* Honeypot */}
            <input
              type="text"
              name="company_fax"
              value={form.company_fax}
              onChange={handleChange}
              className="absolute -left-[9999px] opacity-0"
              tabIndex={-1}
              autoComplete="new-password"
              aria-hidden="true"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="form-label">
                  {t("name")} *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`form-input ${errors.name ? "border-red-400" : ""}`}
                  placeholder={t("namePlaceholder")}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="form-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  {t("email")} *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`form-input ${errors.email ? "border-red-400" : ""}`}
                  placeholder={t("emailPlaceholder")}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="form-error">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="form-label">
                {t("phone")}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
                className="form-input"
                placeholder={t("phonePlaceholder")}
              />
            </div>

            <div>
              <label htmlFor="message" className="form-label">
                {t("message")} *
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`form-textarea ${errors.message ? "border-red-400" : ""}`}
                placeholder={t("messagePlaceholder")}
              />
              {errors.message && (
                <p id="message-error" role="alert" className="form-error">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? t("sending") : t("send")}
            </button>

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700 dark:bg-red-950/60 dark:text-red-300"
                >
                  {t("errorBody")}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>

          <AnimatePresence>
            {(status === "sending" || status === "sent") && (
              <StatusOverlay phase={status} onDone={() => setStatus("idle")} />
            )}
          </AnimatePresence>

          {!hideDetails && (
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px 200px 0px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-6 self-start rounded-xl bg-surface-card-softer p-8 shadow-sm backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold">{t("contactInfoHeading")}</h3>

              <div className="space-y-4 text-sm">
                {asideCards.map((card) => {
                  const label = card.labelKey ? tCards(card.labelKey) : card.label;
                  const valueNode = card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        card.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="opacity-70 transition-colors duration-200 hover:text-ink hover:opacity-100"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="opacity-70">{card.value}</p>
                  );

                  return (
                    <div key={card.key} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 opacity-60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={card.iconPath}
                        />
                      </svg>
                      <div>
                        <p className="font-medium">{label}</p>
                        {valueNode}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.aside>
          )}
        </div>
      </div>
    </section>
  );
}
