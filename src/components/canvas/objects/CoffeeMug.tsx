"use client";

/**
 * Stone Candle — replaces CoffeeMug in the HK underground chamber.
 * A thick stone candle on a carved base, with animated flame particles.
 */

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const FLAME_COUNT = 20;

function makeFlameGeo(): THREE.BufferGeometry {
  const positions = new Float32Array(FLAME_COUNT * 3);
  for (let i = 0; i < FLAME_COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 0.04;
    positions[i * 3 + 1] = Math.random() * 0.18;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geo;
}

export default function CoffeeMug() {
  const flameRef  = useRef<THREE.Points>(null);
  const lightRef  = useRef<THREE.PointLight>(null);
  const timeRef   = useRef(Math.random() * 100);
  const flameGeo  = useMemo(() => makeFlameGeo(), []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    if (flameRef.current) {
      const pos = flameRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < FLAME_COUNT; i++) {
        pos[i * 3 + 1] += delta * 0.22;
        pos[i * 3]     += (Math.random() - 0.5) * delta * 0.03;
        if (pos[i * 3 + 1] > 0.2) {
          pos[i * 3]     = (Math.random() - 0.5) * 0.04;
          pos[i * 3 + 1] = 0;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
        }
      }
      flameRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (lightRef.current) {
      lightRef.current.intensity = Math.max(
        0.3,
        0.9 + Math.sin(t * 9.1) * 0.25 + Math.sin(t * 19.3) * 0.1 + (Math.random() - 0.5) * 0.08
      );
    }
  });

  return (
    <group position={[0.9, 0.72, 0.35]}>
      {/* Candle base — carved stone disc */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.085, 0.075, 0.04, 8]} />
        <meshStandardMaterial color="#1e1c24" roughness={0.95} metalness={0.05}
          emissive="#0d0c14" emissiveIntensity={0.15} />
      </mesh>

      {/* Candle body */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.038, 0.042, 0.18, 10]} />
        <meshStandardMaterial color="#e8e4df" roughness={0.85} metalness={0.0}
          emissive="#c8a857" emissiveIntensity={0.06} />
      </mesh>

      {/* Melted wax drips (offset spheres) */}
      {[[0.03, 0.12, 0.02], [-0.025, 0.10, 0.03], [0.01, 0.11, -0.035]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.012, 6, 6]} />
          <meshStandardMaterial color="#e0dcd6" roughness={0.88} metalness={0.0} />
        </mesh>
      ))}

      {/* Wick */}
      <mesh position={[0, 0.175, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.016, 4]} />
        <meshStandardMaterial color="#141218" />
      </mesh>

      {/* Flame particles */}
      <points ref={flameRef} geometry={flameGeo} position={[0, 0.18, 0]}>
        <pointsMaterial
          size={0.022}
          color="#e8923a"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Candle glow emissive top */}
      <mesh position={[0, 0.172, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.032, 8]} />
        <meshStandardMaterial color="#c8a857" emissive="#c8a857"
          emissiveIntensity={1.2} toneMapped={false} />
      </mesh>

      {/* Flickering ambient light */}
      <pointLight
        ref={lightRef}
        color="#c8a857"
        intensity={0.9}
        distance={3.5}
        decay={2}
        position={[0, 0.28, 0]}
      />
    </group>
  );
}
