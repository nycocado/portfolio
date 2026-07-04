"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

export function AnimatedPhoto({
  src,
  alt,
}: {
  src: StaticImageData;
  alt: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
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
