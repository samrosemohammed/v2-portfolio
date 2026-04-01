import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Assistant", href: "/assistant" },
];

export const Navbar = () => {
  return (
    <nav
      aria-label="Primary"
      className="max-w-3xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-1.5"
    >
      <Link
        href="/"
        className="text-sm font-semibold tracking-tight text-foreground hover:opacity-70 transition-opacity"
        aria-label="Home"
      >
        mdsamrose
        <span className="text-muted-foreground font-normal">.dev</span>
      </Link>

      <div className="flex items-center gap-1 sm:gap-2">
        <ul className="flex gap-2 sm:gap-4">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Button
          asChild
          variant="outline"
          size="icon"
          className="h-8 w-8 sm:h-9 sm:w-9"
        >
          <Link
            href="https://github.com/samrosemohammed"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub profile"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
          </Link>
        </Button>

        <ThemeToggle />
      </div>
    </nav>
  );
};
