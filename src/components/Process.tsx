"use client";

import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your business, users, and goals. Competitive analysis, user interviews, and technical feasibility — no skipped steps.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Wireframes to high-fidelity mockups in Figma. We design systems, not pages — reusable components that scale with your product.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Production-grade code from day one. Next.js, TypeScript, Tailwind — whatever the project demands. We ship fast without cutting corners.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Deployment, performance optimization, analytics setup. We don't disappear after handoff — we make sure it works in the real world.",
  },
];

export default function Process() {
  return (
    <section id="process" className="border-t border-border py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
            How We Work
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            From idea to launch
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            A proven process refined across dozens of startup projects.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <div className="bg-background p-8">
                <span className="font-mono text-5xl font-bold text-accent/20">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
