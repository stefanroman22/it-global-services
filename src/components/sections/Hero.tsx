"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="container-main">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left — text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Empowering Your Business{" "}
              <span className="text-[#49d4fc]">Through Technology</span>
            </h1>

            <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/85">
              IT Global Services SRL delivers comprehensive IT solutions that
              drive growth, security, and efficiency. From network
              infrastructure to custom software development, we are your
              dedicated technology partner.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="btn-primary">
                Get a Free Consultation
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Our Services
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right — logo showcase with orbiting service icons */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="relative h-72 w-72 md:h-96 md:w-96">
              {/* Soft glow ring behind the logo */}
              <div className="absolute inset-0 rounded-full bg-[#49d4fc]/20 blur-3xl" />
              <div className="absolute inset-6 rounded-full border-2 border-dashed border-white/20" />
              <div className="absolute inset-12 rounded-full border border-white/15" />

              {/* Company logo as the centerpiece */}
              <motion.img
                src="/company-logo.png"
                alt="IT Global Services"
                className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Floating service icons around logo */}
              <motion.div
                className="absolute right-0 top-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="h-7 w-7 text-[#2A5088]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 15C3 17.2091 4.79086 19 7 19H16C18.7614 19 21 16.7614 21 14C21 11.2386 18.7614 9 16 9C16 6.23858 13.7614 4 11 4C8.23858 4 6 6.23858 6 9C4.34315 9 3 10.3431 3 12V15Z" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3e9446] shadow-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute right-4 bottom-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fc1717] shadow-xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 shadow-xl"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
              >
                <svg className="h-6 w-6 text-[#3e9446]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C13.6569 21 15 16.9706 15 12C15 7.02944 13.6569 3 12 3M12 21C10.3431 21 9 16.9706 9 12C9 7.02944 10.3431 3 12 3M3 12C3 7.02944 7.02944 3 12 3" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
