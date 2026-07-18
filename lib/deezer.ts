export async function getDeezerArtistImage(name: string): Promise<string> {
  try {
    const res = await fetch(
      `https://api.deezer.com/search/artist?q=${encodeURIComponent(name)}&limit=1`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return "";
    const json: { data?: { picture_medium?: string }[] } = await res.json();
    return json.data?.[0]?.picture_medium ?? "";
  } catch {
    return "";
  }
}

export async function getDeezerTrackImage(track: string, artist: string): Promise<string> {
  try {
    const res = await fetch(
      `https://api.deezer.com/search/track?q=${encodeURIComponent(`track:"${track}" artist:"${artist}"`)}&limit=1`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return "";
    const json: { data?: { album?: { cover_medium?: string } }[] } = await res.json();
    return json.data?.[0]?.album?.cover_medium ?? "";
  } catch {
    return "";
  }
}
