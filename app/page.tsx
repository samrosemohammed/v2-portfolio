import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { TechStack } from "@/components/tech-stack";
import Timeline from "@/components/timeline";
import { Work } from "@/components/work";
import { MaxWidthWrapper } from "@/wrapper/max-width-wrapper";

export const metadata: Metadata = {
  title: "Mohammed Samrose | Full Stack Engineer",
  description:
    "Explore Mohammed Samrose's portfolio, projects, skills, and engineering approach to building scalable software products.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mohammed Samrose | Full Stack Engineer",
    description:
      "Explore Mohammed Samrose's portfolio, projects, skills, and engineering approach to building scalable software products.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Samrose | Full Stack Engineer",
    description:
      "Explore Mohammed Samrose's portfolio, projects, skills, and engineering approach to building scalable software products.",
  },
};

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <Hero />
        <Timeline />
        <TechStack />
        <Work />
        <Contact />
        <Footer />
      </MaxWidthWrapper>
    </>
  );
}
