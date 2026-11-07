"use client";

import { Suspense, Component, useEffect, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ACESFilmicToneMapping, FogExp2, Color } from "three";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  ContactShadows,
} from "@react-three/drei";
import Room from "./Room";
import CameraRig from "./controls/CameraRig";
import PostProcessing from "./effects/PostProcessing";

class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      const err = this.state.error as Error;
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#0a0a1a",
            color: "#00ffff",
            fontFamily: "monospace",
            padding: "2rem",
            zIndex: 9999,
            overflow: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          <h2 style={{ color: "#ff00ff", marginBottom: "1rem" }}>
            3D Scene Error — check this and share with developer
          </h2>
          <pre style={{ fontSize: "0.75rem", color: "#ff6666" }}>
            {err.message}
            {"\n\n"}
            {err.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function SceneSetup() {
  const { scene } = useThree();
  useEffect(() => {
    scene.background = new Color("#050508");
    scene.fog = new FogExp2("#050508", 0.055);
    return () => {
      scene.background = null;
      scene.fog = null;
    };
  }, [scene]);
  return null;
}

export default function PortfolioCanvas() {
  return (
    <CanvasErrorBoundary>
      <Canvas
        camera={{ position: [0, 4, 8], fov: 50 }}
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <SceneSetup />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <Suspense fallback={null}>
          <Room />

          {/* Soft contact shadows on the floor plane */}
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.6}
            scale={16}
            blur={2}
            far={4}
            resolution={512}
            color="#000011"
          />
        </Suspense>

        <CameraRig />
        <PostProcessing />
      </Canvas>
    </CanvasErrorBoundary>
  );
}
