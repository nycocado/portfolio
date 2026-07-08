import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { SocialLinks } from "@/components/SocialLinks";
import { AnimatedPhoto } from "@/components/AnimatedPhoto";
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

      <section className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 z-10 w-full max-w-4xl">
          <div className="relative w-[13rem] h-[15rem] md:w-[19rem] md:h-[21.5rem] shrink-0 group">
            <div className="absolute inset-0 rounded-[45%_55%_58%_42%/55%_48%_52%_45%] border-4 border-gruvbox-yellow shadow-2xl animate-pulse opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="w-full h-full rounded-[45%_55%_58%_42%/55%_48%_52%_45%] bg-gruvbox-gray/20 overflow-hidden border-4 border-gruvbox-yellow shadow-2xl flex items-center justify-center relative z-10">
              <AnimatedPhoto src={profilePic} alt={name} />
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <span className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-gruvbox-gray/90">
              {role}
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gruvbox-yellow tracking-tight drop-shadow-sm">
              {name}
            </h1>
            <p className="font-sans text-lg md:text-2xl text-gruvbox-gray/90 font-medium max-w-xl leading-relaxed">
              {tagline}
            </p>
            <SocialLinks />
          </div>
        </div>

        <ScrollCue />
      </section>

      <ProjectsSection />
    </main>
  );
}
