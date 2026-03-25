"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    // Fallback para navegadores que não suportam View Transitions
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    // Efeito de transição suave
    document.startViewTransition(() => {
      setTheme(nextTheme);
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-8 right-8 p-2 rounded-full border border-gruvbox-gray/50 text-gruvbox-gray hover:border-gruvbox-yellow hover:text-gruvbox-yellow transition-colors z-50"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
