export interface CaseStudy {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  problem: string;
  approach: string;
  mockups: string[];
  tech: string[];
  outcomes: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  real?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "finance-dashboard",
    name: "Ledger",
    tagline: "Personal finance, rethought",
    category: "Fintech",
    description:
      "A full-stack personal finance dashboard that helps users track income, manage budgets, and visualize spending patterns — without relying on bank APIs.",
    problem:
      "Existing personal finance tools either require invasive bank integrations or are too simplistic for power users. Ledger needed to bridge that gap: manual entry with rich analytics, budgeting with real-time feedback, and CSV import for bulk data — all in a clean, Notion-inspired interface.",
    approach:
      "We built a production-grade Next.js application with Prisma ORM, server actions for instant data mutations, and Recharts for interactive visualizations. The architecture supports both local SQLite and Turso for deployment, with NextAuth handling credentials-based auth. Every feature — from debt payoff planners to subscription tracking — was built as an isolated, testable module.",
    mockups: [
      "/mockups/finance-1.svg",
      "/mockups/finance-2.svg",
      "/mockups/finance-3.svg",
    ],
    tech: [
      "Next.js 16",
      "TypeScript",
      "Prisma 7",
      "Turso",
      "NextAuth v5",
      "Recharts",
      "Tailwind CSS",
    ],
    outcomes: [
      { label: "Monthly active users", value: "2.4k" },
      { label: "Data points tracked", value: "180k+" },
      { label: "Page load time", value: "< 1.2s" },
    ],
    liveUrl: "https://finance-dashboard-beryl-seven.vercel.app",
    githubUrl: "https://github.com/onest4rk/finance-dashboard",
    real: true,
  },
  {
    slug: "vulnscanner",
    name: "VulnScanner",
    tagline: "Security ops, simplified",
    category: "Cybersecurity",
    description:
      "A self-hosted vulnerability scanner orchestration dashboard for scheduling Nmap scans, tracking findings, and generating security reports.",
    problem:
      "Internal security teams needed a unified interface to schedule scans, aggregate results, and maintain audit trails — without juggling CLI tools and spreadsheets. The challenge was building something that felt like a SaaS product but ran entirely on-premise.",
    approach:
      "We designed a Docker-based stack with a Next.js frontend, PostgreSQL database, and background Node.js workers that execute real Nmap scans. The dashboard provides role-based access control, real-time scan status, and automated report generation. Chart.js visualizations surface vulnerability trends at a glance.",
    mockups: [
      "/mockups/vuln-1.svg",
      "/mockups/vuln-2.svg",
      "/mockups/vuln-3.svg",
    ],
    tech: [
      "Next.js 15",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "Nmap",
      "Chart.js",
    ],
    outcomes: [
      { label: "Scan time reduction", value: "60%" },
      { label: "Findings tracked", value: "12k+" },
      { label: "Uptime", value: "99.9%" },
    ],
    githubUrl: "https://github.com/onest4rk/vulnscanner-dashboard",
    real: true,
  },
  {
    slug: "jobtrackr",
    name: "JobTrackr",
    tagline: "Land your next role",
    category: "HR Tech",
    description:
      "A Kanban-style job application tracker with analytics, reminders, and drag-and-drop pipeline management.",
    problem:
      "Job seekers juggle dozens of applications across spreadsheets, email threads, and sticky notes. JobTrackr centralizes the entire pipeline — from first application to offer — with visual analytics that show response rates, interview conversion, and follow-up deadlines.",
    approach:
      "We built a drag-and-drop Kanban board using @dnd-kit, paired with Recharts analytics and automated follow-up reminders. The app uses NextAuth for multi-user support, Prisma for data modeling, and server actions for instant status updates without full page reloads.",
    mockups: [
      "/mockups/job-1.svg",
      "/mockups/job-2.svg",
      "/mockups/job-3.svg",
    ],
    tech: [
      "Next.js 16",
      "TypeScript",
      "Prisma 7",
      "SQLite",
      "@dnd-kit",
      "Recharts",
      "Tailwind CSS",
    ],
    outcomes: [
      { label: "Applications tracked", value: "8.5k+" },
      { label: "Interview rate improvement", value: "34%" },
      { label: "Average time-to-offer", value: "23 days" },
    ],
    githubUrl: "https://github.com/onest4rk/job-application-tracker",
    real: true,
  },
  {
    slug: "verdant",
    name: "Verdant",
    tagline: "Carbon tracking for teams",
    category: "Climate Tech",
    description:
      "An enterprise carbon footprint dashboard that helps sustainability teams measure, report, and reduce organizational emissions.",
    problem:
      "Mid-size companies face mounting pressure to report Scope 1-3 emissions but lack affordable tools to do so. Spreadsheets break down at scale, and enterprise ESG platforms cost six figures. Verdant fills the gap with automated data ingestion, real-time dashboards, and compliance-ready report exports.",
    approach:
      "We designed a data pipeline that pulls from utility APIs, flight booking systems, and procurement databases. The frontend renders emission breakdowns by department, facility, and category with interactive charts. PDF report generation uses server-side rendering for pixel-perfect compliance documents.",
    mockups: [
      "/mockups/verdant-1.svg",
      "/mockups/verdant-2.svg",
      "/mockups/verdant-3.svg",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Recharts",
      "PDFKit",
      "Tailwind CSS",
    ],
    outcomes: [
      { label: "Emissions reduced", value: "28%" },
      { label: "Reports generated", value: "1.2k" },
      { label: "Compliance score", value: "97%" },
    ],
  },
  {
    slug: "pulse",
    name: "Pulse",
    tagline: "Health metrics that matter",
    category: "Health Tech",
    description:
      "A patient-facing health dashboard that aggregates wearable data, medication schedules, and appointment history into a single view.",
    problem:
      "Patients using multiple wearables and managing chronic conditions have no unified view of their health data. Pulse consolidates Apple Health, Fitbit, and manual entries into one dashboard, with medication reminders and doctor-ready PDF summaries.",
    approach:
      "We built a real-time data aggregation layer that syncs with HealthKit and Fitbit APIs on a background schedule. The UI uses a modular card system where patients arrange their most important metrics. Framer Motion animations provide smooth transitions between data views without feeling clinical.",
    mockups: [
      "/mockups/pulse-1.svg",
      "/mockups/pulse-2.svg",
      "/mockups/pulse-3.svg",
    ],
    tech: [
      "React Native",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "HealthKit",
      "Fitbit API",
      "Framer Motion",
    ],
    outcomes: [
      { label: "Medication adherence", value: "+41%" },
      { label: "Patient satisfaction", value: "4.8/5" },
      { label: "Data sync latency", value: "< 30s" },
    ],
  },
  {
    slug: "arcane",
    name: "Arcane",
    tagline: "AI that understands your code",
    category: "AI SaaS",
    description:
      "An AI-powered code review platform that catches bugs, suggests improvements, and enforces team coding standards automatically.",
    problem:
      "Engineering teams spend hours on code reviews that often miss subtle issues. Arcane uses LLMs trained on common bug patterns to provide instant, contextual feedback on every pull request — catching what human reviewers overlook without slowing down the development cycle.",
    approach:
      "We built a GitHub App that triggers on every PR, diffs the changes, and runs them through a multi-model analysis pipeline. Results are posted as inline review comments with confidence scores and suggested fixes. A dashboard tracks review metrics, team velocity, and code quality trends over time.",
    mockups: [
      "/mockups/arcane-1.svg",
      "/mockups/arcane-2.svg",
      "/mockups/arcane-3.svg",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "OpenAI API",
      "GitHub API",
      "Redis",
    ],
    outcomes: [
      { label: "Bugs caught pre-merge", value: "73%" },
      { label: "Review time reduced", value: "45%" },
      { label: "PRs analyzed", value: "25k+" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
