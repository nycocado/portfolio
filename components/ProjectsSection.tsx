"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { projects } from "@/config/projects";
import { ProjectPhotoStack } from "@/components/ProjectPhotoStack";

export function ProjectsSection() {
  const t = useTranslations("Projects");
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const selected = projects.find((project) => project.id === selectedId)!;
  const highlights = t.raw(`${selected.id}.highlights`) as string[];

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col w-full max-w-4xl mx-auto pt-24 pb-24 px-8"
    >
      <h2 className="font-display text-3xl md:text-4xl font-bold text-gruvbox-yellow mb-12">
        {t("heading")}
      </h2>

      <div className="flex flex-col md:flex-row gap-10">
        <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:w-40 shrink-0">
          {projects.map((project) => {
            const isActive = project.id === selectedId;
            return (
              <button
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                className={`text-sm text-left py-2 px-3 md:px-0 md:pl-3 border-b-2 md:border-b-0 md:border-l-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "border-gruvbox-yellow text-gruvbox-yellow font-bold"
                    : "border-transparent text-gruvbox-gray/60 hover:text-gruvbox-gray"
                }`}
              >
                {t(`${project.id}.title`)}
              </button>
            );
          })}
        </nav>

        <article className="flex-1 flex flex-col gap-6">
          <ProjectPhotoStack key={selected.id} images={selected.images} alt={t(`${selected.id}.title`)} />

          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gruvbox-yellow">
              {t(`${selected.id}.title`)}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-widest text-gruvbox-gray/60">
              {t(`${selected.id}.period`)}
            </p>
            <p className="mt-4 text-gruvbox-gray/90 max-w-2xl">
              {t(`${selected.id}.description`)}
            </p>
            <ul className="mt-4 space-y-2 max-w-2xl">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2 text-sm text-gruvbox-gray/80">
                  <span className="text-gruvbox-yellow">·</span>
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {selected.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full border border-gruvbox-outline text-gruvbox-gray"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={selected.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm text-gruvbox-yellow hover:underline"
            >
              GitHub →
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
