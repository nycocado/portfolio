"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaFileDownload } from "react-icons/fa";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SocialLinks } from "@/components/SocialLinks";
import { BackgroundText } from "@/components/BackgroundText";
import { portfolioConfig } from "@/config/portfolio";

export default function Home() {
  const { profileImage, name, initials, role, cvPath, motto } = portfolioConfig;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-background text-foreground transition-colors duration-300 font-sans">
      <BackgroundText />
      <ThemeToggle />

      <div className="flex flex-col items-center justify-center space-y-8 z-10 w-full max-w-4xl">
        <div className="relative w-32 h-32 md:w-48 md:h-48 group">
          <div className="absolute inset-0 rounded-full border-4 border-gruvbox-yellow shadow-2xl animate-pulse opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="w-full h-full rounded-full bg-gruvbox-gray/20 overflow-hidden border-4 border-gruvbox-yellow shadow-2xl flex items-center justify-center relative z-10">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={name}
                width={192}
                height={192}
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
                priority
              />
            ) : (
              <span className="font-display text-4xl font-bold text-gruvbox-yellow">{initials}</span>
            )}
          </div>
        </div>

        <div className="text-center space-y-4">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-gruvbox-yellow tracking-tight drop-shadow-sm">
            {name}
          </h1>
          <p className="font-sans text-lg md:text-2xl text-gruvbox-gray/90 font-medium max-w-2xl mx-auto leading-relaxed">
            {role}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <SocialLinks />
          {cvPath && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={cvPath}
              download
              className="flex items-center gap-2 px-8 py-4 bg-gruvbox-yellow text-[#282828] rounded-lg font-bold shadow-lg shadow-gruvbox-yellow/20"
            >
              <FaFileDownload className="text-xl" />
              Download CV
            </motion.a>
          )}
        </div>
      </div>

      <footer className="absolute bottom-8 w-full text-center">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gruvbox-gray/60 font-sans font-semibold">
          {motto}
        </p>
      </footer>
    </main>
  );
}
