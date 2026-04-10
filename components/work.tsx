import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

type ProjectStatus = "Live" | "In Progress" | "Archived";

interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: ProjectStatus;
}

const STATUS_VARIANT: Record<ProjectStatus, "secondary" | "outline"> = {
  Live: "secondary",
  "In Progress": "outline",
  Archived: "outline",
};

const PROJECTS: Project[] = [
  {
    title: "create-samrose-app",
    description:
      "An opinionated CLI to scaffold modern Next.js apps instantly. Configure your full stack — ORM, database, auth, state management, API layer, and more — interactively, without any boilerplate headaches.",
    tags: [
      "CLI",
      "Node.js",
      "TypeScript",
      "Next.js",
      "Prisma",
      "Drizzle",
      "NextAuth",
      "tRPC",
      "oRPC",
    ],
    liveUrl: "https://csa.mohammedsamrose.com.np",
    githubUrl: "https://github.com/samrosemohammed/create-samrose-app",
    status: "Live",
  },
  {
    title: "GrabTheFund",
    description:
      "Finding the right funding shouldn't be hard. GrabTheFund brings grants opportunities into one place — so you can focus on applying, not searching.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tanstack Query",
      "Prisma",
      "PostgreSQL",
      "Apify",
      "Arcjet",
    ],
    liveUrl: "https://grabthe.fund",
    status: "Live",
  },
  {
    title: "Course Management System",
    description:
      "A comprehensive course management system for educational institutions. Features include course creation, enrollment management, and progress tracking.",
    tags: [
      "Next.js",
      "TypeScript",
      "TRPC",
      "Tanstack Query",
      "MongoDB",
      "Prisma",
      "UploadThing",
    ],
    githubUrl: "https://github.com/samrosemohammed/next-cms",
    liveUrl: "https://cms.mohammedsamrose.com.np",
    status: "Live",
  },
  {
    title: "TeamFlow",
    description:
      "A collaborative platform that streamlines team communication and project management. Designed to enhance productivity and collaboration among team members.",
    tags: [
      "Next.js",
      "Tanstack Query",
      "TypeScript",
      "Prisma",
      "oRPC",
      "Kinde",
      "Arcjet",
      "Tailwind",
    ],
    githubUrl: "https://github.com/samrosemohammed/teamflow",
    status: "Live",
  },
];

function ProjectLinks({
  title,
  githubUrl,
  liveUrl,
}: Pick<Project, "title" | "githubUrl" | "liveUrl">) {
  if (!githubUrl && !liveUrl) return null;

  return (
    <div className="flex items-center gap-2 shrink-0 sm:pt-1">
      {githubUrl && (
        <Button asChild variant="outline" size="icon">
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} GitHub repository`}
          >
            <Github className="h-4 w-4" />
          </Link>
        </Button>
      )}
      {liveUrl && (
        <Button asChild variant="outline" size="icon">
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} live site`}
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}

function ProjectCard({
  title,
  description,
  tags,
  status,
  githubUrl,
  liveUrl,
}: Project) {
  return (
    <div className="group py-8 flex flex-col sm:flex-row sm:items-start gap-6">
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h2 className="font-semibold text-lg tracking-[-0.01em]">{title}</h2>
          <Badge
            className="rounded-full text-xs"
            variant={STATUS_VARIANT[status]}
          >
            {status}
          </Badge>
        </div>

        {description && (
          <p className="text-muted-foreground text-sm sm:text-base text-pretty leading-relaxed">
            {description}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-full text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <ProjectLinks title={title} githubUrl={githubUrl} liveUrl={liveUrl} />
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="space-y-4 mb-8">
      <div className="space-y-2">
        <Badge className="rounded-full uppercase" variant="secondary">
          Portfolio
        </Badge>
        <h1 className="text-3xl font-bold tracking-[-0.02em]">Work</h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-lg">
          A selection of projects I&apos;ve built — from SaaS tools to internal
          platforms.
        </p>
      </div>

      <div className="divide-y">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
