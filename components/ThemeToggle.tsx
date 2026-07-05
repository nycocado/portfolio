"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const t = useTranslations("ThemeToggle");

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "light" ? "dark" : "light";

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    document.startViewTransition(() => {
      setTheme(nextTheme);
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center h-9 w-9 rounded-full border border-gruvbox-gray/50 text-gruvbox-gray hover:border-gruvbox-yellow hover:text-gruvbox-yellow transition-colors cursor-pointer"
      aria-label={t("label")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
