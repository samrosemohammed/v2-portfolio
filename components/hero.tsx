import Image from "next/image";
import LinkedInProfileImg from "@/public/assets/linkedin-profile.jpeg";

export const Hero = () => {
  return (
    <header className="py-10" aria-labelledby="hero-title">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="relative w-[120px] h-[120px] shrink-0">
          <Image
            src={LinkedInProfileImg}
            alt="Mohammed Samrose"
            fill
            sizes="120px"
            priority
            className="rounded-lg object-cover"
          />
        </div>

        {/* Name & Title & Bio */}
        <div>
          <h1 id="hero-title" className="text-2xl font-bold">
            Mohammed Samrose
          </h1>
          <p className="text-lg text-muted-foreground">Full Stack Engineer</p>
          <p className="mt-3 text-muted-foreground text-sm leading-relaxed max-w-lg">
            Focused on system design, clean architecture, and shipping products
            that hold up in production.
          </p>
        </div>
      </div>
    </header>
  );
};
