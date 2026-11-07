"use client";

import { Sparkles } from "@react-three/drei";

export default function Particles() {
  return (
    <>
      {/* Mid-air soul dust — primary layer */}
      <Sparkles
        count={80}
        scale={[8, 4, 6]}
        size={1.2}
        speed={0.08}
        opacity={0.35}
        color="#b8ccff"
        noise={0.5}
      />

      {/* Ceiling haze — concentrated soul motes near top */}
      <Sparkles
        count={40}
        scale={[6, 2, 4]}
        size={0.8}
        speed={0.04}
        opacity={0.2}
        color="#b8ccff"
        noise={0.3}
        position={[0, 3.5, 0]}
      />

      {/* Floor geo-dust — amber, sparse, low */}
      <Sparkles
        count={30}
        scale={[7, 1.5, 5]}
        size={0.9}
        speed={0.06}
        opacity={0.18}
        color="#c8a857"
        noise={0.6}
        position={[0, 0.5, 0]}
      />
    </>
  );
}
