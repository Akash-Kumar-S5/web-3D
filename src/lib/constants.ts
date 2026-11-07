import type { Section } from "@/stores/usePortfolioStore";

export const CAMERA_POSITIONS: Record<
  Section,
  { position: [number, number, number]; target: [number, number, number] }
> = {
  overview: {
    position: [0, 4, 8],
    target: [0, 1, 0],
  },
  projects: {
    position: [0, 1.8, 1.8],
    target: [0, 1.2, -0.5],
  },
  skills: {
    position: [-1.5, 1.8, 1],
    target: [-2.5, 1.5, -1],
  },
  about: {
    position: [1.8, 2.2, 0.5],
    target: [2.5, 2.0, -2],
  },
  contact: {
    position: [1.2, 1.2, 1.8],
    target: [1.5, 0.75, 0.5],
  },
};

export const CAMERA_TRANSITION_DURATION = 1.2; // seconds

export const NEON_COLORS = {
  cyan: "#00ffff",
  magenta: "#ff00ff",
  green: "#00ff88",
  blue: "#4444ff",
} as const;
