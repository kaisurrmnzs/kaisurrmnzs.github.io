/**
 * Cole aqui futuramente uma URL ou URI pública de playlist, álbum, faixa,
 * artista ou episódio do Spotify. Ex.: https://open.spotify.com/playlist/...
 * O áudio permanece inteiramente sob controle do Spotify Embed oficial.
 */
export const SPOTIFY_RESOURCE = "";

export function getSpotifyEmbedUrl(resource: string): string | null {
  const value = resource.trim();
  if (!value) return null;
  if (value.startsWith("spotify:")) {
    const [, type, id] = value.split(":");
    return type && id ? `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0` : null;
  }
  try {
    const url = new URL(value);
    if (url.hostname !== "open.spotify.com") return null;
    const match = url.pathname.match(/^\/(playlist|album|track|artist|episode|show)\/([^/]+)/);
    return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0` : null;
  } catch {
    return null;
  }
}