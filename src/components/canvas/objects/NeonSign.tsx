"use client";

/**
 * Soul Inscription — replaces NeonSign.
 * Hollow Knight: The Pale King's mark on stone.
 * Text rendered with Drei <Text>, no external font file needed.
 */

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

export default function NeonSign() {
  const titleRef = useRef<THREE.Mesh>(null);
  const subtitleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Subtle soul-pulse (0.25 – 0.45 range, very gentle)
    const t = state.clock.elapsedTime;
    const pulse = 0.35 + Math.sin(t * 0.9) * 0.1;
    if (titleRef.current) {
      (titleRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
    if (subtitleRef.current) {
      (subtitleRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        pulse * 0.8;
    }
  });

  return (
    <group position={[0, 3.2, -2.8]}>
      {/* Stone backing panel */}
      <mesh position={[0, -0.08, -0.04]}>
        <planeGeometry args={[3.2, 0.9]} />
        <meshStandardMaterial
          color="#12101a"
          roughness={0.95}
          metalness={0.05}
          emissive="#0d0c14"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Amber border lines */}
      {[
        { pos: [0, 0.42, -0.03] as [number,number,number], size: [3.22, 0.008, 0.001] as [number,number,number] },
        { pos: [0, -0.56, -0.03] as [number,number,number], size: [3.22, 0.008, 0.001] as [number,number,number] },
        { pos: [-1.61, -0.07, -0.03] as [number,number,number], size: [0.008, 1.0, 0.001] as [number,number,number] },
        { pos: [1.61, -0.07, -0.03] as [number,number,number], size: [0.008, 1.0, 0.001] as [number,number,number] },
      ].map((edge, i) => (
        <mesh key={i} position={edge.pos}>
          <boxGeometry args={edge.size} />
          <meshStandardMaterial
            color="#c8a857"
            emissive="#c8a857"
            emissiveIntensity={0.4}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Primary inscription — "AKASH KUMAR" */}
      <Text
        ref={titleRef}
        fontSize={0.28}
        letterSpacing={0.22}
        anchorX="center"
        anchorY="middle"
        position={[0, 0.12, 0]}
      >
        AKASH KUMAR
        <meshStandardMaterial
          color="#e8e4df"
          emissive="#e8e4df"
          emissiveIntensity={0.35}
          toneMapped={false}
        />
      </Text>

      {/* Secondary inscription — "FULL-STACK DEVELOPER" */}
      <Text
        ref={subtitleRef}
        fontSize={0.1}
        letterSpacing={0.35}
        anchorX="center"
        anchorY="middle"
        position={[0, -0.22, 0]}
      >
        FULL-STACK DEVELOPER
        <meshStandardMaterial
          color="#c8a857"
          emissive="#c8a857"
          emissiveIntensity={0.28}
          toneMapped={false}
        />
      </Text>
    </group>
  );
}
