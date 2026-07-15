"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(
        "service_veihd15",
        "template_2hhg08o",
        formRef.current!,
        "eEEf0a6Fjc1l3a3mG"
      );
      setStatus("sent");
    } catch {
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="border-t border-border py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <ScrollReveal>
            <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
              Get in Touch
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Let&apos;s build something
            </h2>
            <p className="mt-4 max-w-md text-lg text-muted">
              Tell us about your project. We typically respond within 24 hours
              and can start within a week.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:creatorstanger@gmail.com"
                className="block text-sm text-muted transition-colors hover:text-accent"
              >
                creatorstanger@gmail.com
              </a>
              <a
                href="#"
                className="block text-sm text-muted transition-colors hover:text-accent"
              >
                Book a 15-minute call
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            {status === "sent" ? (
              <div className="flex h-full items-center justify-center rounded-xl border border-accent/30 bg-accent/5 p-12 text-center">
                <div>
                  <p className="text-lg font-bold text-accent">
                    Message sent.
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="budget"
                    className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted"
                  >
                    Budget range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                  >
                    <option value="5k-10k">5k – 10k MAD</option>
                    <option value="10k-25k">10k – 25k MAD</option>
                    <option value="25k-50k">25k – 50k MAD</option>
                    <option value="50k+">50k+ MAD</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="project"
                    className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted"
                  >
                    Project details
                  </label>
                  <textarea
                    id="project"
                    name="project"
                    rows={4}
                    required
                    className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                    placeholder="Tell us about your project, timeline, and goals..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-accent py-3.5 text-sm font-medium text-background transition-all hover:bg-accent-dim disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
