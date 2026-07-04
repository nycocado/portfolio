import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenu } from "@/components/MobileMenu";

export async function Navbar() {
  const t = await getTranslations("Navbar");
  const links = [{ href: "#projects", label: t("projects") }];

  return (
    <nav className="fixed top-0 inset-x-0 flex items-center justify-between px-8 py-6 max-w-4xl mx-auto z-50">
      <a href="#top" aria-label="nycocado">
        <Image
          src="/logo-light.svg"
          alt="nycocado"
          width={40}
          height={54}
          draggable={false}
          className="h-10 w-auto dark:hidden"
        />
        <Image
          src="/logo-dark.svg"
          alt="nycocado"
          width={40}
          height={54}
          draggable={false}
          className="h-10 w-auto hidden dark:block"
        />
      </a>
      <div className="flex items-center gap-6">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hidden md:block text-sm font-medium text-gruvbox-gray hover:text-gruvbox-yellow transition-colors"
          >
            {link.label}
          </a>
        ))}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileMenu links={links} />
        </div>
      </div>
    </nav>
  );
}
