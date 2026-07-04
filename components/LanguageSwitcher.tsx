"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");
  const nextLocale = routing.locales.find((l) => l !== locale)!;

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className="flex items-center justify-center px-3 h-9 rounded-full border border-gruvbox-gray/50 text-gruvbox-gray hover:border-gruvbox-yellow hover:text-gruvbox-yellow transition-colors text-xs font-bold uppercase tracking-wide"
      aria-label={t("label")}
    >
      {nextLocale}
    </Link>
  );
}
