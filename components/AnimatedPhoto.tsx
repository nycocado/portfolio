"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

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
    <motion.div
      initial={skipAnimation ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full"
    >
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        className="w-full h-full object-cover select-none pointer-events-none"
        draggable={false}
        priority
      />
    </motion.div>
  );
}
