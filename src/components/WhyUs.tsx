"use client";

import ScrollReveal from "./ScrollReveal";

const differentiators = [
  {
    metric: "2x",
    title: "Faster than agencies",
    description:
      "We're a small, focused team — no account managers, no 2-week sprints for minor changes. Direct communication, rapid execution.",
  },
  {
    metric: "1",
    title: "Team, not vendors",
    description:
      "Design and development under one roof. No handoff delays, no miscommunication between teams. We own the full stack.",
  },
  {
    metric: "50+",
    title: "Startups shipped",
    description:
      "We know what startup websites need — conversion-focused design, fast load times, and the flexibility to iterate as you grow.",
  },
];

export default function WhyUs() {
  return (
    <section className="border-t border-border py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
            Why Us
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Built for startups, by builders
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {differentiators.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <div>
                <span className="font-mono text-6xl font-bold text-accent/30">
                  {item.metric}
                </span>
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
