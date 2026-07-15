import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creators — Web Design & Development Studio",
  description:
    "We build professional websites for startups. From landing pages to full product sites — design and development under one roof.",
  keywords: [
    "web design",
    "web development",
    "startup",
    "Next.js",
    "React",
    "TypeScript",
  ],
  openGraph: {
    title: "Creators — Web Design & Development Studio",
    description:
      "We build professional websites for startups. Design and development under one roof.",
    type: "website",
    siteName: "Creators",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
