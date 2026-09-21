import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InteractiveObjectProps = {
  label: string;
  className: string;
  children?: ReactNode;
  onActivate: () => void;
};

export function InteractiveObject({ label, className, children, onActivate }: InteractiveObjectProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn("room-hotspot group", className)}
      onClick={onActivate}
    >
      <span className="room-hotspot-label">{label}</span>
      {children}
    </button>
  );
}