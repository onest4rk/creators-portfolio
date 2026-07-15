"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { caseStudies } from "@/lib/caseStudies";

export default function SelectedWork() {
  return (
    <section id="work" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
            Selected Work
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Projects we&apos;re proud of
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            A selection of products we&apos;ve designed and built for startups
            across fintech, health, climate, and AI.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <ScrollReveal key={cs.slug} delay={i * 0.08}>
              <Link href={`/work/${cs.slug}`} className="group block">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden rounded-xl border border-border bg-card transition-colors group-hover:border-accent/40"
                >
                  {/* Mockup placeholder */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-card via-card to-accent/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-lg border border-border/60 bg-background/80 px-6 py-4 backdrop-blur-sm">
                        <p className="font-mono text-xs text-muted">
                          {cs.category}
                        </p>
                        <p className="mt-1 text-lg font-bold">{cs.name}</p>
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">{cs.name}</h3>
                        <p className="mt-1 text-sm text-muted">{cs.tagline}</p>
                      </div>
                      <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
                        {cs.category}
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                      {cs.description}
                    </p>
                    {cs.real && (
                      <p className="mt-3 font-mono text-xs text-accent">
                        Real project
                      </p>
                    )}
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
