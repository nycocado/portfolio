"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { recruiterFacts, personalFacts, timelineIds, photos } from "@/config/about";
import { SectionHeading } from "@/components/SectionHeading";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import { richText } from "@/lib/richText";

type Mode = "recruiter" | "personal";

export function AboutSection() {
  const t = useTranslations("About");
  const [mode, setMode] = useState<Mode>("recruiter");
  const sectionRef = useRef<HTMLElement>(null);

  useRevealOnScroll(sectionRef, "h2, article");

  const facts = mode === "recruiter" ? recruiterFacts : personalFacts;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex flex-col w-full max-w-4xl mx-auto scroll-mt-6 pt-24 pb-24 px-8"
    >
      <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
        <SectionHeading>{t("heading")}</SectionHeading>

        <div className="inline-flex items-center rounded-full border border-gruvbox-outline/50 p-1 mt-3 md:mt-0">
          {(["recruiter", "personal"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer ${
                mode === m
                  ? "bg-gruvbox-yellow text-background"
                  : "text-gruvbox-gray hover:text-gruvbox-yellow"
              }`}
            >
              {t(`toggle.${m}`)}
            </button>
          ))}
        </div>
      </div>

      <article className="flex flex-col md:flex-row items-start gap-10">
        <div className="relative w-full md:w-56 aspect-[3/4] md:aspect-[2/5] shrink-0 rounded-lg overflow-hidden">
          <Image
            key={mode}
            src={photos[mode].src}
            alt={t("heading")}
            fill
            sizes="(min-width: 768px) 14rem, 100vw"
            draggable={false}
            className="object-cover"
            style={{ objectPosition: photos[mode].objectPosition }}
          />
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {(t.raw(`${mode}.bio`) as string[]).map((_, i) => (
              <p key={i} className="text-gruvbox-gray/90 leading-relaxed max-w-2xl">
                {t.rich(`${mode}.bio.${i}`, richText)}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {facts.map((fact) => {
              const Icon = fact.icon;
              return (
                <span
                  key={fact.id}
                  className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-gruvbox-outline text-gruvbox-gray"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t(`${mode}.facts.${fact.id}`)}
                </span>
              );
            })}
          </div>

          {mode === "recruiter" && (
            <div>
              <h3 className="font-display text-lg font-bold text-gruvbox-yellow mb-4">
                {t("recruiter.timelineHeading")}
              </h3>
              <ol>
                {timelineIds.map((id, i) => (
                  <li key={id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="w-3 h-3 mt-1 shrink-0 rounded-full bg-gruvbox-yellow" />
                      {i < timelineIds.length - 1 && (
                        <span className="w-px flex-1 my-1 bg-gruvbox-outline/50" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="text-xs uppercase tracking-widest text-gruvbox-gray/90">
                        {t(`recruiter.timeline.${id}.period`)}
                      </p>
                      <p className="text-sm text-gruvbox-gray">
                        {t(`recruiter.timeline.${id}.title`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
