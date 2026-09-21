export type EnvironmentMode = "normal" | "rain" | "night" | "storm";

export type PanelKind = "music" | "audio" | "note" | null;

export type AudioPresetName =
  | "Normal"
  | "Bass Boost"
  | "Night"
  | "Vocal"
  | "Soft"
  | "Rock"
  | "Emo"
  | "Lo-Fi"
  | "Custom";

export type AudioSettings = {
  bands: number[];
  bass: number;
  mid: number;
  treble: number;
  gain: number;
  balance: number;
  compressor: boolean;
  reverb: number;
  echo: number;
  width: number;
  speed: number;
  pitch: number;
};

export type FutureStem = "Vocal" | "Instrumental" | "Drums" | "Bass" | "Other";