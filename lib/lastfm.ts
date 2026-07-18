import { getDeezerArtistImage, getDeezerTrackImage } from "@/lib/deezer";

const API_URL = "https://ws.audioscrobbler.com/2.0/";

export interface LastFmArtist {
  name: string;
  url: string;
  image: string;
}

export interface LastFmTrack {
  name: string;
  artist: string;
  url: string;
  image: string;
}

export interface LastFmData {
  artists: LastFmArtist[];
  tracks: LastFmTrack[];
}

interface RawArtist {
  name: string;
  url: string;
}

interface RawTrack {
  name: string;
  url: string;
  artist: { name: string };
}

export async function getLastFmWeeklyTop(): Promise<LastFmData | null> {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;
  if (!apiKey || !username) return null;

  const url = (method: string) =>
    `${API_URL}?method=${method}&user=${username}&period=7day&limit=5&api_key=${apiKey}&format=json`;

  try {
    const [artistsRes, tracksRes] = await Promise.all([
      fetch(url("user.gettopartists"), { next: { revalidate: 3600 } }),
      fetch(url("user.gettoptracks"), { next: { revalidate: 3600 } }),
    ]);
    if (!artistsRes.ok || !tracksRes.ok) return null;

    const artistsJson: { topartists?: { artist?: RawArtist[] } } = await artistsRes.json();
    const tracksJson: { toptracks?: { track?: RawTrack[] } } = await tracksRes.json();

    const artists: LastFmArtist[] = await Promise.all(
      (artistsJson.topartists?.artist ?? []).map(async (a) => ({
        name: a.name,
        url: a.url,
        image: await getDeezerArtistImage(a.name),
      })),
    );

    const tracks: LastFmTrack[] = await Promise.all(
      (tracksJson.toptracks?.track ?? []).map(async (t) => ({
        name: t.name,
        artist: t.artist.name,
        url: t.url,
        image: await getDeezerTrackImage(t.name, t.artist.name),
      })),
    );

    return { artists, tracks };
  } catch {
    return null;
  }
}
