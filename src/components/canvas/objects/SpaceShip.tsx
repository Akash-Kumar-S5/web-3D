"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Float, Html } from "@react-three/drei";

interface SpaceShipProps {
  onBoard: () => void;
}

export default function SpaceShip({ onBoard }: SpaceShipProps) {
  const groupRef = useRef<THREE.Group>(null);
  const engineLightRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);

  // Pulsing engine glow
  useFrame((state) => {
    if (!engineLightRef.current) return;
    const t = state.clock.elapsedTime;
    engineLightRef.current.intensity = 2.5 + Math.sin(t * 4) * 1.0;
  });

  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = "pointer";
  };
  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "default";
  };

  const glowIntensity = hovered ? 1.2 : 0.4;

  return (
    <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.25}>
      <group
        ref={groupRef}
        onClick={onBoard}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* ── Main Hull ── */}
        {/* Central egg-shaped body (Among Us ship silhouette) */}
        <mesh position={[0, 0, 0]} scale={[2.8, 0.75, 1.1]}>
          <sphereGeometry args={[0.8, 32, 16]} />
          <meshStandardMaterial
            color="#10102a"
            metalness={0.9}
            roughness={0.15}
            emissive="#00ffff"
            emissiveIntensity={glowIntensity * 0.08}
          />
        </mesh>

        {/* Hull top ridge */}
        <mesh position={[0.1, 0.5, 0]} rotation={[0, 0, 0.05]}>
          <boxGeometry args={[3.2, 0.15, 0.7]} />
          <meshStandardMaterial
            color="#0d0d22"
            metalness={0.95}
            roughness={0.1}
            emissive="#00ffff"
            emissiveIntensity={glowIntensity * 0.12}
          />
        </mesh>

        {/* ── Cockpit / Bridge ── */}
        <mesh position={[1.6, 0.28, 0]}>
          <sphereGeometry args={[0.38, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#051828"
            emissive="#0088ff"
            emissiveIntensity={hovered ? 2.5 : 1.8}
            transparent
            opacity={0.9}
            toneMapped={false}
          />
        </mesh>
        {/* Cockpit inner glow disc */}
        <mesh position={[1.6, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.32, 20]} />
          <meshBasicMaterial
            color="#0055cc"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* ── Delta Wings ── */}
        {/* Left wing */}
        <mesh position={[-0.2, -0.08, -1.1]} rotation={[-0.08, -0.12, 0]}>
          <boxGeometry args={[2.6, 0.06, 1.4]} />
          <meshStandardMaterial
            color="#0d0d22"
            metalness={0.9}
            roughness={0.2}
            emissive="#ff00ff"
            emissiveIntensity={glowIntensity * 0.15}
          />
        </mesh>
        {/* Right wing */}
        <mesh position={[-0.2, -0.08, 1.1]} rotation={[0.08, 0.12, 0]}>
          <boxGeometry args={[2.6, 0.06, 1.4]} />
          <meshStandardMaterial
            color="#0d0d22"
            metalness={0.9}
            roughness={0.2}
            emissive="#ff00ff"
            emissiveIntensity={glowIntensity * 0.15}
          />
        </mesh>

        {/* Wing neon trim lines */}
        <mesh position={[-0.2, -0.05, -1.6]}>
          <boxGeometry args={[2.4, 0.015, 0.015]} />
          <meshBasicMaterial color="#ff00ff" toneMapped={false} />
        </mesh>
        <mesh position={[-0.2, -0.05, 1.6]}>
          <boxGeometry args={[2.4, 0.015, 0.015]} />
          <meshBasicMaterial color="#ff00ff" toneMapped={false} />
        </mesh>

        {/* ── Engine Block (rear) ── */}
        <RoundedBox args={[0.9, 0.55, 0.85]} position={[-1.6, 0.0, 0]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color="#080820"
            metalness={0.95}
            roughness={0.1}
          />
        </RoundedBox>

        {/* Engine nozzles — 3 stacked */}
        {[-0.3, 0, 0.3].map((z, i) => (
          <group key={i} position={[-2.1, i === 1 ? 0.05 : -0.05, z]}>
            {/* Nozzle ring */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.13, 0.028, 8, 20]} />
              <meshStandardMaterial color="#222244" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Engine glow disc */}
            <mesh rotation={[0, 0, Math.PI / 2]} position={[0.04, 0, 0]}>
              <circleGeometry args={[0.1, 16]} />
              <meshBasicMaterial
                color={i === 1 ? "#ff4400" : "#ff8800"}
                toneMapped={false}
                transparent
                opacity={0.85}
              />
            </mesh>
          </group>
        ))}

        {/* ── Neon Hull Stripe ── */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[3.6, 0.018, 0.018]} />
          <meshBasicMaterial color="#00ffff" toneMapped={false} />
        </mesh>

        {/* ── Sensor Array (top of hull) ── */}
        <mesh position={[0.5, 0.65, 0]}>
          <boxGeometry args={[0.04, 0.22, 0.04]} />
          <meshStandardMaterial color="#333355" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.5, 0.78, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#00ff88" toneMapped={false} />
        </mesh>

        {/* ── Dynamic Lights ── */}
        {/* Engine exhaust glow (red/orange) */}
        <pointLight
          ref={engineLightRef}
          position={[-2.2, 0, 0]}
          color="#ff5500"
          intensity={2.5}
          distance={3.5}
          decay={2}
        />
        {/* Cockpit blue glow */}
        <pointLight
          position={[1.8, 0.3, 0]}
          color="#0088ff"
          intensity={hovered ? 2.5 : 1.0}
          distance={2.5}
          decay={2}
        />
        {/* Hull cyan glow (hover amplified) */}
        <pointLight
          position={[0, 0.5, 0]}
          color="#00ffff"
          intensity={hovered ? 1.5 : 0.3}
          distance={4}
          decay={2}
        />

        {/* ── "CLICK TO BOARD" HUD label ── */}
        <Html
          position={[0, 1.4, 0]}
          center
          occlude={false}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: hovered ? "#ffffff" : "#00ffff",
              textShadow: hovered
                ? "0 0 8px #fff, 0 0 20px #00ffff"
                : "0 0 8px #00ffff",
              opacity: hovered ? 1 : 0.75,
              transition: "all 0.25s ease",
              whiteSpace: "nowrap",
              background: "rgba(0,0,0,0.4)",
              padding: "4px 10px",
              borderRadius: "3px",
              border: `1px solid ${hovered ? "rgba(255,255,255,0.3)" : "rgba(0,255,255,0.2)"}`,
            }}
          >
            {hovered ? "▶ BOARD SHIP" : "CLICK TO BOARD"}
          </div>
        </Html>
      </group>
    </Float>
  );
}
