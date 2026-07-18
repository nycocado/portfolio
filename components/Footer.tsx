import { getTranslations } from "next-intl/server";
import { SocialLinks } from "@/components/SocialLinks";

const START_YEAR = 2025;

export async function Footer() {
  const tNavbar = await getTranslations("Navbar");
  const tAbout = await getTranslations("About");
  const tProjects = await getTranslations("Projects");
  const currentYear = new Date().getFullYear();
  const yearLabel = currentYear > START_YEAR ? `${START_YEAR}–${currentYear}` : `${START_YEAR}`;

  return (
    <footer className="w-full max-w-4xl mx-auto px-8 py-10 border-t border-gruvbox-outline/30 flex flex-col items-center gap-6 text-center">
      <SocialLinks size="sm" />

      <nav className="flex gap-6 text-sm font-medium text-gruvbox-gray">
        <a href="#top" className="hover:text-gruvbox-yellow transition-colors">
          {tNavbar("home")}
        </a>
        <a href="#about" className="hover:text-gruvbox-yellow transition-colors">
          {tAbout("heading")}
        </a>
        <a href="#projects" className="hover:text-gruvbox-yellow transition-colors">
          {tProjects("heading")}
        </a>
      </nav>

      <p className="text-xs text-gruvbox-gray/90">© {yearLabel} Nycolas Souza</p>
    </footer>
  );
}
