"use client";

/**
 * Geo Crystal — Contact section (replaces Phone).
 * A glowing amber geo crystal cluster from Hallownest.
 */

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface PhoneProps {
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  emissiveIntensity?: number;
}

export default function Phone({
  onClick,
  onPointerOver,
  onPointerOut,
  emissiveIntensity = 0.3,
}: PhoneProps) {
  const crystalRef = useRef<THREE.Mesh>(null);
  const crystal2Ref = useRef<THREE.Mesh>(null);

  // Slow amber pulse
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = emissiveIntensity + Math.sin(t * 1.2) * 0.1;
    if (crystalRef.current) {
      (crystalRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
    if (crystal2Ref.current) {
      (crystal2Ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        pulse * 0.6;
    }
  });

  return (
    <group
      position={[1.3, 0.72, 0.3]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Main geo crystal */}
      <mesh ref={crystalRef} rotation={[0.2, 0.4, 0.1]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color="#3a2c0a"
          emissive="#c8a857"
          emissiveIntensity={emissiveIntensity}
          roughness={0.3}
          metalness={0.4}
          toneMapped={false}
        />
      </mesh>

      {/* Smaller shard left */}
      <mesh ref={crystal2Ref} position={[-0.18, -0.08, 0.05]} rotation={[0.5, -0.3, 0.8]}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial
          color="#2a1e06"
          emissive="#c8a857"
          emissiveIntensity={emissiveIntensity * 0.6}
          roughness={0.4}
          metalness={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Smaller shard right */}
      <mesh position={[0.15, -0.1, -0.04]} rotation={[-0.3, 0.6, -0.5]}>
        <octahedronGeometry args={[0.09, 0]} />
        <meshStandardMaterial
          color="#2a1e06"
          emissive="#c8a857"
          emissiveIntensity={emissiveIntensity * 0.4}
          roughness={0.45}
          metalness={0.25}
          toneMapped={false}
        />
      </mesh>

      {/* Stone base */}
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.08, 6]} />
        <meshStandardMaterial
          color="#141218"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}
