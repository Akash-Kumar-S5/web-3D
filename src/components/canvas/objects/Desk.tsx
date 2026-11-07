"use client";

/**
 * Stone Table — ambient workspace surface (replaces procedural Desk).
 * Loads Quaternius desk GLB, overrides materials to HK stone palette.
 */

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/table.glb";

const stoneMat = new THREE.MeshStandardMaterial({
  color: "#1a1820",
  roughness: 0.94,
  metalness: 0.05,
  emissive: new THREE.Color("#0d0c14"),
  emissiveIntensity: 0.15,
});

function TableModel() {
  const { scene } = useGLTF(MODEL_URL);

  const cloned = useMemo(() => {
    const c = scene.clone();
    c.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.material = stoneMat;
        mesh.castShadow = false;
      }
    });
    return c;
  }, [scene]);

  return (
    <group position={[0, -0.05, 0]}>
      <primitive
        object={cloned}
        scale={[0.8, 0.8, 0.8]}
        position={[0, 0, 0]}
      />
      {/* Amber trim line at front edge */}
      <mesh position={[0, 0.74, 0.32]}>
        <boxGeometry args={[1.46, 0.006, 0.006]} />
        <meshStandardMaterial
          color="#c8a857"
          emissive="#c8a857"
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export default function Desk() {
  return <TableModel />;
}
