"use client";

/**
 * SpaceScene — Hollow Knight: The Abyss
 *
 * The visitor arrives in a pure-black void (The Abyss from Hollow Knight).
 * Pale soul wisps drift upward. The Knight silhouette wanders between
 * random positions. Clicking the Knight opens the door to the kingdom.
 *
 * Knight SVG: hexmos.com (free) — 3-path stroke icon, CC licensed.
 * Fonts: Cinzel (Google Fonts, OFL) via CSS variable.
 * Soul wisps: pure CSS animation — no external assets.
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

/* ── Deterministic wisp generator (no Math.random in render) ── */
function useWisps(count: number) {
  return useMemo(() => {
    let s = 98765;
    const rng = () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 0xffffffff;
    };
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rng() * 100,
      y: rng() * 100,
      size: rng() * 8 + 4,
      dur: rng() * 7 + 6,
      delay: rng() * 8,
      opacity: rng() * 0.4 + 0.25,
    }));
  }, [count]);
}

/* ── Knight silhouette SVG (hexmos.com, free, stroke-based) ─── */
function KnightSVG({ glow }: { glow: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="88"
      height="88"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        filter: glow
          ? "drop-shadow(0 0 12px rgba(184,204,255,0.9)) drop-shadow(0 0 28px rgba(184,204,255,0.5))"
          : "drop-shadow(0 0 4px rgba(232,228,223,0.35))",
        transition: "filter 0.35s ease",
        display: "block",
      }}
      aria-label="The Knight — click to enter the kingdom"
    >
      {/* Body */}
      <path
        stroke="rgba(232,228,223,0.88)"
        strokeWidth="1.4"
        d="m24.6355,18.777c-6.7503,0-11.0683,1.7652-11.0683,1.7652,0,0-3.6099-2.4331-3.4827-5.3274s3.6099-5.884,3.594-6.4406-1.5744-.2544-1.638-1.0973,1.9878-2.5126,1.1609-3.101-7.2835,2.1628-7.2835,11.2274c0,7.3868,5.0094,9.1123,5.5342,10.3209.3116.7176-.0035,8.3198,2.8307,13.2152,2.2741,3.928,7.1824,4.2808,10.4481,4.1347,4.9776-.2226,9.7961-1.4631,11.0206-6.1544s.2385-9.9869.7156-11.0047,6.199-5.4207,5.566-11.4977c-.7156-6.87-5.801-11.3795-7.5061-9.8597-.7315.652,1.3517,2.1787,1.2563,2.9897s-1.1768.159-1.3517,1.0019,3.5781,3.5145,3.2124,6.6633c-.3658,3.1487-2.0356,4.6118-2.8625,4.6595s-5.7409-1.4949-10.146-1.4949Z"
      />
      {/* Left leg */}
      <path
        stroke="rgba(232,228,223,0.75)"
        strokeWidth="1.4"
        d="m18.207,31.9977c2.7351-.4613,4.1215,2.256,4.1324,4.4035s-1.0846,3.1779-2.7658,3.1888-3.5142-1.4968-3.6335-4.2842c-.1193-2.7875,1.3666-3.1562,2.2668-3.3081Z"
      />
      {/* Right leg */}
      <path
        stroke="rgba(232,228,223,0.75)"
        strokeWidth="1.4"
        d="m31.2146,31.8653c-2.7351-.4613-4.1215,2.256-4.1324,4.4035s1.0846,3.1779,2.7658,3.1888,3.5142-1.4968,3.6335-4.2842-1.3666-3.1562-2.2668-3.3081Z"
      />
    </svg>
  );
}

/* ── Main scene ─────────────────────────────────────────────── */
export default function SpaceScene() {
  const setAppState = usePortfolioStore((s) => s.setAppState);
  const [hovered, setHovered] = useState(false);
  const wisps = useWisps(45);

  /* Wandering position state — initial centre, then random via effect */
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const posRef = useRef(pos);
  const controls = useAnimation();

  /* After mount, start wandering to random positions */
  useEffect(() => {
    let active = true;

    const wander = () => {
      if (!active) return;
      const nextX = Math.random() * 60 + 20; // 20–80% of viewport width
      const nextY = Math.random() * 45 + 20; // 20–65% of viewport height
      posRef.current = { x: nextX, y: nextY };
      setPos({ x: nextX, y: nextY });
      const delay = Math.random() * 2500 + 2500; // 2.5–5s between moves
      setTimeout(wander, delay);
    };

    // First move after a short settle
    const first = setTimeout(wander, 1800);
    return () => {
      active = false;
      clearTimeout(first);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* ── Soul wisps drifting upward ── */}
      {wisps.map((w) => (
        <div
          key={w.id}
          style={{
            position: "absolute",
            left: `${w.x}%`,
            top: `${w.y}%`,
            width: w.size,
            height: w.size,
            borderRadius: "50%",
            background: `rgba(255,255,255,${w.opacity})`,
            filter: "blur(2.5px)",
            animation: `wisp-drift ${w.dur}s ease-in-out ${w.delay}s infinite`,
          }}
        />
      ))}

      {/* ── Wandering Knight ── */}
      <motion.div
        animate={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
        }}
        transition={{ duration: 2.8, ease: [0.45, 0, 0.55, 1] }}
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          cursor: "pointer",
          zIndex: 10,
          /* framer-motion drives left/top; keep transform for centering */
        }}
        onClick={() => setAppState("entering")}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
      >
        {/* Idle bob */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <KnightSVG glow={hovered} />
        </motion.div>

        {/* "ENTER THE KINGDOM" */}
        <motion.p
          animate={{ opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            color: hovered ? "#e8e4df" : "#6a6865",
            pointerEvents: "none",
            margin: 0,
            userSelect: "none",
            whiteSpace: "nowrap",
            transition: "color 0.3s",
          }}
        >
          {hovered ? "▶  ENTER THE KINGDOM" : "ENTER THE KINGDOM"}
        </motion.p>
      </motion.div>

      {/* ── Bottom-left lore label ── */}
      <div
        style={{
          position: "absolute",
          bottom: 22,
          left: 24,
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "0.5rem",
            letterSpacing: "0.3em",
            color: "rgba(106,104,101,0.5)",
            margin: 0,
          }}
        >
          THE ABYSS · HALLOWNEST
        </p>
      </div>
    </div>
  );
}
