"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/config/projects";
import { ProjectPhotoLightbox } from "@/components/ProjectPhotoLightbox";

const PLACEHOLDER_COUNT = 6;

export function FilmStrip({
  images,
  alt,
}: {
  images: ProjectImage[];
  alt: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const count = images.length || PLACEHOLDER_COUNT;

  return (
    <div className="w-full">
      <div className="bg-black overflow-hidden">
        <div className="h-2 filmstrip-sprockets" />

        <div className="flex w-max gap-1 py-1 animate-filmstrip-scroll hover:[animation-play-state:paused]">
          {Array.from({ length: count * 2 }).map((_, i) => {
            const image = images[i % count];

            if (!image) {
              return (
                <div
                  key={i}
                  className="w-40 md:w-52 aspect-[3/2] shrink-0 border border-dashed border-gruvbox-gray/40 flex items-center justify-center text-[10px] uppercase tracking-widest text-gruvbox-gray/60"
                >
                  Em breve
                </div>
              );
            }

            return (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxIndex(i % count)}
                className="w-40 md:w-52 aspect-[3/2] shrink-0 cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={alt}
                  width={image.width}
                  height={image.height}
                  draggable={false}
                  className="w-full h-full object-cover select-none"
                />
              </button>
            );
          })}
        </div>

        <div className="h-2 filmstrip-sprockets" />
      </div>

      {lightboxIndex !== null && images.length > 0 && (
        <ProjectPhotoLightbox
          images={images}
          alt={alt}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
