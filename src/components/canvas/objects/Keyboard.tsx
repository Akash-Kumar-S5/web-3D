"use client";

/**
 * Parchment & Quill — replaces stone keyboard.
 * Loads Quaternius parchment GLB with HK amber/pale materials.
 */

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/parchment.glb";

const parchmentMat = new THREE.MeshStandardMaterial({
  color: "#c8b888",
  roughness: 0.96,
  metalness: 0.0,
  emissive: new THREE.Color("#c8a857"),
  emissiveIntensity: 0.08,
});

function ParchmentModel() {
  const { scene } = useGLTF(MODEL_URL);

  const cloned = useMemo(() => {
    const c = scene.clone();
    c.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.material = parchmentMat;
        mesh.castShadow = false;
      }
    });
    return c;
  }, [scene]);

  return (
    <group position={[0.35, 0.80, 0.15]} rotation={[-0.1, 0.15, 0]}>
      <primitive
        object={cloned}
        scale={[0.25, 0.25, 0.25]}
        rotation={[0, 0.2, 0]}
      />
      {/* Amber ink lines on the parchment */}
      {[0.0, -0.015, -0.03, -0.045].map((z, i) => (
        <mesh key={i} position={[0, 0.006, z]}>
          <boxGeometry args={[0.18 - i * 0.02, 0.001, 0.003]} />
          <meshStandardMaterial
            color="#c8a857"
            emissive="#c8a857"
            emissiveIntensity={0.3}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export default function Keyboard() {
  return <ParchmentModel />;
}
