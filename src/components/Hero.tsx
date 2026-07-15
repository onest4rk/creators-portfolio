"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const Ferrofluid = dynamic(() => import("./Ferrofluid"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-card" />,
});

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Ferrofluid background */}
      <div className="absolute inset-0">
        <Ferrofluid
          colors={["#22c55e", "#15803d", "#052e16"]}
          speed={0.35}
          scale={1.4}
          turbulence={1.2}
          fluidity={0.1}
          rimWidth={0.15}
          sharpness={2.8}
          shimmer={1.2}
          glow={1.8}
          flowDirection="down"
          opacity={0.6}
          mouseInteraction
          mouseStrength={1}
          mouseRadius={0.35}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-6 font-mono text-sm uppercase tracking-widest text-accent">
          Web design & development studio
        </p>
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-7xl">
          We build websites{" "}
          <span className="text-muted">that make</span>{" "}
          <span className="text-accent">startups</span>{" "}
          <span className="text-muted">look legitimate</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          From first impression to conversion — we design and develop digital
          products that tell your story, earn trust, and ship fast.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#work"
            className="rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-background transition-all hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(34,197,94,0.3)]"
          >
            See our work
          </Link>
          <Link
            href="#contact"
            className="rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Start a project
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Scroll
          </span>
          <div className="h-10 w-px bg-border" />
        </div>
      </div>
    </section>
  );
}
