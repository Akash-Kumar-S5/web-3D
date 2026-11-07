"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { HalfFloatType } from "three";

export default function PostProcessing() {
  return (
    <EffectComposer
      multisampling={0}
      frameBufferType={HalfFloatType}
      enableNormalPass={false}
    >
      <Bloom
        intensity={2.8}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.85}
        mipmapBlur
      />
      <Vignette
        offset={0.25}
        darkness={0.92}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
