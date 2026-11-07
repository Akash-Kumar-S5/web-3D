"use client";

/**
 * Stone Tablet Wall — Skills section (replaces Bookshelf).
 * Carved stone slabs stacked on ancient shelves.
 */

import { useRef, useMemo } from "react";
import * as THREE from "three";

// HK tablet colors — mix of soul blue, amber, fog, dim, stone shades
const TABLET_COLORS = [
  "#1c2030", // deep blue-stone
  "#2a2218", // warm amber-stone
  "#1a2228", // fog-stone
  "#241c2a", // void purple
  "#22281c", // mossy dark
  "#2c2420", // warm brown-stone
  "#182028", // cool deep
  "#28201a", // earth tone
];

interface BookshelfProps {
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  emissiveIntensity?: number;
}

interface TabletData {
  height: number;
  width: number;
  color: string;
  xPos: number;
  yPos: number;
}

export default function Bookshelf({
  onClick,
  onPointerOver,
  onPointerOut,
  emissiveIntensity = 0.15,
}: BookshelfProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shelves = [0, 0.5, 1.0];

  const tabletsByShelf = useMemo(() => {
    const result: TabletData[][] = [];
    for (let shelfIdx = 0; shelfIdx < 3; shelfIdx++) {
      const shelfY = shelves[shelfIdx];
      const tablets: TabletData[] = [];
      const count = 4 + (shelfIdx % 2);
      for (let tIdx = 0; tIdx < count; tIdx++) {
        const height = 0.24 + ((shelfIdx * 7 + tIdx * 13) % 10) * 0.02;
        const width = 0.08 + ((shelfIdx * 3 + tIdx * 7) % 10) * 0.006;
        tablets.push({
          height,
          width,
          color: TABLET_COLORS[(shelfIdx * 3 + tIdx * 2) % TABLET_COLORS.length],
          xPos: -0.35 + tIdx * 0.17,
          yPos: shelfY + 0.02 + height / 2,
        });
      }
      result.push(tablets);
    }
    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <group
      ref={groupRef}
      position={[-2.5, 1.0, -1.8]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Back panel — ancient stone */}
      <mesh position={[0, 0.75, -0.1]}>
        <boxGeometry args={[1.2, 1.6, 0.04]} />
        <meshStandardMaterial
          color="#141218"
          metalness={0.05}
          roughness={0.95}
          emissive="#0d0c14"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Side panels */}
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.75, 0]}>
          <boxGeometry args={[0.04, 1.6, 0.25]} />
          <meshStandardMaterial
            color="#181520"
            metalness={0.05}
            roughness={0.95}
          />
        </mesh>
      ))}

      {/* Shelves and stone tablets */}
      {shelves.map((shelfY, shelfIdx) => (
        <group key={shelfIdx}>
          {/* Shelf slab */}
          <mesh position={[0, shelfY, 0]}>
            <boxGeometry args={[1.2, 0.03, 0.25]} />
            <meshStandardMaterial
              color="#1a1820"
              metalness={0.05}
              roughness={0.95}
              emissive="#c8a857"
              emissiveIntensity={0.08}
            />
          </mesh>

          {/* Stone tablets */}
          {tabletsByShelf[shelfIdx].map((tablet, tIdx) => (
            <mesh key={tIdx} position={[tablet.xPos, tablet.yPos, 0.02]}>
              <boxGeometry args={[tablet.width, tablet.height, 0.15]} />
              <meshStandardMaterial
                color={tablet.color}
                emissive={tIdx % 2 === 0 ? "#6880a0" : "#a08848"}
                emissiveIntensity={emissiveIntensity * 0.3}
                metalness={0.03}
                roughness={0.95}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Amber soul strip along top */}
      <mesh position={[0, 1.56, 0.05]}>
        <boxGeometry args={[1.2, 0.008, 0.008]} />
        <meshStandardMaterial
          color="#c8a857"
          emissive="#c8a857"
          emissiveIntensity={emissiveIntensity * 3}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
