import { ExternalLink, Music2 } from "lucide-react";
import { SPOTIFY_RESOURCE, getSpotifyEmbedUrl } from "./spotify-config";

export function SpotifyEmbed() {
  const embedUrl = getSpotifyEmbedUrl(SPOTIFY_RESOURCE);

  if (!embedUrl) {
    return (
      <div className="spotify-empty" role="status">
        <Music2 aria-hidden="true" />
        <strong>PLAYLIST AINDA NÃO CONFIGURADA</strong>
        <span>Defina SPOTIFY_RESOURCE em spotify-config.ts para carregar uma playlist oficial.</span>
      </div>
    );
  }

  return (
    <div className="spotify-embed-wrap">
      <iframe
        src={embedUrl}
        title="Spotify playlist"
        className="spotify-embed-frame"
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
      <a className="spotify-open-link" href={SPOTIFY_RESOURCE} target="_blank" rel="noreferrer">
        Abrir no Spotify <ExternalLink aria-hidden="true" />
      </a>
    </div>
  );
}
