"use client";

import { useLayoutEffect, type RefObject } from "react";

export function useRevealOnScroll(
  ref: RefObject<HTMLElement | null>,
  selector: string,
) {
  useLayoutEffect(() => {
    const targets = ref.current?.querySelectorAll(selector);
    if (!targets?.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hp-reveal-on");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    targets.forEach((target, i) => {
      target.classList.add("hp-reveal");
      (target as HTMLElement).style.transitionDelay = `${i * 0.12}s`;
      io.observe(target);
    });

    return () => io.disconnect();
  }, [ref, selector]);
}
