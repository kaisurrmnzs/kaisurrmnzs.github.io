import { useEffect, useRef, useState } from "react";
import idleAsset from "@/assets/Black-Idle.png";
import runAsset from "@/assets/Black-Run.png";

type CatMode = "idle" | "run" | "react";

export function CatSprite() {
  const [mode, setMode] = useState<CatMode>("idle");
  const [position, setPosition] = useState(48);
  const [direction, setDirection] = useState<1 | -1>(1);
  const positionRef = useRef(position);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    let travelTimer = 0;
    let stopTimer = 0;
    let animationFrame = 0;
    let previous = 0;

    const beginTrip = () => {
      const nextDirection: 1 | -1 = positionRef.current > 62 ? -1 : positionRef.current < 24 ? 1 : Math.random() > 0.5 ? 1 : -1;
      setDirection(nextDirection);
      setMode("run");
      previous = performance.now();
      const duration = 1900 + Math.random() * 1700;
      const tick = (now: number) => {
        const delta = Math.min(32, now - previous);
        previous = now;
        const next = Math.max(12, Math.min(82, positionRef.current + nextDirection * delta * 0.009));
        positionRef.current = next;
        setPosition(next);
        if ((next === 12 && nextDirection < 0) || (next === 82 && nextDirection > 0)) return finishTrip();
        animationFrame = requestAnimationFrame(tick);
      };
      const finishTrip = () => {
        cancelAnimationFrame(animationFrame);
        window.clearTimeout(travelTimer);
        setMode("idle");
        stopTimer = window.setTimeout(beginTrip, 2600 + Math.random() * 3600);
      };
      animationFrame = requestAnimationFrame(tick);
      travelTimer = window.setTimeout(finishTrip, duration);
    };

    stopTimer = window.setTimeout(beginTrip, 1800);
    return () => {
      window.clearTimeout(stopTimer);
      window.clearTimeout(travelTimer);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const react = () => {
    setMode("react");
    window.setTimeout(() => setMode("idle"), 700);
  };

  const sheet = mode === "run" ? runAsset : idleAsset;
  return (
    <button
      type="button"
      aria-label="Fazer carinho no gato preto"
      className={`cat-character cat-${mode}`}
      style={{ left: `${position}%`, transform: `translateX(-50%) scaleX(${direction})` }}
      onClick={react}
    >
      <span
        className={`cat-sheet ${mode === "run" ? "cat-sheet-run" : "cat-sheet-idle"}`}
        style={{ backgroundImage: `url(${sheet})` }}
      />
      <span className="cat-heart" aria-hidden="true">♥</span>
    </button>
  );
}