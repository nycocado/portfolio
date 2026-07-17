import { getTranslations } from "next-intl/server";

export async function ScrollCue() {
  const t = await getTranslations("ScrollCue");

  return (
    <a
      href="#about"
      aria-label={t("label")}
      className="hp-cue-bounce hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-gruvbox-yellow hover:text-gruvbox-yellow-aa transition-colors"
    >
      <svg
        width={64}
        height={99}
        viewBox="0 0 62 96"
        className="w-12 md:w-16 h-auto"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="hp-arrow-path"
          d="M35 6 C 47 9.5, 47 16.5, 35 20 S 23 30.5, 35 34 S 47 44.5, 35 48 S 23 58.5, 35 62 S 35 72.5, 35 76 L 35 88"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M27 80 L35 88 L43 80"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
