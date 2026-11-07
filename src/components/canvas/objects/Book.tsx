"use client";

/**
 * Ancient Book — Projects section (replaces Monitor/Soul Totem).
 * Loads Evil Book GLB from Quaternius, applies HK stone + soul-blue materials.
 */

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/book.glb";

const coverMat = new THREE.MeshStandardMaterial({
  color: "#1e1c24",
  roughness: 0.92,
  metalness: 0.05,
  emissive: new THREE.Color("#b8ccff"),
  emissiveIntensity: 0.1,
});

const pageMat = new THREE.MeshStandardMaterial({
  color: "#d8d0c4",
  roughness: 0.95,
  metalness: 0.0,
  emissive: new THREE.Color("#b8ccff"),
  emissiveIntensity: 0.05,
});

interface BookProps {
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  emissiveIntensity?: number;
}

function BookModel({
  onClick,
  onPointerOver,
  onPointerOut,
  emissiveIntensity = 0.15,
}: BookProps) {
  const { scene } = useGLTF(MODEL_URL);

  const cloned = useMemo(() => {
    const c = scene.clone();
    c.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        // Lighter-colored parts get page material, rest get cover
        const isPage =
          mat.color && mat.color.r > 0.5 && mat.color.g > 0.5;
        const baseMat = isPage ? pageMat.clone() : coverMat.clone();
        baseMat.emissiveIntensity = emissiveIntensity * (isPage ? 0.3 : 0.7);
        mesh.material = baseMat;
        mesh.castShadow = false;
      }
    });
    return c;
  }, [scene, emissiveIntensity]);

  return (
    <group
      position={[0, 0.69, -0.1]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <primitive
        object={cloned}
        scale={[0.13, 0.13, 0.13]}
        rotation={[0, 0.3, 0]}
      />
      {/* Subtle soul glow from the book */}
      <pointLight
        color="#b8ccff"
        intensity={0.3}
        distance={2}
        decay={2}
        position={[0, 0.15, 0]}
      />
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export default function Book(props: BookProps) {
  return <BookModel {...props} />;
}
