import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/samrosemohammed",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammed-samrose",
    icon: Linkedin,
  },
  {
    label: "Twitter",
    href: "https://x.com/MohammedSamrose",
    icon: Twitter,
  },
];

export function Contact() {
  return (
    <section id="contact" className="space-y-6 mb-8">
      <div className="space-y-2">
        <Badge className="rounded-full uppercase" variant="secondary">
          Contact
        </Badge>
        <h1 className="text-3xl font-bold tracking-[-0.02em]">Get in Touch</h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-lg">
          Have a project in mind or just want to say hello? My inbox is always
          open.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button asChild>
          <Link href="mailto:samrosemohammed@gmail.com">
            <Mail className="h-4 w-4 mr-2" />
            samrosemohammed@gmail.com
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <Button key={label} asChild variant="outline" size="icon">
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
