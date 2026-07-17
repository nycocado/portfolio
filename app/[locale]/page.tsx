import type { CSSProperties } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { SocialLinks } from "@/components/SocialLinks";
import { HeroPhoto } from "@/components/HeroPhoto";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ScrollCue } from "@/components/ScrollCue";
import { socialLinks } from "@/config/portfolio";
import { SITE_URL } from "@/lib/site";
import profilePic from "@/public/photo.webp";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Hero");
  const name = t("name");
  const alternateName = t("alternateName");
  const role = t("role");
  const tagline = t("tagline");

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    alternateName,
    jobTitle: role,
    url: `${SITE_URL}/${locale}`,
    sameAs: socialLinks
      .filter((social) => social.id !== "email")
      .map((social) => social.href),
  };

  return (
    <main
      id="top"
      className="relative bg-background text-foreground transition-colors duration-300 font-sans"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar />

      <section className="relative min-h-svh flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 z-10 w-full max-w-4xl">
          <div className="hp-in" style={{ "--hp-i": 1 } as CSSProperties}>
            <HeroPhoto src={profilePic} alt={name} />
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <span
              className="hp-in font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-gruvbox-gray/90"
              style={{ "--hp-i": 2 } as CSSProperties}
            >
              {role}
            </span>
            <h1
              className="hp-in font-display text-5xl md:text-7xl font-bold text-gruvbox-yellow tracking-tight drop-shadow-sm"
              style={{ "--hp-i": 3 } as CSSProperties}
            >
              {name}
            </h1>
            <svg
              className="hp-in -mt-1.5 text-gruvbox-yellow"
              style={{ "--hp-i": 3 } as CSSProperties}
              width={180}
              height={12}
              viewBox="0 0 180 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                className="hp-underline"
                d="M3 8 C 30 3, 55 10, 85 6 S 145 3, 177 7"
                stroke="currentColor"
                strokeWidth={4}
                strokeLinecap="round"
              />
            </svg>
            <p
              className="hp-in font-sans text-lg md:text-2xl text-gruvbox-gray/90 font-medium max-w-xl leading-relaxed"
              style={{ "--hp-i": 4 } as CSSProperties}
            >
              {tagline}
            </p>
            <div className="hp-in" style={{ "--hp-i": 5 } as CSSProperties}>
              <SocialLinks />
            </div>
          </div>
        </div>

        <ScrollCue />
      </section>

      <ProjectsSection />
    </main>
  );
}
