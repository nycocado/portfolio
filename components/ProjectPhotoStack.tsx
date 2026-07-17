"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isVideoSrc, type ProjectImage } from "@/config/projects";
import { ProjectPhotoLightbox } from "@/components/ProjectPhotoLightbox";

const viewportCenter = (scroller: HTMLDivElement) =>
  scroller.getBoundingClientRect().left + scroller.clientWidth / 2;

const childCenter = (child: Element) => {
  const rect = child.getBoundingClientRect();
  return rect.left + rect.width / 2;
};

export function ProjectPhotoStack({
  images,
  alt,
}: {
  images: ProjectImage[];
  alt: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const programmatic = useRef(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === current) video.play().catch(() => {});
      else video.pause();
    });
  }, [current]);

  const updateCurrent = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || programmatic.current || images.length <= 1) return;

    const max = scroller.scrollWidth - scroller.clientWidth;
    if (scroller.scrollLeft <= 0) return setCurrent(0);
    if (scroller.scrollLeft >= max - 1) return setCurrent(images.length - 1);

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
    const onScrollEnd = () => {
      programmatic.current = false;
    };

    scroller.addEventListener("scroll", onScroll);
    scroller.addEventListener("scrollend", onScrollEnd);
    return () => {
      cancelAnimationFrame(rafId);
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("scrollend", onScrollEnd);
    };
  }, [updateCurrent]);

  if (images.length === 0) {
    return (
      <div className="w-full h-40 md:h-64 shrink-0 rounded-lg border border-dashed border-gruvbox-outline flex items-center justify-center text-xs text-gruvbox-gray/90 text-center px-4">
        Imagem em breve
      </div>
    );
  }

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(images.length - 1, index));
    const scroller = scrollerRef.current;
    const child = scroller?.children[clamped] as HTMLElement | undefined;
    if (!scroller || !child) return;

    setCurrent(clamped);
    programmatic.current = true;
    child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div className="w-full">
      <div
        ref={scrollerRef}
        className="relative no-scrollbar flex items-start gap-3 overflow-x-auto pb-2 -mx-8 px-8 md:mx-0 md:px-0 snap-x snap-mandatory"
      >
        {images.map((image, i) => {
          const className = `h-40 md:h-64 w-auto shrink-0 rounded-lg select-none snap-center cursor-pointer transition-all duration-300 ${
            i === current ? "" : "grayscale brightness-[0.55]"
          }`;
          const onClick = () =>
            i === current ? setLightboxOpen(true) : goTo(i);

          if (isVideoSrc(image.src)) {
            return (
              <video
                key={image.src}
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={image.src}
                width={image.width}
                height={image.height}
                muted
                loop
                playsInline
                onClick={onClick}
                className={className}
              />
            );
          }

          return (
            <Image
              key={image.src}
              src={image.src}
              alt={`${alt} — ${i + 1}/${images.length}`}
              width={image.width}
              height={image.height}
              sizes="(min-width: 768px) 460px, 290px"
              draggable={false}
              onClick={onClick}
              className={className}
            />
          );
        })}
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

          <div className="flex items-center">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Photo ${i + 1}`}
                className="w-6 h-6 flex items-center justify-center cursor-pointer"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-5 bg-gruvbox-yellow"
                      : "w-1.5 bg-gruvbox-gray/30 hover:bg-gruvbox-gray/60"
                  }`}
                />
              </button>
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

      {lightboxOpen && (
        <ProjectPhotoLightbox
          images={images}
          alt={alt}
          index={current}
          onIndexChange={goTo}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
