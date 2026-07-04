import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

export async function Navbar() {
  const t = await getTranslations("Navbar");

  return (
    <nav className="fixed top-0 inset-x-0 flex items-center justify-between px-8 py-6 max-w-4xl mx-auto z-50">
      <Image src="/logo-light.svg" alt="nycocado" width={40} height={54} draggable={false} className="h-10 w-auto dark:hidden" />
      <Image src="/logo-dark.svg" alt="nycocado" width={40} height={54} draggable={false} className="h-10 w-auto hidden dark:block" />
      <div className="flex items-center gap-6">
        <a
          href="#projects"
          className="hidden md:block text-sm font-medium text-gruvbox-gray hover:text-gruvbox-yellow transition-colors"
        >
          {t("projects")}
        </a>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
