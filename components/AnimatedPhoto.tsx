"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

let hasAnimated = false;

export function AnimatedPhoto({
  src,
  alt,
}: {
  src: StaticImageData;
  alt: string;
}) {
  const [skipAnimation] = useState(() => hasAnimated);

  useEffect(() => {
    hasAnimated = true;
  }, []);

  return (
    <div
      className={`w-full h-full ${skipAnimation ? "" : "animate-photo-fade-in"}`}
    >
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        className="w-full h-full object-cover select-none pointer-events-none"
        draggable={false}
        priority
      />
    </div>
  );
}
