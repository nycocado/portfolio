import { ComponentType, SVGProps } from "react";
import { Mail } from "lucide-react";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@/components/BrandIcons";

export interface SocialLink {
  id: "linkedin" | "github" | "instagram" | "email";
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    href: process.env.SOCIAL_LINKEDIN_URL!,
    icon: IconBrandLinkedin,
  },
  {
    id: "github",
    href: process.env.SOCIAL_GITHUB_URL!,
    icon: IconBrandGithub,
  },
  {
    id: "instagram",
    href: process.env.SOCIAL_INSTAGRAM_URL!,
    icon: IconBrandInstagram,
  },
  {
    id: "email",
    href: `mailto:${process.env.SOCIAL_EMAIL}`,
    icon: Mail,
  },
];
