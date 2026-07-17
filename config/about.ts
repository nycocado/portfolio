import type { ComponentType, SVGProps } from "react";
import { GraduationCap, MapPin, Languages, Camera, Music, Cpu, Gamepad2, BookOpen } from "lucide-react";

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
