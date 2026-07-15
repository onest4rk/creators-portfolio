"use client";

import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote:
      "Creators delivered our landing page in 5 days. Five days. It looked better than what our previous agency produced in 6 weeks.",
    author: "Sarah Chen",
    role: "CEO, Verdant",
    sector: "Climate Tech",
  },
  {
    quote:
      "They didn't just build what we asked for — they pushed back on our bad ideas and suggested better alternatives. That's rare.",
    author: "Marcus Rodriguez",
    role: "CTO, Arcane",
    sector: "AI SaaS",
  },
  {
    quote:
      "Our conversion rate went from 2.1% to 5.8% after the redesign. The ROI paid for itself in the first month.",
    author: "Priya Sharma",
    role: "Head of Growth, Pulse",
    sector: "Health Tech",
  },
];

export default function Testimonials() {
  return (
    <section className="border-t border-border py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            What clients say
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.author} delay={i * 0.1}>
              <div className="rounded-xl border border-border bg-card p-8">
                <p className="text-sm leading-relaxed text-muted">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-bold">{t.author}</p>
                  <p className="mt-1 text-xs text-muted">
                    {t.role} — {t.sector}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
