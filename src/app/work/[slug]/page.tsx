import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.name} — Creators`,
    description: cs.description,
    openGraph: {
      title: `${cs.name} — Creators`,
      description: cs.description,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="border-b border-border py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Link
              href="/#work"
              className="mb-8 inline-block font-mono text-sm text-accent transition-colors hover:text-accent-dim"
            >
              &larr; Back to work
            </Link>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
                {cs.category}
              </span>
              {cs.real && (
                <span className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-xs text-accent">
                  Real project
                </span>
              )}
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
              {cs.name}
            </h1>
            <p className="mt-4 text-xl text-muted">{cs.tagline}</p>
          </div>
        </section>

        {/* Mockup previews */}
        <section className="border-b border-border py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="aspect-[16/10] rounded-xl border border-border bg-card"
                >
                  <div className="flex h-full items-center justify-center">
                    <p className="font-mono text-sm text-muted/50">
                      UI Mockup {n}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem & Approach */}
        <section className="border-b border-border py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
                  The Problem
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  {cs.problem}
                </p>
              </div>
              <div>
                <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
                  Our Approach
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  {cs.approach}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="border-b border-border py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
              Tech Stack
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {cs.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-card px-4 py-2 font-mono text-sm text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
              Outcomes
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {cs.outcomes.map((o) => (
                <div key={o.label}>
                  <p className="text-3xl font-bold text-accent">{o.value}</p>
                  <p className="mt-1 text-sm text-muted">{o.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Links */}
        {(cs.liveUrl || cs.githubUrl) && (
          <section className="border-t border-border py-12">
            <div className="mx-auto flex max-w-4xl gap-4 px-6">
              {cs.liveUrl && (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-all hover:bg-accent-dim"
                >
                  View live site
                </a>
              )}
              {cs.githubUrl && (
                <a
                  href={cs.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
                >
                  View source
                </a>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
