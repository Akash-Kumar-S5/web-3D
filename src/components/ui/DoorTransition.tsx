"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

/**
 * DoorTransition — Hollow Knight: ancient stone gates slide open.
 *
 * Phase 1 (0 → 0.9s):  Amber pulse — "The Kingdom Awakens"
 * Phase 2 (0.9 → 2.5s): Top panel slides up, bottom slides down
 * Phase 3 (2.8s):       setAppState('portfolio')
 */
export default function DoorTransition() {
  const setAppState = usePortfolioStore((s) => s.setAppState);
  const [open, setOpen] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFlash(true), 100);
    const t2 = setTimeout(() => setFlash(false), 450);
    const t3 = setTimeout(() => setFlash(true), 650);
    const t4 = setTimeout(() => setFlash(false), 950);
    const t5 = setTimeout(() => setOpen(true), 1050);
    const t6 = setTimeout(() => setAppState("portfolio"), 2800);
    return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
  }, [setAppState]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden>
      {/* ── Top panel ── */}
      <motion.div
        className="door-panel door-panel-top"
        initial={{ y: 0 }}
        animate={open ? { y: "-102%" } : { y: 0 }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Stone texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(200,168,87,0.02) 5px, rgba(200,168,87,0.02) 6px)",
            opacity: 0.6,
          }}
        />
        {/* Top panel text */}
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap"
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "0.6rem",
            letterSpacing: "0.45em",
            color: flash ? "#e8e4df" : "#c8a857",
            textShadow: flash
              ? "0 0 16px rgba(232,228,223,0.8), 0 0 32px rgba(200,168,87,0.6)"
              : "0 0 10px rgba(200,168,87,0.5)",
            opacity: open ? 0 : 1,
            transition: "color 0.12s, text-shadow 0.12s, opacity 0.3s",
          }}
        >
          {flash ? "✦  THE KINGDOM AWAKENS  ✦" : "THE PATH OPENS"}
        </div>

        {/* Amber pulse edge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: flash ? "rgba(200,168,87,0.9)" : "rgba(200,168,87,0.3)",
            boxShadow: flash ? "0 0 12px 4px rgba(200,168,87,0.5)" : "none",
            transition: "all 0.12s",
          }}
        />
      </motion.div>

      {/* ── Bottom panel ── */}
      <motion.div
        className="door-panel door-panel-bottom"
        initial={{ y: 0 }}
        animate={open ? { y: "102%" } : { y: 0 }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Stone texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(200,168,87,0.02) 5px, rgba(200,168,87,0.02) 6px)",
            opacity: 0.6,
          }}
        />
        {/* Bottom panel text */}
        <div
          className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap"
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "0.6rem",
            letterSpacing: "0.45em",
            color: flash ? "#e8e4df" : "#6a6865",
            textShadow: flash ? "0 0 16px rgba(232,228,223,0.6)" : "none",
            opacity: open ? 0 : 1,
            transition: "color 0.12s, opacity 0.3s",
          }}
        >
          {flash ? "HALLOWNEST AWAITS" : "ENTER THE KINGDOM"}
        </div>

        {/* Amber pulse edge */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: flash ? "rgba(200,168,87,0.9)" : "rgba(200,168,87,0.3)",
            boxShadow: flash ? "0 0 12px 4px rgba(200,168,87,0.5)" : "none",
            transition: "all 0.12s",
          }}
        />
      </motion.div>

      {/* ── Center amber seam flash ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2"
        style={{
          height: "3px",
          background: flash
            ? "radial-gradient(ellipse 80% 100% at 50% 50%, #e8e4df 0%, #c8a857 45%, transparent 100%)"
            : "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(200,168,87,0.4) 0%, transparent 100%)",
          boxShadow: flash
            ? "0 0 50px 16px rgba(200,168,87,0.55)"
            : "0 0 16px 4px rgba(200,168,87,0.2)",
          transition: "all 0.12s ease",
          zIndex: 61,
          opacity: open ? 0 : 1,
        }}
      />
    </div>
  );
}
