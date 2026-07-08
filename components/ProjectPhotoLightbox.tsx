"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectImage } from "@/config/projects";

const SWIPE_THRESHOLD = 50;

export function ProjectPhotoLightbox({
  images,
  alt,
  index,
  onIndexChange,
  onClose,
}: {
  images: ProjectImage[];
  alt: string;
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const drag = useRef({ dragging: false, moved: false, startX: 0, startScroll: 0 });

  const canNavigate = images.length > 1;
  const goPrev = () => onIndexChange(Math.max(0, index - 1));
  const goNext = () => onIndexChange(Math.min(images.length - 1, index + 1));

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") goPrev();
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images.length]);

  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

  const image = images[index];
  const isVideo = /\.(webm|mp4)$/.test(image.src);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (delta > SWIPE_THRESHOLD) goPrev();
    else if (delta < -SWIPE_THRESHOLD) goNext();
  };

  const onThumbPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = thumbStripRef.current;
    if (!el) return;
    drag.current = {
      dragging: true,
      moved: false,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
  };

  const onThumbPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.dragging) return;
    const el = thumbStripRef.current;
    if (!el) return;
    const delta = e.clientX - drag.current.startX;
    if (Math.abs(delta) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - delta;
  };

  const onThumbPointerUp = () => {
    drag.current.dragging = false;
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col bg-black/90"
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white shadow-lg transition-colors cursor-pointer z-10"
      >
        <X className="w-5 h-5" />
      </button>

      <div
        className="relative flex-1 flex items-center justify-center px-4 py-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {isVideo ? (
          <video
            key={image.src}
            src={image.src}
            width={image.width}
            height={image.height}
            autoPlay
            muted
            loop
            playsInline
            className="max-h-[70vh] max-w-[92vw] w-auto h-auto object-contain select-none"
          />
        ) : (
          <Image
            key={image.src}
            src={image.src}
            alt={alt}
            width={image.width}
            height={image.height}
            draggable={false}
            className="max-h-[70vh] max-w-[92vw] w-auto h-auto object-contain select-none"
          />
        )}

        {canNavigate && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous photo"
              className="absolute left-2 md:left-6 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white shadow-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next photo"
              className="absolute right-2 md:right-6 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white shadow-lg transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {canNavigate && (
        <div
          ref={thumbStripRef}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={onThumbPointerDown}
          onPointerMove={onThumbPointerMove}
          onPointerUp={onThumbPointerUp}
          onPointerLeave={onThumbPointerUp}
          className="no-scrollbar flex justify-center gap-2 overflow-x-auto px-4 pb-4 cursor-grab active:cursor-grabbing select-none"
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              onClick={() => {
                if (drag.current.moved) {
                  drag.current.moved = false;
                  return;
                }
                onIndexChange(i);
              }}
              aria-label={`Photo ${i + 1}`}
              className={`shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                i === index
                  ? "border-2 border-gruvbox-yellow"
                  : "border-2 border-transparent grayscale brightness-[0.55]"
              }`}
            >
              {/\.(webm|mp4)$/.test(img.src) ? (
                <video
                  src={img.src}
                  muted
                  playsInline
                  className="h-12 md:h-14 w-auto object-cover"
                />
              ) : (
                <Image
                  src={img.src}
                  alt=""
                  width={img.width}
                  height={img.height}
                  draggable={false}
                  className="h-12 md:h-14 w-auto object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}
