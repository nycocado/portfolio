"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/config/projects";

const FRAME_WIDTH = 180;
const FRAME_HEIGHT = 130;
const GAP = 6;
const STEP = FRAME_WIDTH + GAP;

export function ProjectPhotoStack({
  images,
  alt,
}: {
  images: ProjectImage[];
  alt: string;
}) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return (
      <div className="w-full h-56 shrink-0 rounded-lg border border-dashed border-gruvbox-outline flex items-center justify-center text-xs text-gruvbox-gray/60 text-center px-4">
        Imagem em breve
      </div>
    );
  }

  return (
    <div className="relative w-full h-56 shrink-0 overflow-hidden rounded-lg bg-black/30">
      <div className="pointer-events-none absolute inset-x-0 top-2 flex justify-center gap-2">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="w-2 h-1.5 rounded-[1px] bg-foreground/20" />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-2">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="w-2 h-1.5 rounded-[1px] bg-foreground/20" />
        ))}
      </div>

      <div
        className="absolute top-1/2 left-1/2 flex items-center transition-transform duration-500 ease-out"
        style={{
          gap: GAP,
          transform: `translate(calc(-50% - ${selected * STEP}px), -50%)`,
        }}
      >
        {images.map((image, i) => {
          const distance = Math.min(Math.abs(i - selected), 3);
          const scale = 1 - distance * 0.12;
          const opacity = 1 - distance * 0.25;
          const grayscale = distance * 30;

          return (
            <button
              key={image.src}
              type="button"
              onClick={() => setSelected(i)}
              className="relative shrink-0 rounded overflow-hidden transition-all duration-500 ease-out cursor-pointer"
              style={{
                width: FRAME_WIDTH,
                height: FRAME_HEIGHT,
                transform: `scale(${scale})`,
                opacity,
                filter: `grayscale(${grayscale}%) brightness(${1 - distance * 0.12})`,
              }}
            >
              <Image
                src={image.src}
                alt={alt}
                fill
                unoptimized={image.src.endsWith(".gif")}
                draggable={false}
                className="object-cover"
              />
            </button>
          );
        })}
      </div>

      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-gruvbox-yellow rounded"
        style={{ width: FRAME_WIDTH + 10, height: FRAME_HEIGHT + 10 }}
      />
    </div>
  );
}
