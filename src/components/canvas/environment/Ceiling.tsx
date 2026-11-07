"use client";

import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";
import type { Texture } from "three";

const noRaycast = () => null;

const CEIL_URLS = [
  "/textures/castle_brick_01_diff_1k.jpg",
  "/textures/castle_brick_01_nor_gl_1k.jpg",
  "/textures/castle_brick_01_rough_1k.jpg",
];

const STALACTITES: { x: number; z: number; h: number; r: number }[] = [
  { x: -1.2, z: -2.4, h: 0.55, r: 0.08 },
  { x:  1.4, z: -2.6, h: 0.40, r: 0.06 },
  { x: -3.0, z: -0.8, h: 0.65, r: 0.07 },
  { x:  3.1, z: -1.2, h: 0.50, r: 0.07 },
  { x:  0.3, z: -1.8, h: 0.35, r: 0.05 },
  { x: -0.8, z:  1.0, h: 0.42, r: 0.06 },
];

function CeilingMesh() {
  const [diff, norm, rough] = useLoader(TextureLoader, CEIL_URLS) as Texture[];

  for (const tex of [diff, norm, rough]) {
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(4, 3);
  }

  return (
    <group>
      {/* Main ceiling plane — faces downward */}
      <mesh position={[0, 5.0, 0]} rotation={[Math.PI / 2, 0, 0]} raycast={noRaycast}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          map={diff}
          normalMap={norm}
          roughnessMap={rough}
          metalness={0.02}
        />
      </mesh>

      {/* Perimeter trim — back wall */}
      <mesh position={[0, 4.94, -2.96]} raycast={noRaycast}>
        <boxGeometry args={[12, 0.12, 0.06]} />
        <meshStandardMaterial color="#1a1820" roughness={0.96} metalness={0.04}
          emissive="#0d0c14" emissiveIntensity={0.18} />
      </mesh>
      {/* Perimeter trim — left wall */}
      <mesh position={[-3.97, 4.94, 0]} rotation={[0, Math.PI / 2, 0]} raycast={noRaycast}>
        <boxGeometry args={[8, 0.12, 0.06]} />
        <meshStandardMaterial color="#1a1820" roughness={0.96} metalness={0.04}
          emissive="#0d0c14" emissiveIntensity={0.15} />
      </mesh>
      {/* Perimeter trim — right wall */}
      <mesh position={[3.97, 4.94, 0]} rotation={[0, -Math.PI / 2, 0]} raycast={noRaycast}>
        <boxGeometry args={[8, 0.12, 0.06]} />
        <meshStandardMaterial color="#1a1820" roughness={0.96} metalness={0.04}
          emissive="#0d0c14" emissiveIntensity={0.15} />
      </mesh>

      {/* Stalactites — cones pointing downward */}
      {STALACTITES.map((s, i) => (
        <mesh
          key={i}
          position={[s.x, 5.0 - s.h / 2, s.z]}
          rotation={[Math.PI, 0, 0]}
          raycast={noRaycast}
        >
          <coneGeometry args={[s.r, s.h, 6]} />
          <meshStandardMaterial
            color="#121018"
            roughness={0.97}
            metalness={0.03}
            emissive="#0a0810"
            emissiveIntensity={0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Ceiling() {
  return <CeilingMesh />;
}
