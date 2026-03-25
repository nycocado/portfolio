"use client";

import { motion } from "framer-motion";

const ROWS = Array.from({ length: 8 });
const TEXT = "@nycocado ".repeat(20);

export function BackgroundText() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0 flex flex-col justify-center gap-8 py-20 opacity-[0.03] dark:opacity-[0.02]">
      {ROWS.map((_, i) => (
        <motion.div
          key={i}
          className="whitespace-nowrap text-4xl md:text-6xl font-black tracking-tighter"
          animate={{ x: i % 2 === 0 ? [0, -500] : [-500, 0] }}
          transition={{ x: { duration: 40, repeat: Infinity, ease: "linear" } }}
        >
          {TEXT}
        </motion.div>
      ))}
    </div>
  );
}
