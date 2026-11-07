"use client";

import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";
import type { Texture } from "three";

const noRaycast = () => null;

const BACK_URLS = [
  "/textures/rock_wall_08_diff_1k.jpg",
  "/textures/rock_wall_08_nor_gl_1k.jpg",
  "/textures/rock_wall_08_rough_1k.jpg",
];

const SIDE_URLS = [
  "/textures/rock_wall_02_diff_1k.jpg",
  "/textures/rock_wall_02_nor_gl_1k.jpg",
  "/textures/rock_wall_02_rough_1k.jpg",
];

function WallMeshes() {
  const [backDiff, backNorm, backRough] = useLoader(TextureLoader, BACK_URLS) as Texture[];
  const [sideDiff, sideNorm, sideRough] = useLoader(TextureLoader, SIDE_URLS) as Texture[];

  for (const tex of [backDiff, backNorm, backRough]) {
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(3, 2);
  }
  for (const tex of [sideDiff, sideNorm, sideRough]) {
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(2.5, 2);
  }

  return (
    <>
      {/* === BACK WALL === */}
      <mesh position={[0, 2, -3]} raycast={noRaycast}>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial
          map={backDiff}
          normalMap={backNorm}
          roughnessMap={backRough}
          metalness={0.03}
        />
      </mesh>

      {/* Back wall arch frame over Monitor */}
      {/* Top lintel */}
      <mesh position={[0, 4.1, -2.96]} raycast={noRaycast}>
        <boxGeometry args={[2.6, 0.12, 0.04]} />
        <meshStandardMaterial color="#1e1c24" roughness={0.96} metalness={0.04}
          emissive="#0d0c14" emissiveIntensity={0.2} />
      </mesh>
      {/* Left upright */}
      <mesh position={[-1.3, 2.8, -2.96]} raycast={noRaycast}>
        <boxGeometry args={[0.12, 2.6, 0.04]} />
        <meshStandardMaterial color="#1e1c24" roughness={0.96} metalness={0.04}
          emissive="#0d0c14" emissiveIntensity={0.2} />
      </mesh>
      {/* Right upright */}
      <mesh position={[1.3, 2.8, -2.96]} raycast={noRaycast}>
        <boxGeometry args={[0.12, 2.6, 0.04]} />
        <meshStandardMaterial color="#1e1c24" roughness={0.96} metalness={0.04}
          emissive="#0d0c14" emissiveIntensity={0.2} />
      </mesh>
      {/* Amber diamond keystone */}
      <mesh position={[0, 4.12, -2.95]} rotation={[0, 0, Math.PI / 4]} raycast={noRaycast}>
        <boxGeometry args={[0.14, 0.14, 0.04]} />
        <meshStandardMaterial color="#c8a857" emissive="#c8a857"
          emissiveIntensity={0.35} toneMapped={false} />
      </mesh>
      {/* Amber accent strip at arch base */}
      <mesh position={[0, 1.5, -2.95]} raycast={noRaycast}>
        <boxGeometry args={[2.6, 0.007, 0.007]} />
        <meshStandardMaterial color="#c8a857" emissive="#c8a857"
          emissiveIntensity={0.5} toneMapped={false} />
      </mesh>

      {/* === LEFT WALL === */}
      <mesh position={[-4, 2, 0]} rotation={[0, Math.PI / 2, 0]} raycast={noRaycast}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial
          map={sideDiff}
          normalMap={sideNorm}
          roughnessMap={sideRough}
          metalness={0.03}
        />
      </mesh>
      {/* Left wall amber base trim */}
      <mesh position={[-3.97, 0.04, 0]} rotation={[0, Math.PI / 2, 0]} raycast={noRaycast}>
        <boxGeometry args={[8, 0.07, 0.04]} />
        <meshStandardMaterial color="#1a1820" roughness={0.96} metalness={0.04}
          emissive="#c8a857" emissiveIntensity={0.1} />
      </mesh>

      {/* === RIGHT WALL === */}
      <mesh position={[4, 2, 0]} rotation={[0, -Math.PI / 2, 0]} raycast={noRaycast}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial
          map={sideDiff}
          normalMap={sideNorm}
          roughnessMap={sideRough}
          metalness={0.03}
        />
      </mesh>
      {/* Right wall amber base trim */}
      <mesh position={[3.97, 0.04, 0]} rotation={[0, -Math.PI / 2, 0]} raycast={noRaycast}>
        <boxGeometry args={[8, 0.07, 0.04]} />
        <meshStandardMaterial color="#1a1820" roughness={0.96} metalness={0.04}
          emissive="#c8a857" emissiveIntensity={0.1} />
      </mesh>
    </>
  );
}

export default function Walls() {
  return <WallMeshes />;
}
