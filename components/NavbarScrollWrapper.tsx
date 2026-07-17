"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function NavbarScrollWrapper({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      ref.current?.classList.toggle("hp-nav-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={ref}
      className="hp-nav fixed top-0 inset-x-0 z-50"
    >
      {children}
    </nav>
  );
}
