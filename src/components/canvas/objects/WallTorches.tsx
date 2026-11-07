"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const noRaycast = () => null;

function makeFlameGeometry(count: number): THREE.BufferGeometry {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 0.06;
    positions[i * 3 + 1] = Math.random() * 0.3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geo;
}

interface TorchProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

function Torch({ position, rotation }: TorchProps) {
  const flameRef = useRef<THREE.Points>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const timeRef  = useRef(Math.random() * 100);

  const FLAME_COUNT = 30;
  const flameGeo = useMemo(() => makeFlameGeometry(FLAME_COUNT), []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    if (flameRef.current) {
      const pos = flameRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < FLAME_COUNT; i++) {
        pos[i * 3 + 1] += delta * 0.28;
        pos[i * 3]     += (Math.random() - 0.5) * delta * 0.04;
        if (pos[i * 3 + 1] > 0.32) {
          pos[i * 3]     = (Math.random() - 0.5) * 0.06;
          pos[i * 3 + 1] = 0;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
        }
      }
      flameRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (lightRef.current) {
      const flicker =
        Math.sin(t * 8.3)  * 0.4 +
        Math.sin(t * 17.1) * 0.2 +
        Math.sin(t * 34.6) * 0.1 +
        (Math.random() - 0.5) * 0.15;
      lightRef.current.intensity = Math.max(0.4, 1.8 + flicker);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Back plate on wall */}
      <mesh position={[0, 0, 0]} raycast={noRaycast}>
        <boxGeometry args={[0.16, 0.20, 0.04]} />
        <meshStandardMaterial color="#1e1c24" roughness={0.96} metalness={0.04}
          emissive="#0d0c14" emissiveIntensity={0.15} />
      </mesh>

      {/* Horizontal arm */}
      <mesh position={[0, 0, 0.14]} raycast={noRaycast}>
        <boxGeometry args={[0.04, 0.04, 0.28]} />
        <meshStandardMaterial color="#1a1820" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Bowl / cup */}
      <group position={[0, 0.04, 0.26]}>
        <mesh raycast={noRaycast}>
          <cylinderGeometry args={[0.055, 0.038, 0.08, 8]} />
          <meshStandardMaterial color="#1a1820" roughness={0.95} metalness={0.05} />
        </mesh>

        {/* Inner amber glow disc */}
        <mesh position={[0, 0.042, 0]} rotation={[-Math.PI / 2, 0, 0]} raycast={noRaycast}>
          <circleGeometry args={[0.042, 8]} />
          <meshStandardMaterial color="#c8a857" emissive="#c8a857"
            emissiveIntensity={1.4} toneMapped={false} />
        </mesh>

        {/* Flame particles */}
        <points ref={flameRef} geometry={flameGeo} position={[0, 0.05, 0]}>
          <pointsMaterial
            size={0.028}
            color="#e8923a"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            sizeAttenuation
          />
        </points>

        {/* Flickering point light */}
        <pointLight
          ref={lightRef}
          color="#c8a857"
          intensity={1.8}
          distance={7}
          decay={2}
          position={[0, 0.22, 0]}
        />
      </group>
    </group>
  );
}

export default function WallTorches() {
  return (
    <>
      <Torch position={[-3.85, 2.8, 0.2]} rotation={[0,  Math.PI / 2, 0]} />
      <Torch position={[ 3.85, 2.8, 0.2]} rotation={[0, -Math.PI / 2, 0]} />
    </>
  );
}
