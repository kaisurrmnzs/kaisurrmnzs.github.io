import { useEffect, useState } from "react";
import { FolderOpen, Pause, Play, RotateCcw, Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { AUDIO_PRESETS, cloneSettings, DEFAULT_AUDIO_SETTINGS } from "./audio-presets";
import { Equalizer } from "./Equalizer";
import type { AudioPresetName, AudioSettings, FutureStem } from "./types";
import { useAudioEngine } from "./useAudioEngine";
import { Visualizer } from "./Visualizer";

const presetNames: AudioPresetName[] = ["Normal", "Bass Boost", "Night", "Vocal", "Soft", "Rock", "Emo", "Lo-Fi", "Custom"];
const stems: FutureStem[] = ["Vocal", "Instrumental", "Drums", "Bass", "Other"];

function Control({ label, value, min, max, step = 1, onChange }: { label: string; value: number; min: number; max: number; step?: number; onChange: (value: number) => void }) {
  return (
    <label className="lab-control">
      <span>{label}<output>{value.toFixed(step < 1 ? 2 : 0)}</output></span>
      <Slider min={min} max={max} step={step} value={[value]} onValueChange={([next]) => onChange(next ?? value)} />
    </label>
  );
}

export function AudioLab({ onClose }: { onClose: () => void }) {
  const [settings, setSettings] = useState<AudioSettings>(() => cloneSettings(DEFAULT_AUDIO_SETTINGS));
  const [preset, setPreset] = useState<AudioPresetName>("Normal");
  const engine = useAudioEngine(settings);

  useEffect(() => {
    const saved = window.localStorage.getItem("emo-room-audio-preset");
    if (!saved) return;
    try { setSettings(JSON.parse(saved) as AudioSettings); } catch { /* ignore malformed local data */ }
  }, []);

  const change = <K extends keyof AudioSettings>(key: K, value: AudioSettings[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
    setPreset("Custom");
  };

  const choosePreset = (name: AudioPresetName) => {
    setPreset(name);
    if (name !== "Custom") setSettings(cloneSettings(AUDIO_PRESETS[name]));
  };

  return (
    <section className="room-panel audio-panel" aria-label="Audio Lab">
      <header className="panel-header">
        <div><span className="panel-kicker">LOCAL AUDIO // WEB AUDIO</span><h2>AUDIO LAB</h2></div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar Audio Lab"><X /></Button>
      </header>
      <div className="audio-source-row">
        <label className="file-trigger"><Upload /> <span>{engine.fileName || "Escolher áudio local"}</span><input type="file" accept="audio/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) engine.loadFile(file); }} /></label>
        <Button size="icon" variant="secondary" onClick={() => void engine.togglePlayback()} disabled={!engine.fileName} aria-label={engine.isPlaying ? "Pausar" : "Reproduzir"}>{engine.isPlaying ? <Pause /> : <Play />}</Button>
        <Visualizer analyser={engine.analyser} active={engine.isPlaying} />
        <audio ref={engine.audioRef} onPlay={() => engine.setIsPlaying(true)} onPause={() => engine.setIsPlaying(false)} onEnded={() => engine.setIsPlaying(false)} />
      </div>
      <div className="preset-strip" aria-label="Presets">
        {presetNames.map((name) => <Button key={name} size="sm" variant={preset === name ? "default" : "outline"} onClick={() => choosePreset(name)}>{name}</Button>)}
      </div>
      <Equalizer values={settings.bands} onChange={(index, value) => change("bands", settings.bands.map((band, bandIndex) => bandIndex === index ? value : band))} />
      <div className="lab-grid">
        <Control label="Bass" value={settings.bass} min={-12} max={12} onChange={(value) => change("bass", value)} />
        <Control label="Mid" value={settings.mid} min={-12} max={12} onChange={(value) => change("mid", value)} />
        <Control label="Treble" value={settings.treble} min={-12} max={12} onChange={(value) => change("treble", value)} />
        <Control label="Gain" value={settings.gain} min={0} max={1.5} step={0.05} onChange={(value) => change("gain", value)} />
        <Control label="Balance" value={settings.balance} min={-1} max={1} step={0.1} onChange={(value) => change("balance", value)} />
        <Control label="Reverb" value={settings.reverb} min={0} max={0.7} step={0.05} onChange={(value) => change("reverb", value)} />
        <Control label="Echo" value={settings.echo} min={0} max={0.65} step={0.05} onChange={(value) => change("echo", value)} />
        <Control label="Stereo Width" value={settings.width} min={0} max={2} step={0.1} onChange={(value) => change("width", value)} />
        <Control label="Speed" value={settings.speed} min={0.5} max={1.5} step={0.05} onChange={(value) => change("speed", value)} />
        <Control label="Pitch (linked)" value={settings.pitch} min={-6} max={6} onChange={(value) => change("pitch", value)} />
        <label className="compressor-toggle"><span>Compressor</span><Switch checked={settings.compressor} onCheckedChange={(checked) => change("compressor", checked)} /></label>
      </div>
      <div className="stems-ready"><span>STEMS READY</span>{stems.map((stem) => <i key={stem}>{stem}</i>)}</div>
      <footer className="panel-actions">
        <Button variant="outline" onClick={() => { setSettings(cloneSettings(DEFAULT_AUDIO_SETTINGS)); setPreset("Normal"); }}><RotateCcw /> Reset</Button>
        <Button variant="outline" onClick={() => window.localStorage.setItem("emo-room-audio-preset", JSON.stringify(settings))}><Save /> Salvar preset</Button>
        <Button variant="outline" onClick={() => { const saved = window.localStorage.getItem("emo-room-audio-preset"); if (saved) { try { setSettings(JSON.parse(saved) as AudioSettings); setPreset("Custom"); } catch { /* ignore malformed local data */ } } }}><FolderOpen /> Carregar preset</Button>
      </footer>
      <p className="panel-footnote">Processamento apenas no navegador. Pitch independente requer um processador de pitch dedicado; neste modo, Speed controla a velocidade. Separação de stems requer arquivos reais.</p>
    </section>
  );
}