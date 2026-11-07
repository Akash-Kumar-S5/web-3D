"use client";

/**
 * Stone Throne — procedural HK underground seat.
 * Built from box/cylinder geometry; no external model needed.
 */

const STONE = { color: "#1a1820", roughness: 0.94, metalness: 0.05, emissive: "#0d0c14", emissiveIntensity: 0.15 } as const;
const AMBER = { color: "#c8a857", emissive: "#c8a857", emissiveIntensity: 0.25, roughness: 0.7, metalness: 0.1 } as const;

export default function Chair() {
  return (
    /* Whole throne offset so it sits behind the desk, slightly right */
    <group position={[0.1, 0, 1.55]} rotation={[0, -0.15, 0]}>

      {/* ── Seat ── */}
      <mesh position={[0, 0.46, 0]}>
        <boxGeometry args={[0.62, 0.07, 0.58]} />
        <meshStandardMaterial {...STONE} />
      </mesh>

      {/* ── Front legs ── */}
      <mesh position={[-0.26, 0.23, 0.22]}>
        <boxGeometry args={[0.07, 0.46, 0.07]} />
        <meshStandardMaterial {...STONE} />
      </mesh>
      <mesh position={[0.26, 0.23, 0.22]}>
        <boxGeometry args={[0.07, 0.46, 0.07]} />
        <meshStandardMaterial {...STONE} />
      </mesh>

      {/* ── Back legs (taller — form throne back uprights) ── */}
      <mesh position={[-0.26, 0.75, -0.22]}>
        <boxGeometry args={[0.07, 1.5, 0.07]} />
        <meshStandardMaterial {...STONE} />
      </mesh>
      <mesh position={[0.26, 0.75, -0.22]}>
        <boxGeometry args={[0.07, 1.5, 0.07]} />
        <meshStandardMaterial {...STONE} />
      </mesh>

      {/* ── Back panel (slab between uprights) ── */}
      <mesh position={[0, 0.88, -0.225]}>
        <boxGeometry args={[0.46, 0.76, 0.055]} />
        <meshStandardMaterial {...STONE} />
      </mesh>

      {/* ── Top crossbar with amber inlay ── */}
      <mesh position={[0, 1.46, -0.22]}>
        <boxGeometry args={[0.62, 0.09, 0.07]} />
        <meshStandardMaterial {...STONE} />
      </mesh>
      {/* Amber rune strip on crossbar */}
      <mesh position={[0, 1.465, -0.19]}>
        <boxGeometry args={[0.38, 0.018, 0.006]} />
        <meshStandardMaterial {...AMBER} toneMapped={false} />
      </mesh>

      {/* ── Crown finials (small pyramids on top of back legs) ── */}
      <mesh position={[-0.26, 1.515, -0.22]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.055, 0.09, 4]} />
        <meshStandardMaterial {...STONE} />
      </mesh>
      <mesh position={[0.26, 1.515, -0.22]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.055, 0.09, 4]} />
        <meshStandardMaterial {...STONE} />
      </mesh>

      {/* ── Armrests ── */}
      <mesh position={[-0.315, 0.62, 0.02]}>
        <boxGeometry args={[0.055, 0.04, 0.46]} />
        <meshStandardMaterial {...STONE} />
      </mesh>
      <mesh position={[0.315, 0.62, 0.02]}>
        <boxGeometry args={[0.055, 0.04, 0.46]} />
        <meshStandardMaterial {...STONE} />
      </mesh>

      {/* ── Base plinth ── */}
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[0.72, 0.07, 0.66]} />
        <meshStandardMaterial {...STONE} />
      </mesh>
    </group>
  );
}
