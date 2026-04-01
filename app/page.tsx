import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/nav-bar";
import { TechStack } from "@/components/tech-stack";
import Timeline from "@/components/timeline";
import { Work } from "@/components/work";
import { MaxWidthWrapper } from "@/wrapper/max-width-wrapper";

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
