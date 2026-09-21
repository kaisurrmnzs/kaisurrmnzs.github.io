import type { EnvironmentMode } from "./types";

export function Environment({ mode }: { mode: EnvironmentMode }) {
  if (mode === "normal") return <div className="window-sky window-sky-normal" />;
  return (
    <div className={`window-sky window-sky-${mode}`} aria-hidden="true">
      {(mode === "rain" || mode === "storm") && (
        <div className="rain-field">
          {Array.from({ length: 22 }, (_, index) => (
            <i key={index} style={{ "--drop": index } as React.CSSProperties} />
          ))}
        </div>
      )}
      {mode === "storm" && <div className="lightning" />}
      {mode === "night" && <div className="pixel-moon" />}
    </div>
  );
}