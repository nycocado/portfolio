import type { ReactNode } from "react";
import Image from "next/image";
import type { LastFmData } from "@/lib/lastfm";

function LastFmList({
  heading,
  items,
}: {
  heading: string;
  items: { key: string; href: string; image: string; imageClassName: string; label: ReactNode }[];
}) {
  return (
    <div>
      <h3 className="font-display text-lg font-bold text-gruvbox-yellow mb-3">
        {heading}
      </h3>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.key}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt=""
                  width={40}
                  height={40}
                  draggable={false}
                  className={`w-10 h-10 object-cover select-none shrink-0 ${item.imageClassName}`}
                />
              ) : (
                <div
                  className={`w-10 h-10 bg-gruvbox-outline/30 shrink-0 ${item.imageClassName}`}
                />
              )}
              <span className="text-sm text-gruvbox-gray group-hover:text-gruvbox-yellow transition-colors truncate">
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LastFmWidget({
  data,
  artistsLabel,
  tracksLabel,
}: {
  data: LastFmData;
  artistsLabel: string;
  tracksLabel: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <LastFmList
        heading={artistsLabel}
        items={data.artists.map((artist) => ({
          key: artist.name,
          href: artist.url,
          image: artist.image,
          imageClassName: "rounded-full",
          label: artist.name,
        }))}
      />
      <LastFmList
        heading={tracksLabel}
        items={data.tracks.map((track) => ({
          key: track.url,
          href: track.url,
          image: track.image,
          imageClassName: "rounded",
          label: (
            <>
              {track.name} <span className="text-gruvbox-gray/90">— {track.artist}</span>
            </>
          ),
        }))}
      />
    </div>
  );
}
