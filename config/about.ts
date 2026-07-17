import type { ComponentType, SVGProps } from "react";
import { GraduationCap, MapPin, Languages, Camera, Music, Cpu, Gamepad2, BookOpen } from "lucide-react";
import type { ProjectImage } from "@/config/projects";

export interface QuickFact {
  id: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const recruiterFacts: QuickFact[] = [
  { id: "education", icon: GraduationCap },
  { id: "location", icon: MapPin },
  { id: "languages", icon: Languages },
];

export const personalFacts: QuickFact[] = [
  { id: "photography", icon: Camera },
  { id: "music", icon: Music },
  { id: "reading", icon: BookOpen },
  { id: "emulators", icon: Cpu },
  { id: "games", icon: Gamepad2 },
];

export const timelineIds = ["senac", "iade-start", "graduation", "current"] as const;

export const photos = {
  recruiter: { src: "/photo-about-recruiter.webp", objectPosition: "50% 33%" },
  personal: { src: "/photo-about-personal.webp", objectPosition: "50% 33%" },
};

export const analogPhotos: ProjectImage[] = [
  { src: "/analog-01.webp", width: 1600, height: 949 },
  { src: "/analog-02.webp", width: 1600, height: 949 },
  { src: "/analog-03.webp", width: 1600, height: 956 },
  { src: "/analog-04.webp", width: 1600, height: 952 },
  { src: "/analog-05.webp", width: 1600, height: 961 },
  { src: "/analog-06.webp", width: 1600, height: 970 },
];
