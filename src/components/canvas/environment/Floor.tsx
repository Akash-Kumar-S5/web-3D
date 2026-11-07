"use client";

import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";
import type { Texture } from "three";

const noRaycast = () => null;

const URLS = [
  "/textures/medieval_blocks_02_diff_1k.jpg",
  "/textures/medieval_blocks_02_nor_gl_1k.jpg",
  "/textures/medieval_blocks_02_rough_1k.jpg",
];

function FloorMesh() {
  const [diff, norm, rough] = useLoader(TextureLoader, URLS) as Texture[];
  for (const t of [diff, norm, rough]) {
    t.wrapS = t.wrapT = RepeatWrapping;
    t.repeat.set(5, 5);
  }
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} raycast={noRaycast}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial
        map={diff}
        normalMap={norm}
        roughnessMap={rough}
        color="#707088"
        metalness={0.05}
        roughness={0.97}
        emissive="#06050a"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
}

export default function Floor() {
  return <FloorMesh />;
}
