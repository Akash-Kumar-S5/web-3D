"use client";

import dynamic from "next/dynamic";
import LoadingScreen from "@/components/ui/LoadingScreen";
import DoorTransition from "@/components/ui/DoorTransition";
import SpaceScene from "@/components/space/SpaceScene";
import OverlayPanel from "@/components/ui/OverlayPanel";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

const PortfolioCanvas = dynamic(
  () => import("@/components/canvas/PortfolioCanvas"),
  { ssr: false }
);

export default function Home() {
  const appState = usePortfolioStore((s) => s.appState);

  // DEBUG: Skip straight to 3D portfolio for visual debugging
  const debugMode = true;

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-dark-bg">

      {!debugMode && (
        <>
          {/* ── Phase 1: Among Us loading screen ── */}
          {appState === "loading" && <LoadingScreen />}

          {/* ── Phase 2: 2D solar system with drifting spaceship ── */}
          {appState === "space" && <SpaceScene />}
        </>
      )}

      {/* ── Portfolio canvas: pre-loaded during 'entering' so WebGL is
           ready before the door finishes opening ── */}
      {(debugMode || appState === "entering" || appState === "portfolio") && (
        <PortfolioCanvas />
      )}

      {/* ── Phase 3: Airlock door animation (on top of portfolio) ── */}
      {!debugMode && appState === "entering" && <DoorTransition />}

      {/* ── Phase 4: UI panel for portfolio sections ── */}
      {(debugMode || appState === "portfolio") && <OverlayPanel />}

      <noscript>
        <div
          style={{
            background: "#0a0a1a",
            color: "#fff",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <div>
            <h1>Akash Kumar</h1>
            <p>
              Full-Stack Developer. Enable JavaScript to explore the interactive
              3D portfolio.
            </p>
          </div>
        </div>
      </noscript>
    </main>
  );
}
