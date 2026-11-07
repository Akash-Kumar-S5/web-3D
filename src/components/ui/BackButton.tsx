"use client";

import { motion } from "framer-motion";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

export default function BackButton() {
  const returnToOverview = usePortfolioStore((s) => s.returnToOverview);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: 0.3 }}
      onClick={returnToOverview}
      className="fixed left-6 top-6 z-50 glass px-4 py-2 text-sm active:scale-95 transition-all hover:bg-white/5"
      style={{
        fontFamily: "var(--font-cinzel)",
        fontSize: "0.65rem",
        letterSpacing: "0.25em",
        color: "#c8a857",
        textShadow: "0 0 8px rgba(200,168,87,0.5)",
        borderRadius: "4px",
      }}
    >
      &larr; BACK
    </motion.button>
  );
}
