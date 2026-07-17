"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { isVideoSrc, type ProjectImage } from "@/config/projects";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

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
  const isVideo = isVideoSrc(image.src);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setVideoPaused(false);
    setVideoProgress(0);

    const onTimeUpdate = () => {
      setVideoProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
    };
    const onPlay = () => setVideoPaused(false);
    const onPause = () => setVideoPaused(true);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [index]);

  const toggleVideoPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  const seekVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * video.duration;
  };

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
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {isVideo ? (
          <video
            key={image.src}
            ref={videoRef}
            src={image.src}
            width={image.width}
            height={image.height}
            autoPlay
            muted
            loop
            playsInline
            onClick={(e) => e.stopPropagation()}
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
            onClick={(e) => e.stopPropagation()}
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

        {isVideo && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 w-64 max-w-[80vw] rounded-full bg-black/60 backdrop-blur-sm px-4 py-2 shadow-lg"
          >
            <button
              type="button"
              onClick={toggleVideoPlay}
              aria-label={videoPaused ? "Play" : "Pause"}
              className="shrink-0 text-white cursor-pointer"
            >
              {videoPaused ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>
            <div
              onClick={seekVideo}
              className="h-1.5 flex-1 rounded-full bg-white/30 cursor-pointer"
            >
              <div
                className="h-full rounded-full bg-white"
                style={{ width: `${videoProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {canNavigate && (
        <div
          ref={thumbStripRef}
          onClick={(e) => e.stopPropagation()}
          className="flex justify-start gap-2 overflow-x-auto px-4 pb-4"
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-label={`Photo ${i + 1}`}
              className={`shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                i === index
                  ? "border-2 border-gruvbox-yellow"
                  : "border-2 border-transparent grayscale brightness-[0.55]"
              }`}
            >
              {isVideoSrc(img.src) ? (
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
