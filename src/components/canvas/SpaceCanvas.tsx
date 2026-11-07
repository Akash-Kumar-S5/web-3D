"use client";

import { useRef, Component, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Environment, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { ACESFilmicToneMapping } from "three";
import SpaceShip from "./objects/SpaceShip";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

/* ─── Error boundary ─────────────────────────────────── */
class SpaceErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null };
  static getDerivedStateFromError(e: Error) {
    return { error: e };
  }
  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#080818",
            color: "#00ffff",
            fontFamily: "monospace",
            padding: "2rem",
            zIndex: 9999,
          }}
        >
          <pre style={{ color: "#ff6666", fontSize: "0.75rem" }}>
            {(this.state.error as Error).message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ─── Planet backdrop ────────────────────────────────── */
function Planet() {
  return (
    <group position={[12, -4, -25]}>
      {/* Planet sphere */}
      <mesh>
        <sphereGeometry args={[6, 32, 32]} />
        <meshStandardMaterial
          color="#0a1535"
          roughness={0.8}
          metalness={0.1}
          emissive="#0a0f2e"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Atmosphere glow halo */}
      <mesh>
        <sphereGeometry args={[6.5, 32, 32]} />
        <meshBasicMaterial
          color="#1a3a8f"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[7.2, 32, 32]} />
        <meshBasicMaterial
          color="#0044ff"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/* ─── Slow orbital camera drift ─────────────────────── */
function OrbitCamera() {
  const angle = useRef(0);

  useFrame((state, delta) => {
    angle.current += delta * 0.06;
    const r = 7;
    state.camera.position.x = Math.sin(angle.current) * r * 0.15;
    state.camera.position.y = 1.5 + Math.sin(angle.current * 0.5) * 0.4;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─── Floating debris asteroids ─────────────────────── */
function AsteroidField() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  const asteroids = [
    { pos: [-6, 2, -4] as [number, number, number], scale: 0.12, rot: 0.4 },
    { pos: [5, -1.5, -6] as [number, number, number], scale: 0.08, rot: 0.8 },
    { pos: [-3, -2, -8] as [number, number, number], scale: 0.15, rot: 1.2 },
    { pos: [7, 3, -5] as [number, number, number], scale: 0.1, rot: 0.6 },
    { pos: [-8, 1, -3] as [number, number, number], scale: 0.09, rot: 1.5 },
    { pos: [4, -3, -7] as [number, number, number], scale: 0.13, rot: 0.3 },
    { pos: [-5, 4, -10] as [number, number, number], scale: 0.07, rot: 1.1 },
    { pos: [9, -2, -8] as [number, number, number], scale: 0.11, rot: 0.9 },
  ];

  return (
    <group ref={groupRef}>
      {asteroids.map((a, i) => (
        <mesh
          key={i}
          position={a.pos}
          rotation={[a.rot, a.rot * 0.7, a.rot * 1.3]}
          scale={a.scale}
          raycast={() => null}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.6}
            roughness={0.7}
            emissive="#0a0a1a"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Main SpaceCanvas ───────────────────────────────── */
export default function SpaceCanvas() {
  const setAppState = usePortfolioStore((s) => s.setAppState);

  return (
    <SpaceErrorBoundary>
      <Canvas
        camera={{ position: [0, 1.5, 7], fov: 55 }}
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <AdaptiveDpr pixelated />

        {/* Online HDRI: night preset loads from @pmndrs/assets CDN */}
        <Environment preset="night" />

        {/* Deep-space star field */}
        <Stars
          radius={80}
          depth={40}
          count={2500}
          factor={3}
          saturation={0.3}
          fade
          speed={0.3}
        />

        {/* Very dim ambient */}
        <ambientLight color="#050520" intensity={0.1} />

        {/* Distant blue star light (key) */}
        <directionalLight
          position={[10, 8, 5]}
          color="#4488ff"
          intensity={0.8}
        />

        {/* Distant red/orange light (rim) */}
        <pointLight
          position={[-8, 2, -4]}
          color="#ff6600"
          intensity={1.2}
          distance={20}
          decay={2}
        />

        <Planet />
        <AsteroidField />

        {/* The clickable spaceship */}
        <SpaceShip onBoard={() => setAppState("entering")} />

        <OrbitCamera />
      </Canvas>
    </SpaceErrorBoundary>
  );
}
