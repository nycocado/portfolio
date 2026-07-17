"use client";

import { useRef, type MouseEvent } from "react";
import type { StaticImageData } from "next/image";
import { AnimatedPhoto } from "@/components/AnimatedPhoto";

export function HeroPhoto({
  src,
  alt,
}: {
  src: StaticImageData;
  alt: string;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(-y * 8).toFixed(2)}deg)`;
  };

  const handleLeave = () => {
    if (tiltRef.current) {
      tiltRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
  };

  return (
    <div
      className="hero-photo relative w-[13rem] h-[15rem] md:w-[19rem] md:h-[21.5rem] shrink-0 [perspective:700px]"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        ref={tiltRef}
        className="relative w-full h-full transition-transform duration-300 ease-out [transform-style:preserve-3d]"
      >
        <div className="hero-blob-shadow absolute inset-0 border-2 border-gruvbox-yellow" />
        <div className="hero-blob relative w-full h-full overflow-hidden border-4 border-gruvbox-yellow shadow-2xl">
          <AnimatedPhoto src={src} alt={alt} />
        </div>
      </div>
    </div>
  );
}
