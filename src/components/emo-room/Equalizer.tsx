import { Slider } from "@/components/ui/slider";
import { EQ_FREQUENCIES } from "./audio-presets";

type EqualizerProps = { values: number[]; onChange: (index: number, value: number) => void };

export function Equalizer({ values, onChange }: EqualizerProps) {
  return (
    <div className="equalizer" aria-label="Equalizador de sete bandas">
      {EQ_FREQUENCIES.map((frequency, index) => (
        <label key={frequency} className="eq-band">
          <span>{frequency >= 1000 ? `${frequency / 1000}k` : frequency}</span>
          <Slider
            orientation="vertical"
            min={-12}
            max={12}
            step={1}
            value={[values[index] ?? 0]}
            onValueChange={([value]) => onChange(index, value ?? 0)}
            aria-label={`${frequency} Hz`}
          />
          <small>{values[index] ?? 0}</small>
        </label>
      ))}
    </div>
  );
}