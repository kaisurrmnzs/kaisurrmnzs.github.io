import { Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotifyEmbed } from "./SpotifyEmbed";

export function MusicPlayer({ visible, onMinimize }: { visible: boolean; onMinimize: () => void }) {
  return (
    <section className={`room-panel music-panel ${visible ? "" : "music-panel-minimized"}`} aria-label="Player de música" aria-hidden={!visible}>
      <header className="panel-header">
        <div><span className="panel-kicker">COMPUTER // SPOTIFY</span><h2>MUSIC PLAYER</h2></div>
        <Button variant="ghost" size="icon" onClick={onMinimize} aria-label="Minimizar player"><Minus /></Button>
      </header>
      <SpotifyEmbed />
    </section>
  );
}