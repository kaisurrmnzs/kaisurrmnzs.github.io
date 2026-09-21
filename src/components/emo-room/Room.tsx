import { useState } from "react";
import { Headphones, LampDesk, Monitor, MoonStar, Music2, RotateCw, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AudioLab } from "./AudioLab";
import { CatSprite } from "./CatSprite";
import { Environment } from "./Environment";
import { InteractiveObject } from "./InteractiveObject";
import { MusicPlayer } from "./MusicPlayer";
import { PetSprite } from "./PetSprite";
import type { EnvironmentMode, PanelKind } from "./types";

const environmentOrder: EnvironmentMode[] = ["normal", "rain", "night", "storm"];
const environmentLabel: Record<EnvironmentMode, string> = { normal: "Normal", rain: "Chuva", night: "Noite", storm: "Tempestade" };

export function Room() {
  const [panel, setPanel] = useState<PanelKind>(null);
  const [musicLoaded, setMusicLoaded] = useState(false);
  const [environment, setEnvironment] = useState<EnvironmentMode>("rain");
  const [lampOn, setLampOn] = useState(true);
  const [bedMoved, setBedMoved] = useState(false);
  const [notice, setNotice] = useState("Clique nos objetos marcados pela luz.");

  const cycleEnvironment = () => {
    const current = environmentOrder.indexOf(environment);
    const next = environmentOrder[(current + 1) % environmentOrder.length] ?? "normal";
    setEnvironment(next);
    setNotice(`Ambiente: ${environmentLabel[next]}`);
  };

  const toggleMusic = () => {
    setMusicLoaded(true);
    setPanel((current) => current === "music" ? null : "music");
  };

  return (
    <main className={`emo-room environment-${environment} ${lampOn ? "lamp-is-on" : "lamp-is-off"}`}>
      <div className="rotate-phone-gate" role="dialog" aria-modal="true" aria-label="Vire o celular na horizontal">
        <div className="rotate-phone-icon"><RotateCw aria-hidden="true" /></div>
        <strong>VIRE O CELULAR</strong>
        <span>O quarto foi feito para ser visto na horizontal.</span>
      </div>

      <header className="room-titlebar">
        <div><span className="tiny-mark">ER_01</span><h1>EMO ROOM</h1></div>
        <div className="room-status"><i /> {environmentLabel[environment]} · 02:26</div>
      </header>

      <div className="room-stage-wrap">
        <section className="room-stage" aria-label="Quarto emo interativo em pixel art">
          <div className="wall-grain" />
          <div className="ceiling-line" />
          <div className="poster poster-one"><span>NO<br />SIGNAL</span><i /></div>
          <div className="poster poster-two"><span>STAY<br />STRANGE</span><b>★</b></div>
          <div className="photo-strip"><i /><i /><i /></div>
          <div className="scribble">everything<br />is noise</div>
          <div className="window-frame"><Environment mode={environment} /><div className="window-cross" /><div className="curtain curtain-left" /><div className="curtain curtain-right" /><div className="window-sill" /></div>
          <InteractiveObject label={`Janela — ${environmentLabel[environment]}`} className="hotspot-window" onActivate={cycleEnvironment} />

          <div className="shelf"><div className="books"><i /><i /><i /><i /></div><div className="plant"><span /><b>♠</b></div><div className="bottle" /></div>
          <div className="floor-rug" />
          <div className="cable cable-one" /><div className="cable cable-two" />

          <div className={`bed ${bedMoved ? "bed-shift" : ""}`}>
            <div className="bed-head" /><div className="pillow pillow-one" /><div className="pillow pillow-two" /><div className="blanket"><i /><i /></div><div className="bed-frame" />
            <PetSprite />
          </div>
          <InteractiveObject label="Cama desarrumada" className="hotspot-bed" onActivate={() => { setBedMoved((value) => !value); setNotice("Algo se mexeu sob o cobertor..."); }} />

          <div className="desk">
            <div className="desk-top" /><div className="desk-leg desk-leg-left" /><div className="desk-leg desk-leg-right" />
            <div className="monitor"><div className="monitor-screen"><div className="screen-wave"><i /><i /><i /><i /><i /><i /><i /></div><span>PLAYLIST_00</span></div><div className="monitor-neck" /></div>
            <div className="keyboard"><i /><i /><i /><i /><i /><i /><i /></div><div className="mouse" />
            <div className="speaker speaker-left"><i /></div><div className="speaker speaker-right"><i /></div>
            <div className="headphones"><i /><b /></div>
            <div className="desk-cup"><i /></div><div className="desk-bottle" />
          </div>
          <InteractiveObject label="Computador — abrir música" className="hotspot-computer" onActivate={toggleMusic} />
          <InteractiveObject label="Fones — abrir Audio Lab" className="hotspot-headphones" onActivate={() => setPanel(panel === "audio" ? null : "audio")} />

          <div className={`lamp ${lampOn ? "active" : ""}`}><div className="lamp-shade" /><div className="lamp-neck" /><div className="lamp-base" /><div className="lamp-glow" /></div>
          <InteractiveObject label={`Luminária — ${lampOn ? "desligar" : "ligar"}`} className="hotspot-lamp" onActivate={() => { setLampOn((value) => !value); setNotice(lampOn ? "Luz apagada." : "Luz acesa."); }} />

          <div className="cd-stack"><i /><i /><i /></div>
          <InteractiveObject label="Pilha de CDs" className="hotspot-cds" onActivate={() => { setPanel("note"); setNotice("CD-R // mix_untitled_04"); }} />
          <InteractiveObject label="Pôsteres na parede" className="hotspot-posters" onActivate={() => { setPanel("note"); setNotice("NO SIGNAL — impressão caseira, 2007"); }} />

          <CatSprite />
          <div className="room-foreground"><i /><i /><i /></div>
          <div className="interaction-hint" role="status">{notice}</div>
        </section>
      </div>

      <Button
        className="mobile-music-trigger"
        variant={panel === "music" ? "default" : "secondary"}
        onClick={toggleMusic}
        aria-label={panel === "music" ? "Minimizar música" : "Mostrar música"}
      >
        <Music2 aria-hidden="true" />
        <span>{panel === "music" ? "MINIMIZAR" : "MÚSICA"}</span>
        <i aria-hidden="true"><b /><b /><b /></i>
      </Button>

      <nav className="room-dock" aria-label="Atalhos do quarto">
        <Button variant={panel === "music" ? "default" : "ghost"} size="icon" onClick={toggleMusic} aria-label="Música"><Monitor /></Button>
        <Button variant={panel === "audio" ? "default" : "ghost"} size="icon" onClick={() => setPanel(panel === "audio" ? null : "audio")} aria-label="Audio Lab"><Headphones /></Button>
        <Button variant="ghost" size="icon" onClick={() => setLampOn((value) => !value)} aria-label="Luminária"><LampDesk /></Button>
        <Button variant="ghost" size="icon" onClick={cycleEnvironment} aria-label="Alterar ambiente"><MoonStar /></Button>
      </nav>

      {musicLoaded && <MusicPlayer visible={panel === "music"} onMinimize={() => setPanel(null)} />}
      {panel === "audio" && <AudioLab onClose={() => setPanel(null)} />}
      {panel === "note" && (
        <aside className="room-panel note-panel"><Button variant="ghost" size="icon" onClick={() => setPanel(null)} aria-label="Fechar"><X /></Button><Sparkles /><strong>{notice}</strong><span>Um pequeno fragmento da vida neste quarto.</span></aside>
      )}
    </main>
  );
}