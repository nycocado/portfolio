import { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export interface SocialLink {
  name: string;
  href: string;
  icon: IconType;
  label: string;
}

export interface PortfolioConfig {
  name: string;
  role: string;
  initials: string;
  profileImage?: string;
  cvPath?: string;
  motto: string;
  socials: SocialLink[];
}

export const portfolioConfig: PortfolioConfig = {
  name: "Nycolas Souza",
  role: "Junior Full-Stack Developer | Engineering Student",
  initials: "NS",
  profileImage: "/photo.webp",
  cvPath: "/cv.pdf",
  motto: "Precision • Scalability • Architecture",
  socials: [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/nycocado",
      icon: FaLinkedin,
      label: "LinkedIn profile",
    },
    {
      name: "GitHub",
      href: "https://github.com/nycocado",
      icon: FaGithub,
      label: "GitHub profile",
    },
    {
      name: "Email",
      href: "mailto:nycolascanutto@gmail.com",
      icon: FaEnvelope,
      label: "Email contact",
    },
  ],
};

