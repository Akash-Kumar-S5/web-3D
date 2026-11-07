"use client";

/**
 * Soul Mushrooms — replaces Plant in the HK underground chamber.
 * Bioluminescent fungal growths from Hallownest's depths.
 * Caps glow with pale soul-blue light; stems are dark stone.
 */

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const MUSHROOMS: {
  x: number; z: number; capR: number; stemH: number; phase: number;
}[] = [
  { x: 0,     z: 0,     capR: 0.07, stemH: 0.18, phase: 0 },
  { x: 0.12,  z: 0.05,  capR: 0.055, stemH: 0.14, phase: 1.4 },
  { x: -0.10, z: 0.07,  capR: 0.045, stemH: 0.11, phase: 2.8 },
  { x: 0.04,  z: -0.10, capR: 0.035, stemH: 0.09, phase: 0.7 },
  { x: -0.06, z: -0.05, capR: 0.03, stemH: 0.07, phase: 2.1 },
];

export default function Plant() {
  const groupRef = useRef<THREE.Group>(null);
  const capRefs  = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Gentle sway of entire cluster
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.018;
      groupRef.current.rotation.x = Math.sin(t * 0.3 + 0.5) * 0.010;
    }

    // Gentle soul pulse per cap — much subtler
    capRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity =
        0.3 + Math.sin(t * 1.2 + MUSHROOMS[i].phase) * 0.12;
    });
  });

  return (
    <group ref={groupRef} position={[-1.0, 0.68, 0.4]}>
      {/* Stone pot base */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.1, 0.075, 0.12, 7]} />
        <meshStandardMaterial color="#1e1c24" roughness={0.94} metalness={0.05}
          emissive="#0d0c14" emissiveIntensity={0.15} />
      </mesh>
      {/* Soil disc */}
      <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.092, 7]} />
        <meshStandardMaterial color="#100e12" roughness={0.98} />
      </mesh>

      {/* Mushrooms */}
      {MUSHROOMS.map((m, i) => (
        <group key={i} position={[m.x, 0, m.z]}>
          {/* Stem */}
          <mesh position={[0, m.stemH / 2, 0]}>
            <cylinderGeometry args={[0.012, 0.016, m.stemH, 6]} />
            <meshStandardMaterial color="#1a1820" roughness={0.96} metalness={0.04} />
          </mesh>

          {/* Cap — soul-blue bioluminescent */}
          <mesh
            ref={(el) => { capRefs.current[i] = el; }}
            position={[0, m.stemH + m.capR * 0.4, 0]}
          >
            <sphereGeometry args={[m.capR, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial
              color="#2a3848"
              emissive="#7098cc"
              emissiveIntensity={0.3}
              roughness={0.75}
              metalness={0.0}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Underside glow disc */}
          <mesh
            position={[0, m.stemH + 0.005, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <circleGeometry args={[m.capR * 0.7, 8]} />
            <meshStandardMaterial
              color="#6888aa"
              emissive="#b8ccff"
              emissiveIntensity={0.2}
              transparent
              opacity={0.45}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {/* Ambient soul glow from cluster */}
      <pointLight color="#b8ccff" intensity={0.25} distance={1.2} decay={2} position={[0, 0.2, 0]} />
    </group>
  );
}
