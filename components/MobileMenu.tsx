"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export function MobileMenu({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
        aria-expanded={open}
        className="relative flex items-center justify-center h-9 w-9 rounded-full border border-gruvbox-gray/50 text-gruvbox-gray hover:border-gruvbox-yellow hover:text-gruvbox-yellow transition-colors cursor-pointer"
      >
        <Menu
          className={`absolute w-5 h-5 transition-all duration-300 ${open ? "opacity-0 rotate-45 scale-50" : "opacity-100 rotate-0 scale-100"}`}
        />
        <X
          className={`absolute w-5 h-5 transition-all duration-300 ${open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-50"}`}
        />
      </button>

      <div
        aria-hidden={!open}
        className={`absolute top-full left-8 right-8 mt-3 rounded-lg border border-gruvbox-outline/50 bg-background shadow-xl flex flex-col p-2 origin-top transition-all duration-200 ease-out ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
        }`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            tabIndex={open ? undefined : -1}
            onClick={() => setOpen(false)}
            className="px-4 py-3 text-sm font-medium text-gruvbox-gray hover:text-gruvbox-yellow transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
