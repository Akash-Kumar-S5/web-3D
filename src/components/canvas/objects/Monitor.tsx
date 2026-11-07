"use client";

/**
 * Soul Totem — Projects section (replaces Monitor).
 * A tall dark stone monolith with a glowing soul inscription.
 */

interface MonitorProps {
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  emissiveIntensity?: number;
}

export default function Monitor({
  onClick,
  onPointerOver,
  onPointerOut,
  emissiveIntensity = 0.15,
}: MonitorProps) {
  return (
    <group
      position={[0, 1.2, -0.3]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Main stone slab */}
      <mesh>
        <boxGeometry args={[1.0, 2.0, 0.1]} />
        <meshStandardMaterial
          color="#18161e"
          roughness={0.95}
          metalness={0.05}
          emissive="#b8ccff"
          emissiveIntensity={emissiveIntensity * 0.6}
        />
      </mesh>

      {/* Soul inscription area (glowing face) */}
      <mesh position={[0, 0.05, 0.051]}>
        <planeGeometry args={[0.75, 1.4]} />
        <meshStandardMaterial
          color="#020208"
          emissive="#6888bb"
          emissiveIntensity={emissiveIntensity * 0.7}
          roughness={0.98}
          metalness={0.0}
        />
      </mesh>

      {/* Faint rune lines on face */}
      {[0.35, 0.12, -0.12, -0.35].map((y, i) => (
        <mesh key={`rune-${i}`} position={[0, y + 0.05, 0.053]}>
          <boxGeometry args={[0.45 - i * 0.04, 0.006, 0.001]} />
          <meshStandardMaterial
            color="#b8ccff"
            emissive="#b8ccff"
            emissiveIntensity={emissiveIntensity * 0.8}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Amber corner rune accents */}
      {[
        { pos: [0, 1.02, 0.052] as [number,number,number], size: [1.02, 0.008, 0.001] as [number,number,number] },
        { pos: [0, -1.02, 0.052] as [number,number,number], size: [1.02, 0.008, 0.001] as [number,number,number] },
        { pos: [-0.51, 0, 0.052] as [number,number,number], size: [0.008, 2.04, 0.001] as [number,number,number] },
        { pos: [0.51, 0, 0.052] as [number,number,number], size: [0.008, 2.04, 0.001] as [number,number,number] },
      ].map((edge, i) => (
        <mesh key={i} position={edge.pos}>
          <boxGeometry args={edge.size} />
          <meshStandardMaterial
            color="#c8a857"
            emissive="#c8a857"
            emissiveIntensity={emissiveIntensity * 1.5}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Stone pedestal */}
      <mesh position={[0, -1.1, 0]}>
        <boxGeometry args={[0.55, 0.22, 0.28]} />
        <meshStandardMaterial
          color="#141218"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}
