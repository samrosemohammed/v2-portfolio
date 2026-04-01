import { Building2, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Full Stack Engineer",
    company: "Percime Technologies",
    period: "Jan 2026 – Present",
    description:
      "Developed and maintained multiple client projects, implemented responsive designs, and integrated third-party APIs for enhanced functionality.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tanstack Query",
      "AI Integration",
      "Prisma",
      "Node.js",
      "PostgreSQL",
      "AWS",
    ],
  },
  {
    title: "Full Stack Engineer",
    company: "MayaMatrix Technologies",
    period: "Jul 2025 – Sep 2025",
    description:
      "Contributed to the development of a SaaS platform, optimized database queries, and collaborated with cross-functional teams to deliver high-quality features on time.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tanstack Query",
      "Generative AI",
      "Prisma",
      "Node.js",
      "MongoDB",
      "Vercel",
    ],
  },
];

export default function Timeline() {
  return (
    <div className="mb-12">
      <div className="mb-4 space-y-2">
        <Badge className="rounded-full uppercase" variant={"secondary"}>
          My Journey
        </Badge>
        <h2 className="text-3xl font-bold tracking-[-0.02em]">Experience</h2>
      </div>
      <div className="relative ml-3">
        {/* Timeline line */}
        <div className="absolute top-4 bottom-0 left-0 border-l-2" />

        {experiences.map(
          ({ company, description, period, technologies, title }, index) => (
            <div className="relative pb-12 pl-8 last:pb-0" key={index}>
              {/* Timeline dot */}
              <div className="absolute top-3 left-px h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background" />

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-base">{company}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-xl tracking-[-0.01em]">
                    {title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{period}</span>
                  </div>
                </div>
                <p className="text-pretty text-muted-foreground text-sm sm:text-base">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge
                      className="rounded-full"
                      key={tech}
                      variant="secondary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
