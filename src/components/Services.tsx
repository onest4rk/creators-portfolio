"use client";

import ScrollReveal from "./ScrollReveal";

const services = [
  {
    title: "Brand Identity",
    description:
      "Logo systems, type selection, color palettes, and brand guidelines that give your startup a cohesive visual language.",
    tags: ["Logo Design", "Style Guides", "Visual Identity"],
  },
  {
    title: "Landing Pages",
    description:
      "High-converting landing pages built with Next.js. Fast, accessible, and designed to turn visitors into signups.",
    tags: ["Next.js", "Conversion Optimization", "A/B Testing"],
  },
  {
    title: "Full Product Sites",
    description:
      "Complete web applications — dashboards, SaaS platforms, marketplaces. Design through deployment with ongoing support.",
    tags: ["Full-Stack", "React", "Database Design"],
  },
  {
    title: "Ongoing Development",
    description:
      "Retainer-based partnership for startups that need continuous iteration. New features, bug fixes, and performance improvements.",
    tags: ["Retainer", "Maintenance", "Feature Development"],
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-border py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
            Services
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            What we do
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            End-to-end design and development — from brand to deployment.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <div className="rounded-xl border border-border bg-card p-8 transition-colors hover:border-accent/40">
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
