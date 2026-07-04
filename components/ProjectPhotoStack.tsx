"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const viewportCenter = (scroller: HTMLDivElement) =>
    scroller.getBoundingClientRect().left + scroller.clientWidth / 2;

  const childCenter = (child: Element) => {
    const rect = child.getBoundingClientRect();
    return rect.left + rect.width / 2;
  };

  const updateCurrent = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || images.length <= 1) return;

    const target = viewportCenter(scroller);
    let nearest = 0;
    let min = Infinity;
    Array.from(scroller.children).forEach((child, i) => {
      const dist = Math.abs(childCenter(child) - target);
      if (dist < min) {
        min = dist;
        nearest = i;
      }
    });
    setCurrent(nearest);
  }, [images]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let rafId = requestAnimationFrame(updateCurrent);
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateCurrent);
    };

    scroller.addEventListener("scroll", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [updateCurrent]);

  if (images.length === 0) {
    return (
      <div className="w-full h-40 md:h-64 shrink-0 rounded-lg border border-dashed border-gruvbox-outline flex items-center justify-center text-xs text-gruvbox-gray/60 text-center px-4">
        Imagem em breve
      </div>
    );
  }

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(images.length - 1, index));
    const scroller = scrollerRef.current;
    const child = scroller?.children[clamped] as HTMLElement | undefined;
    if (!scroller || !child) return;

    const delta = childCenter(child) - viewportCenter(scroller);
    scroller.scrollTo({ left: scroller.scrollLeft + delta, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div
        ref={scrollerRef}
        className="relative no-scrollbar flex items-start gap-3 overflow-x-auto pb-2 -mx-8 px-8 md:mx-0 md:px-0 snap-x snap-mandatory"
      >
        {images.map((image) => (
          <Image
            key={image.src}
            src={image.src}
            alt={alt}
            width={image.width}
            height={image.height}
            unoptimized={image.src.endsWith(".gif")}
            draggable={false}
            className="h-40 md:h-64 w-auto shrink-0 rounded-lg select-none snap-center"
          />
        ))}
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-3">
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            aria-label="Previous photo"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-gruvbox-gray/50 text-gruvbox-gray hover:border-gruvbox-yellow hover:text-gruvbox-yellow transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-5 bg-gruvbox-yellow"
                    : "w-1.5 bg-gruvbox-gray/30"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(current + 1)}
            aria-label="Next photo"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-gruvbox-gray/50 text-gruvbox-gray hover:border-gruvbox-yellow hover:text-gruvbox-yellow transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
