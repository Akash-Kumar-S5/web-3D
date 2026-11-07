"use client";

/**
 * LoadingScreen — Hollow Knight themed professional loading screen.
 *
 * Fonts: Cinzel Decorative + Cinzel (Google Fonts via next/font — free, OFL license).
 * Animation: CSS soul-vessel pulse (no external assets).
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

const TASKS = [
  "Awakening the dream...",
  "Lighting soul lanterns...",
  "Surveying the kingdom...",
  "Sealing the vessel...",
  "Opening the Black Egg...",
  "The path clears...",
  "Systems awakened.",
];

export default function LoadingScreen() {
  const setAppState = usePortfolioStore((s) => s.setAppState);
  const setLoaded = usePortfolioStore((s) => s.setLoaded);

  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [taskIdx, setTaskIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const step = Math.random() * 12 + 5;
        const next = Math.min(prev + step, 100);
        setTaskIdx(Math.floor((next / 100) * (TASKS.length - 1)));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoaded(true);
            setVisible(false);
            setTimeout(() => setAppState("space"), 700);
          }, 800);
        }
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [setAppState, setLoaded]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#050508" }}
        >
          {/* Corner rune decorations */}
          <div className="hk-corner hk-corner-tl" />
          <div className="hk-corner hk-corner-tr" />
          <div className="hk-corner hk-corner-bl" />
          <div className="hk-corner hk-corner-br" />

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center gap-10"
          >
            {/* Title */}
            <div className="text-center">
              <h1
                className="amber-text text-3xl font-bold tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-cinzel-decorative)",
                  color: "#e8e4df",
                  letterSpacing: "0.3em",
                }}
              >
                AKASH KUMAR
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-cinzel)",
                  marginTop: "0.5rem",
                  fontSize: "0.65rem",
                  letterSpacing: "0.55em",
                  color: "#6a6865",
                }}
              >
                FULL-STACK DEVELOPER
              </p>
            </div>

            {/* Soul vessel pulse */}
            <div className="soul-vessel" aria-hidden />

            {/* Progress meter */}
            <div style={{ width: 260 }}>
              {/* Label row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cinzel)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.4em",
                    color: "#6a6865",
                    textTransform: "uppercase",
                  }}
                >
                  Soul
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "#c8a857",
                  }}
                >
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Bar track */}
              <div
                style={{
                  position: "relative",
                  height: 3,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(200,168,87,0.15)",
                  overflow: "hidden",
                }}
              >
                {/* Fill */}
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.35 }}
                  style={{
                    position: "absolute",
                    inset: "0 auto 0 0",
                    background: "#c8a857",
                    borderRadius: 2,
                  }}
                  className="amber-bar"
                />
                {/* Scan shimmer */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "12%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    animation: "hk-scan 1.8s linear infinite",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Current task */}
              <motion.p
                key={taskIdx}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  marginTop: "0.6rem",
                  textAlign: "center",
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  color: "#6a6865",
                }}
              >
                {TASKS[taskIdx]}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
