let cachedToken: { token: string; expiresAt: number } | null = null;

async function getSpotifyToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) return null;

  const json: { access_token: string; expires_in: number } = await res.json();
  cachedToken = {
    token: json.access_token,
    expiresAt: Date.now() + json.expires_in * 1000 - 60_000,
  };
  return json.access_token;
}

export async function getSpotifyArtistImage(name: string): Promise<string> {
  const token = await getSpotifyToken();
  if (!token) return "";

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist&limit=1`,
      { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 86400 } },
    );
    if (!res.ok) return "";
    const json: { artists?: { items?: { images?: { url: string }[] }[] } } = await res.json();
    return json.artists?.items?.[0]?.images?.[0]?.url ?? "";
  } catch {
    return "";
  }
}

export async function getSpotifyTrackImage(track: string, artist: string): Promise<string> {
  const token = await getSpotifyToken();
  if (!token) return "";

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(`track:${track} artist:${artist}`)}&type=track&limit=1`,
      { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 86400 } },
    );
    if (!res.ok) return "";
    const json: { tracks?: { items?: { album?: { images?: { url: string }[] } }[] } } =
      await res.json();
    return json.tracks?.items?.[0]?.album?.images?.[0]?.url ?? "";
  } catch {
    return "";
  }
}
