"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { CAMERA_POSITIONS, CAMERA_TRANSITION_DURATION } from "@/lib/constants";
import { easeInOutCubic } from "@/lib/utils";

export default function CameraRig() {
  const { camera } = useThree();

  const transitionProgress = useRef(0);
  const startPos = useRef(new THREE.Vector3());
  const startTarget = useRef(new THREE.Vector3());
  const endPos = useRef(new THREE.Vector3());
  const endTarget = useRef(new THREE.Vector3());
  const currentTarget = useRef(new THREE.Vector3(0, 1, 0));
  const isTransitioning = useRef(false);
  const currentCameraState = useRef("overview");

  // Subscribe to store changes outside of useFrame to avoid stale closures
  useEffect(() => {
    const unsub = usePortfolioStore.subscribe((state, prevState) => {
      if (state.activeSection !== prevState.activeSection) {
        // Section changed — start a camera transition
        transitionProgress.current = 0;
        isTransitioning.current = true;

        startPos.current.copy(camera.position);
        startTarget.current.copy(currentTarget.current);

        const target = CAMERA_POSITIONS[state.activeSection];
        endPos.current.set(...target.position);
        endTarget.current.set(...target.target);
      }
      currentCameraState.current = state.cameraState;
    });
    return unsub;
  }, [camera]);

  useFrame((_, delta) => {
    const cameraState = currentCameraState.current;

    if (
      isTransitioning.current &&
      (cameraState === "flying" || cameraState === "returning")
    ) {
      transitionProgress.current += delta / CAMERA_TRANSITION_DURATION;
      const t = Math.min(transitionProgress.current, 1);
      const eased = easeInOutCubic(t);

      camera.position.lerpVectors(startPos.current, endPos.current, eased);
      currentTarget.current.lerpVectors(
        startTarget.current,
        endTarget.current,
        eased
      );
      camera.lookAt(currentTarget.current);

      if (t >= 1) {
        isTransitioning.current = false;
        const store = usePortfolioStore.getState();
        if (cameraState === "flying") {
          store.setCameraState("focused");
          store.setUIVisible(true);
        } else if (cameraState === "returning") {
          store.setCameraState("overview");
        }
      }
    }

    // Subtle idle sway in overview mode
    if (cameraState === "overview" && !isTransitioning.current) {
      const time = Date.now() * 0.0003;
      camera.position.x = Math.sin(time) * 0.15;
      camera.position.y = 4 + Math.sin(time * 0.7) * 0.08;
      camera.lookAt(currentTarget.current);
    }
  });

  return null;
}
