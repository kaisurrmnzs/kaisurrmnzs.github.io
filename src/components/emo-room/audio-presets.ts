import type { AudioPresetName, AudioSettings } from "./types";

export const EQ_FREQUENCIES = [60, 150, 400, 1000, 2400, 6000, 15000] as const;

export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  bands: [0, 0, 0, 0, 0, 0, 0],
  bass: 0,
  mid: 0,
  treble: 0,
  gain: 0.82,
  balance: 0,
  compressor: false,
  reverb: 0,
  echo: 0,
  width: 1,
  speed: 1,
  pitch: 0,
};

export const AUDIO_PRESETS: Record<Exclude<AudioPresetName, "Custom">, AudioSettings> = {
  Normal: DEFAULT_AUDIO_SETTINGS,
  "Bass Boost": { ...DEFAULT_AUDIO_SETTINGS, bands: [7, 5, 2, 0, -1, -1, 0], bass: 4 },
  Night: { ...DEFAULT_AUDIO_SETTINGS, bands: [3, 2, 0, -1, -2, -4, -5], treble: -3, gain: 0.7 },
  Vocal: { ...DEFAULT_AUDIO_SETTINGS, bands: [-2, -1, 1, 4, 5, 3, 0], mid: 3 },
  Soft: { ...DEFAULT_AUDIO_SETTINGS, bands: [1, 1, 0, 0, -1, -2, -3], compressor: true, reverb: 0.12 },
  Rock: { ...DEFAULT_AUDIO_SETTINGS, bands: [4, 2, -2, 1, 3, 4, 2], compressor: true },
  Emo: { ...DEFAULT_AUDIO_SETTINGS, bands: [4, 2, -1, 2, 4, 3, 1], compressor: true, reverb: 0.18 },
  "Lo-Fi": { ...DEFAULT_AUDIO_SETTINGS, bands: [-5, 1, 3, 2, -1, -6, -10], echo: 0.12, speed: 0.94 },
};

export function cloneSettings(settings: AudioSettings): AudioSettings {
  return { ...settings, bands: [...settings.bands] };
}