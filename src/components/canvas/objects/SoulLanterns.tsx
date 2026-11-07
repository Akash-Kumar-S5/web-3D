"use client";

/**
 * Hanging Soul Lanterns — cage lanterns on chains, HK aesthetic.
 * Positioned lower so they're clearly visible as hanging objects.
 */

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const noRaycast = () => null;

interface LanternProps {
  position: [number, number, number];
  swayOffset: number;
}

function SoulLantern({ position, swayOffset }: LanternProps) {
  const chainRef = useRef<THREE.Group>(null);
  const orbRef   = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime + swayOffset;

    // Pendulum sway
    if (chainRef.current) {
      chainRef.current.rotation.x = Math.sin(t * 0.4) * 0.05;
      chainRef.current.rotation.z = Math.sin(t * 0.3 + 1.0) * 0.03;
    }
    // Soul pulse on orb
    if (orbRef.current) {
      const mat = orbRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.0 + Math.sin(t * 1.1) * 0.3;
    }
    // Light flicker
    if (lightRef.current) {
      lightRef.current.intensity = 1.6 + Math.sin(t * 1.1 + 0.2) * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Ceiling anchor plate */}
      <mesh raycast={noRaycast}>
        <cylinderGeometry args={[0.08, 0.1, 0.06, 6]} />
        <meshStandardMaterial color="#1a1820" roughness={0.95} metalness={0.08} />
      </mesh>

      {/* Chain + cage assembly — swings as pendulum */}
      <group ref={chainRef}>
        {/* Chain rod (simple visible approach) */}
        <mesh position={[0, -0.4, 0]} raycast={noRaycast}>
          <cylinderGeometry args={[0.012, 0.012, 0.75, 4]} />
          <meshStandardMaterial color="#2a2830" roughness={0.85} metalness={0.15} />
        </mesh>

        {/* Chain link accents — spaced along the rod */}
        {[0.08, 0.24, 0.40, 0.56].map((offset, i) => (
          <mesh
            key={i}
            position={[0, -offset, 0]}
            rotation={[Math.PI / 2, 0, i % 2 === 0 ? 0 : Math.PI / 2]}
            raycast={noRaycast}
          >
            <torusGeometry args={[0.03, 0.008, 6, 8]} />
            <meshStandardMaterial color="#2a2830" roughness={0.85} metalness={0.15} />
          </mesh>
        ))}

        {/* Lantern cage group */}
        <group position={[0, -0.85, 0]}>
          {/* Top cap — dome */}
          <mesh position={[0, 0.2, 0]} raycast={noRaycast}>
            <sphereGeometry args={[0.16, 8, 4, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial
              color="#1e1c24"
              roughness={0.9}
              metalness={0.1}
              emissive="#c8a857"
              emissiveIntensity={0.05}
            />
          </mesh>

          {/* Horizontal cage rings */}
          {[-0.12, 0.02, 0.16].map((y, i) => (
            <mesh key={`ring-${i}`} position={[0, y, 0]} raycast={noRaycast}>
              <torusGeometry args={[0.16, 0.012, 8, 16]} />
              <meshStandardMaterial
                color="#1e1c24"
                roughness={0.88}
                metalness={0.1}
                emissive="#c8a857"
                emissiveIntensity={0.06}
              />
            </mesh>
          ))}

          {/* Vertical cage bars — 6 around the perimeter */}
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const angle = (idx / 6) * Math.PI * 2;
            return (
              <mesh
                key={`bar-${idx}`}
                position={[Math.sin(angle) * 0.15, 0.02, Math.cos(angle) * 0.15]}
                raycast={noRaycast}
              >
                <cylinderGeometry args={[0.008, 0.008, 0.35, 4]} />
                <meshStandardMaterial color="#1e1c24" roughness={0.88} metalness={0.1} />
              </mesh>
            );
          })}

          {/* Bottom cap plate */}
          <mesh position={[0, -0.16, 0]} raycast={noRaycast}>
            <cylinderGeometry args={[0.14, 0.1, 0.04, 8]} />
            <meshStandardMaterial color="#1e1c24" roughness={0.9} metalness={0.1} />
          </mesh>

          {/* Soul orb */}
          <mesh ref={orbRef} position={[0, 0.02, 0]} raycast={noRaycast}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#d0dfff"
              emissive="#b8ccff"
              emissiveIntensity={1.0}
              roughness={0.15}
              metalness={0.0}
              toneMapped={false}
            />
          </mesh>

          {/* Outer glow halo */}
          <mesh position={[0, 0.02, 0]} raycast={noRaycast}>
            <sphereGeometry args={[0.2, 12, 12]} />
            <meshBasicMaterial
              color="#b8ccff"
              transparent
              opacity={0.08}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.BackSide}
            />
          </mesh>

          {/* Soul-blue point light */}
          <pointLight
            ref={lightRef}
            color="#b8ccff"
            intensity={1.6}
            distance={7}
            decay={2}
            position={[0, 0, 0]}
          />
        </group>
      </group>
    </group>
  );
}

export default function SoulLanterns() {
  return (
    <>
      <SoulLantern position={[-2.0, 4.2, -1.5]} swayOffset={0} />
      <SoulLantern position={[ 2.0, 4.2, -1.5]} swayOffset={2.3} />
    </>
  );
}
