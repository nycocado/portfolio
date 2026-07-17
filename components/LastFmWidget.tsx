import Image from "next/image";
import type { LastFmData } from "@/lib/lastfm";

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
      <div>
        <h3 className="font-display text-lg font-bold text-gruvbox-yellow mb-3">
          {artistsLabel}
        </h3>
        <ul className="flex flex-col gap-2">
          {data.artists.map((artist) => (
            <li key={artist.name}>
              <a
                href={artist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                {artist.image ? (
                  <Image
                    src={artist.image}
                    alt=""
                    width={40}
                    height={40}
                    draggable={false}
                    className="w-10 h-10 rounded-full object-cover select-none shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gruvbox-outline/30 shrink-0" />
                )}
                <span className="text-sm text-gruvbox-gray group-hover:text-gruvbox-yellow transition-colors truncate">
                  {artist.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-lg font-bold text-gruvbox-yellow mb-3">
          {tracksLabel}
        </h3>
        <ul className="flex flex-col gap-2">
          {data.tracks.map((track) => (
            <li key={track.url}>
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                {track.image ? (
                  <Image
                    src={track.image}
                    alt=""
                    width={40}
                    height={40}
                    draggable={false}
                    className="w-10 h-10 rounded object-cover select-none shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded bg-gruvbox-outline/30 shrink-0" />
                )}
                <span className="text-sm text-gruvbox-gray group-hover:text-gruvbox-yellow transition-colors truncate">
                  {track.name}{" "}
                  <span className="text-gruvbox-gray/60">— {track.artist}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
