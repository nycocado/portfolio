import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { SocialLinks } from "@/components/SocialLinks";
import { AnimatedPhoto } from "@/components/AnimatedPhoto";
import { socialLinks } from "@/config/portfolio";
import { SITE_URL } from "@/lib/site";
import profilePic from "@/public/photo.webp";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Hero");
  const name = t("name");
  const role = t("role");

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: role,
    url: `${SITE_URL}/${locale}`,
    sameAs: socialLinks
      .filter((social) => social.id !== "email")
      .map((social) => social.href),
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-background text-foreground transition-colors duration-300 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar />

      <div className="flex flex-col items-center justify-center space-y-8 z-10 w-full max-w-4xl">
        <div className="relative w-32 h-32 md:w-48 md:h-48 group">
          <div className="absolute inset-0 rounded-full border-4 border-gruvbox-yellow shadow-2xl animate-pulse opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="w-full h-full rounded-full bg-gruvbox-gray/20 overflow-hidden border-4 border-gruvbox-yellow shadow-2xl flex items-center justify-center relative z-10">
            <AnimatedPhoto src={profilePic} alt={name} />
          </div>
        </div>

        <div className="text-center space-y-4">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-gruvbox-yellow tracking-tight drop-shadow-sm">
            {name}
          </h1>
          <p className="font-sans text-lg md:text-2xl text-gruvbox-gray/90 font-medium max-w-2xl mx-auto leading-relaxed">
            {role}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <SocialLinks />
        </div>
      </div>
    </main>
  );
}
