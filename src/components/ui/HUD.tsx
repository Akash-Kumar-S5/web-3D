"use client";

import { Html } from "@react-three/drei";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

interface LabelProps {
  position: [number, number, number];
  label: string;
  sublabel: string;
}

function FloatingLabel({ position, label, sublabel }: LabelProps) {
  const cameraState = usePortfolioStore((s) => s.cameraState);
  const isVisible = cameraState === "overview";

  return (
    <Html
      position={position}
      center
      distanceFactor={8}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease",
        pointerEvents: "none",
      }}
    >
      <div className="flex flex-col items-center gap-1 select-none">
        <div className="rounded-full glass px-3 py-1 text-xs font-mono text-hk-soul whitespace-nowrap">
          {label}
        </div>
        <div className="text-[10px] text-white/30 tracking-wider animate-pulse">
          {sublabel}
        </div>
      </div>
    </Html>
  );
}

export default function HUD() {
  return (
    <>
      <FloatingLabel
        position={[0, 1.9, -0.3]}
        label="PROJECTS"
        sublabel="CLICK TO EXPLORE"
      />
      <FloatingLabel
        position={[-2.5, 2.6, -1.8]}
        label="SKILLS"
        sublabel="CLICK TO EXPLORE"
      />
      <FloatingLabel
        position={[2.8, 2.7, -1.8]}
        label="ABOUT ME"
        sublabel="CLICK TO EXPLORE"
      />
      <FloatingLabel
        position={[1.3, 1.2, 0.3]}
        label="CONTACT"
        sublabel="CLICK TO EXPLORE"
      />
    </>
  );
}
