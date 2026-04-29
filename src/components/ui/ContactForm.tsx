"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { contactInfo } from "@/data/contact";

/* ---- Status overlay (sending → sent → fade out) ---- */
function StatusOverlay({
  phase,
  onDone,
}: {
  phase: "sending" | "sent";
  onDone: () => void;
}) {
  useEffect(() => {
    if (phase === "sent") {
      const timer = setTimeout(onDone, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, onDone]);

  const isSending = phase === "sending";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <motion.div
        className="w-full max-w-md rounded-2xl bg-white px-6 py-10 text-center shadow-2xl sm:px-10"
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
              {/* Spinner */}
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center">
                <svg
                  className="h-10 w-10 animate-spin text-[#074285]"
                  fill="none"
                  viewBox="0 0 24 24"
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
              <h3 className="mb-2 text-xl font-bold text-[#074285] sm:text-2xl">
                Sending...
              </h3>
              <p className="text-sm leading-relaxed text-[#074285]/70 sm:text-base">
                Your message is on its way.
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
              {/* Checkmark */}
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#074285] sm:text-2xl">
                Message Sent!
              </h3>
              <p className="text-sm leading-relaxed text-[#074285]/70 sm:text-base">
                Thank you for reaching out. We will get back to you shortly.
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
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  company_fax: string; // anti-spam
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm({
  heading = "Get in Touch",
  hideDetails = false,
}: ContactFormProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    company_fax: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function validate(): boolean {
    const errs: Errors = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email.";
    }
    if (!form.message.trim()) errs.message = "Message is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.company_fax) return;
    if (!validate()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "", company_fax: "" });
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear field error on change
    if (errors[e.target.name as keyof Errors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  }

  return (
    <section className="pb-10">
      <div className="container-main">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {heading}
        </motion.h2>

        <div
          className={`grid gap-10 ${hideDetails ? "" : "lg:grid-cols-[1fr_380px]"}`}
        >
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
            noValidate
          >
            {/* Honeypot — hidden from users */}
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
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? "border-red-400" : ""}`}
                  placeholder="Your name"
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? "border-red-400" : ""}`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+40 700 000 000"
              />
            </div>

            <div>
              <label htmlFor="message" className="form-label">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className={`form-textarea ${errors.message ? "border-red-400" : ""}`}
                placeholder="Tell us about your project or question..."
              />
              {errors.message && (
                <p className="form-error">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {/* Error message (inline) */}
            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700"
                >
                  Something went wrong. Please try again later.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Status overlay (sending → sent → fade out) */}
          <AnimatePresence>
            {(status === "sending" || status === "sent") && (
              <StatusOverlay
                phase={status}
                onDone={() => setStatus("idle")}
              />
            )}
          </AnimatePresence>

          {/* Contact details sidebar */}
          {!hideDetails && (
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="self-start space-y-6 rounded-xl bg-white/60 p-8 shadow-sm backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold">Contact Information</h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                      className="opacity-70 transition-colors duration-200 hover:text-[#074285] hover:opacity-100"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="opacity-70 transition-colors duration-200 hover:text-[#074285] hover:opacity-100"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">Address</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-70 transition-colors duration-200 hover:text-[#074285] hover:opacity-100"
                    >
                      {contactInfo.address}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">Working Hours</p>
                    <p className="opacity-70">{contactInfo.hours}</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </div>
      </div>
    </section>
  );
}
