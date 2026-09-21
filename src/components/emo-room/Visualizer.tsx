import { useEffect, useRef } from "react";

export function Visualizer({ analyser, active }: { analyser: AnalyserNode | null; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    const data = new Uint8Array(analyser?.frequencyBinCount ?? 32);
    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 18;
      if (analyser && active) analyser.getByteFrequencyData(data);
      for (let i = 0; i < bars; i += 1) {
        const sample = active && analyser ? (data[Math.floor((i / bars) * data.length)] ?? 0) : 18 + ((i * 11) % 22);
        const height = Math.max(3, Math.floor((sample / 255) * canvas.height));
        context.fillStyle = i % 4 === 0 ? "#d54b68" : "#9c6ed0";
        context.fillRect(i * 5, canvas.height - height, 3, height);
      }
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, [active, analyser]);

  return <canvas ref={canvasRef} width={90} height={34} className="pixel-visualizer" aria-label="Visualizador do áudio local" />;
}