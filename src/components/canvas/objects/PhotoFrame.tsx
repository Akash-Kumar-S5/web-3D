"use client";

/**
 * Ancient Portrait — About section (replaces PhotoFrame).
 * Dark stone frame with an HK-style horned mask silhouette.
 */

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface PhotoFrameProps {
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  emissiveIntensity?: number;
}

export default function PhotoFrame({
  onClick,
  onPointerOver,
  onPointerOut,
  emissiveIntensity = 0.15,
}: PhotoFrameProps) {
  const portraitRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (portraitRef.current) {
      const t = state.clock.elapsedTime;
      const mat = portraitRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = emissiveIntensity * 0.4 + Math.sin(t * 0.8) * 0.03;
    }
  });

  return (
    <group
      position={[2.8, 2.0, -1.8]}
      rotation={[0, -0.3, 0]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Outer stone frame */}
      <mesh>
        <boxGeometry args={[0.75, 0.96, 0.06]} />
        <meshStandardMaterial
          color="#1a1820"
          metalness={0.08}
          roughness={0.92}
          emissive="#0c0b10"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Inner bevel frame step */}
      <mesh position={[0, 0, 0.025]}>
        <boxGeometry args={[0.65, 0.86, 0.015]} />
        <meshStandardMaterial
          color="#141218"
          roughness={0.95}
          metalness={0.06}
        />
      </mesh>

      {/* Portrait canvas — very dark, subtle blue glow */}
      <mesh ref={portraitRef} position={[0, 0, 0.034]}>
        <planeGeometry args={[0.56, 0.76]} />
        <meshStandardMaterial
          color="#040408"
          emissive="#506088"
          emissiveIntensity={emissiveIntensity * 0.4}
          roughness={0.98}
          metalness={0.0}
        />
      </mesh>

      {/* --- Hollow Knight mask silhouette --- */}
      {/* Head — oval face */}
      <mesh position={[0, 0.1, 0.036]}>
        <sphereGeometry args={[0.11, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        <meshStandardMaterial color="#14121c" roughness={0.96} />
      </mesh>

      {/* Left horn */}
      <mesh position={[-0.09, 0.24, 0.036]} rotation={[0, 0, 0.45]}>
        <coneGeometry args={[0.022, 0.16, 4]} />
        <meshStandardMaterial color="#14121c" roughness={0.96} />
      </mesh>
      {/* Right horn */}
      <mesh position={[0.09, 0.24, 0.036]} rotation={[0, 0, -0.45]}>
        <coneGeometry args={[0.022, 0.16, 4]} />
        <meshStandardMaterial color="#14121c" roughness={0.96} />
      </mesh>

      {/* Eyes — soul-blue emissive dots */}
      <mesh position={[-0.04, 0.08, 0.038]}>
        <circleGeometry args={[0.018, 8]} />
        <meshStandardMaterial
          color="#b8ccff"
          emissive="#b8ccff"
          emissiveIntensity={emissiveIntensity * 1.2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0.04, 0.08, 0.038]}>
        <circleGeometry args={[0.018, 8]} />
        <meshStandardMaterial
          color="#b8ccff"
          emissive="#b8ccff"
          emissiveIntensity={emissiveIntensity * 1.2}
          toneMapped={false}
        />
      </mesh>

      {/* Body/cloak — tapered trapezoid */}
      <mesh position={[0, -0.14, 0.035]}>
        <boxGeometry args={[0.15, 0.30, 0.001]} />
        <meshStandardMaterial color="#10101a" roughness={0.96} />
      </mesh>
      {/* Cloak flare at bottom */}
      <mesh position={[0, -0.28, 0.035]}>
        <boxGeometry args={[0.20, 0.06, 0.001]} />
        <meshStandardMaterial color="#0e0e16" roughness={0.96} />
      </mesh>

      {/* Amber corner ornaments */}
      {[
        { pos: [-0.33, 0.44, 0.04] as [number, number, number] },
        { pos: [0.33, 0.44, 0.04] as [number, number, number] },
        { pos: [-0.33, -0.44, 0.04] as [number, number, number] },
        { pos: [0.33, -0.44, 0.04] as [number, number, number] },
      ].map((c, i) => (
        <mesh key={i} position={c.pos}>
          <boxGeometry args={[0.04, 0.04, 0.004]} />
          <meshStandardMaterial
            color="#c8a857"
            emissive="#c8a857"
            emissiveIntensity={emissiveIntensity * 1.5}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Amber top center ornament */}
      <mesh position={[0, 0.44, 0.04]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.03, 0.03, 0.004]} />
        <meshStandardMaterial
          color="#c8a857"
          emissive="#c8a857"
          emissiveIntensity={emissiveIntensity * 1.2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
