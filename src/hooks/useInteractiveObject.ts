import { useState, useCallback } from "react";
import { usePortfolioStore, type Section } from "@/stores/usePortfolioStore";

export function useInteractiveObject(section: Section) {
  const [hovered, setHovered] = useState(false);
  const cameraState = usePortfolioStore((s) => s.cameraState);
  const setActiveSection = usePortfolioStore((s) => s.setActiveSection);
  const setCameraState = usePortfolioStore((s) => s.setCameraState);

  const isClickable = cameraState === "overview";

  const onClick = useCallback(() => {
    if (!isClickable) return;
    setActiveSection(section);
    setCameraState("flying");
  }, [isClickable, section, setActiveSection, setCameraState]);

  const onPointerOver = useCallback(() => {
    if (!isClickable) return;
    setHovered(true);
    document.body.style.cursor = "pointer";
  }, [isClickable]);

  const onPointerOut = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = "default";
  }, []);

  return {
    hovered,
    onClick,
    onPointerOver,
    onPointerOut,
    emissiveIntensity: hovered ? 0.8 : 0.3,
  };
}
