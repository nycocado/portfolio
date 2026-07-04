"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/config/projects";

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
      <div className="w-full h-72 md:h-80 shrink-0 rounded-lg border border-dashed border-gruvbox-outline flex items-center justify-center text-xs text-gruvbox-gray/60 text-center px-4">
        Imagem em breve
      </div>
    );
  }

  const goTo = (next: number) => setSelected((next + images.length) % images.length);

  return (
    <div className="w-full shrink-0">
      <div className="relative w-full h-72 md:h-80 rounded-lg bg-gruvbox-gray/10 border border-gruvbox-outline/40 flex items-center justify-center overflow-hidden">
        {images.map((image, i) => (
          <Image
            key={image.src}
            src={image.src}
            alt={alt}
            width={image.width}
            height={image.height}
            unoptimized={image.src.endsWith(".gif")}
            draggable={false}
            className="absolute max-w-[92%] max-h-[92%] w-auto h-auto object-contain rounded transition-opacity duration-500 ease-out"
            style={{ opacity: i === selected ? 1 : 0 }}
          />
        ))}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(selected - 1)}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background/70 text-gruvbox-gray hover:text-gruvbox-yellow transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(selected + 1)}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background/70 text-gruvbox-gray hover:text-gruvbox-yellow transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-3">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selected ? "w-5 bg-gruvbox-yellow" : "w-1.5 bg-gruvbox-gray/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
