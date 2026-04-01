import { Badge } from "@/components/ui/badge";
type TechCategory = {
  label: string;
  techs: string[];
};

const TECH_STACK: TechCategory[] = [
  {
    label: "Frontend",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    techs: ["Node.js", "tRPC", "oRPC", "REST APIs", "Prisma ORM"],
  },
  {
    label: "Databases",
    techs: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    label: "Cloud & Infra",
    techs: ["AWS", "Vercel", "Docker", "GitHub Actions"],
  },
  {
    label: "Tools & Libs",
    techs: ["Tanstack Query", "Zod", "NextAuth", "Kinde", "Arcjet", "Apify"],
  },
];

export function TechStack() {
  return (
    <section id="tech-stack" className="space-y-4 mb-12">
      <div className="space-y-2">
        <Badge className="rounded-full uppercase" variant="secondary">
          Skills
        </Badge>
        <h1 className="text-3xl font-bold tracking-[-0.02em]">Tech Stack</h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-lg">
          Technologies I work with day-to-day to build reliable, scalable
          products.
        </p>
      </div>
      <div className="divide-y">
        {TECH_STACK.map(({ label, techs }) => (
          <div
            key={label}
            className="py-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6"
          >
            <span className="text-sm font-medium text-muted-foreground w-28 shrink-0 pt-0.5">
              {label}
            </span>
            <div className="flex flex-wrap gap-2">
              {techs.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="rounded-full text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
