import { ComponentType, SVGProps } from "react";
import { Mail } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export interface SocialLink {
  id: "linkedin" | "github" | "email";
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
    id: "email",
    href: `mailto:${process.env.SOCIAL_EMAIL}`,
    icon: Mail,
  },
];
