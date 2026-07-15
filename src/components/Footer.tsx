import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div>
          <Link href="/" className="text-lg font-bold tracking-tight">
            creators<span className="text-accent">.</span>
          </Link>
          <p className="mt-1 text-xs text-muted">
            Web design & development studio for startups.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/onest4rk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted transition-colors hover:text-accent"
          >
            X / Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href="mailto:hello@creators.studio"
            className="text-xs text-muted transition-colors hover:text-accent"
          >
            Email
          </a>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="font-mono text-xs text-muted/50">
          &copy; {new Date().getFullYear()} Creators. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
