"use client";

import { useMemo } from "react";
import * as THREE from "three";

const noRaycast = () => null;

const PILLAR_HEIGHT = 5.0;
const RADIUS = 0.22;

const POSITIONS: [number, number, number][] = [
  [-3.2, 0, 2.5],
  [ 3.2, 0, 2.5],
  [-3.2, 0, -2.0],
  [ 3.2, 0, -2.0],
];

function makePillarTexture(): THREE.CanvasTexture {
  if (typeof window === "undefined") {
    return new THREE.CanvasTexture(document.createElement("canvas"));
  }
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#141218";
  ctx.fillRect(0, 0, 128, 512);
  // Horizontal stone course lines every 64px
  ctx.fillStyle = "#0a0810";
  for (let y = 0; y < 512; y += 64) {
    ctx.fillRect(0, y, 128, 2);
  }
  // Subtle surface variation
  for (let y = 0; y < 512; y += 8) {
    const v = Math.floor(Math.random() * 8);
    ctx.fillStyle = `rgba(0,0,0,${v / 255})`;
    ctx.fillRect(0, y, 128, 8);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export default function Pillars() {
  const pillarTex = useMemo(() => makePillarTexture(), []);

  return (
    <group raycast={noRaycast}>
      {POSITIONS.map(([x, , z], i) => (
        <group key={i} position={[x, PILLAR_HEIGHT / 2, z]}>
          {/* Hexagonal shaft */}
          <mesh>
            <cylinderGeometry args={[RADIUS, RADIUS * 1.05, PILLAR_HEIGHT, 6]} />
            <meshStandardMaterial
              map={pillarTex}
              roughness={0.95}
              metalness={0.04}
            />
          </mesh>

          {/* Capital (top) */}
          <mesh position={[0, PILLAR_HEIGHT / 2 - 0.06, 0]}>
            <cylinderGeometry args={[RADIUS * 1.35, RADIUS * 1.2, 0.12, 6]} />
            <meshStandardMaterial color="#1a1820" roughness={0.96} metalness={0.04}
              emissive="#0d0c14" emissiveIntensity={0.15} />
          </mesh>

          {/* Base plinth */}
          <mesh position={[0, -PILLAR_HEIGHT / 2 + 0.08, 0]}>
            <boxGeometry args={[RADIUS * 2.8, 0.16, RADIUS * 2.8]} />
            <meshStandardMaterial color="#1a1820" roughness={0.96} metalness={0.04} />
          </mesh>

          {/* Amber accent ring at capital */}
          <mesh position={[0, PILLAR_HEIGHT / 2 - 0.12, 0]}>
            <torusGeometry args={[RADIUS * 1.2, 0.008, 8, 6]} />
            <meshStandardMaterial
              color="#c8a857"
              emissive="#c8a857"
              emissiveIntensity={0.4}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
