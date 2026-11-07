"use client";

export default function Lighting() {
  return (
    <>
      {/* Near-dark void ambient */}
      <ambientLight color="#080608" intensity={0.2} />

      {/* Main soul lamp — pale blue overhead */}
      <pointLight
        color="#b8ccff"
        intensity={3}
        position={[0, 4, 2]}
        distance={14}
        decay={2}
      />

      {/* Left amber torch */}
      <pointLight
        color="#c8a857"
        intensity={1.5}
        position={[-2.5, 3, 0]}
        distance={9}
        decay={2}
      />

      {/* Right amber torch */}
      <pointLight
        color="#c8a857"
        intensity={1.0}
        position={[2.5, 3, 0]}
        distance={8}
        decay={2}
      />

      {/* Pale white fill — front */}
      <pointLight
        color="#e8e4df"
        intensity={1.2}
        position={[0, 2, 3]}
        distance={8}
        decay={2}
      />

      {/* Soul overhead spot */}
      <spotLight
        color="#b8ccff"
        intensity={2.5}
        position={[0, 7, 1]}
        angle={Math.PI / 4}
        penumbra={0.7}
        distance={18}
        decay={2}
      />
    </>
  );
}
