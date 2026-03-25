import { portfolioConfig } from "@/config/portfolio";

export function SocialLinks() {
  return (
    <div className="flex gap-6">
      {portfolioConfig.socials.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.href}
            target={social.href.startsWith("mailto") ? undefined : "_blank"}
            rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border border-gruvbox-gray/50 rounded-lg text-gruvbox-gray hover:border-gruvbox-yellow hover:text-gruvbox-yellow hover:scale-105 hover:bg-gruvbox-yellow/5 transition-all duration-300 shadow-sm hover:shadow-gruvbox-yellow/20"
            aria-label={social.label}
          >
            <Icon className="w-6 h-6" />
          </a>
        );
      })}
    </div>
  );
}
