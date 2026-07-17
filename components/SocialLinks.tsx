import { getTranslations } from "next-intl/server";
import { socialLinks } from "@/config/portfolio";

export async function SocialLinks({
  size = "default",
}: {
  size?: "default" | "sm";
}) {
  const t = await getTranslations("Social");
  const boxClass =
    size === "sm" ? "w-9 h-9" : "w-12 h-12 md:w-14 md:h-14";
  const iconClass = size === "sm" ? "w-4 h-4" : "w-6 h-6";

  return (
    <div className="flex gap-6">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.id}
            href={social.href}
            target={social.href.startsWith("mailto") ? undefined : "_blank"}
            rel={
              social.href.startsWith("mailto")
                ? undefined
                : "noopener noreferrer"
            }
            className={`hp-tip flex items-center justify-center ${boxClass} border border-gruvbox-gray/50 rounded-lg text-gruvbox-gray hover:border-gruvbox-yellow hover:text-gruvbox-yellow hover:scale-105 hover:bg-gruvbox-yellow/5 transition-all duration-300 shadow-sm hover:shadow-gruvbox-yellow/20`}
            aria-label={t(social.id)}
            data-tip={t(social.id)}
          >
            <Icon className={iconClass} />
          </a>
        );
      })}
    </div>
  );
}
