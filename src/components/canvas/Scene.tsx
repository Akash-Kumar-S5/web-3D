"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { ACESFilmicToneMapping } from "three";

interface SceneProps {
  children: React.ReactNode;
}

export default function Scene({ children }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 4, 8], fov: 50, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      dpr={[1, 2]}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}
      raycaster={{ params: { Line: { threshold: 0.1 } } as never }}
    >
      {children}
      <Preload all />
    </Canvas>
  );
}
