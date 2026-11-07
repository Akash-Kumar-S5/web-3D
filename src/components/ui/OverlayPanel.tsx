"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import AboutPanel from "./sections/AboutPanel";
import ProjectsPanel from "./sections/ProjectsPanel";
import SkillsPanel from "./sections/SkillsPanel";
import ContactPanel from "./sections/ContactPanel";
import BackButton from "./BackButton";

const sectionComponents: Record<string, React.ComponentType> = {
  projects: ProjectsPanel,
  skills: SkillsPanel,
  about: AboutPanel,
  contact: ContactPanel,
};

export default function OverlayPanel() {
  const isUIVisible = usePortfolioStore((s) => s.isUIVisible);
  const activeSection = usePortfolioStore((s) => s.activeSection);

  const SectionComponent = sectionComponents[activeSection];

  return (
    <>
      <AnimatePresence>
        {isUIVisible && SectionComponent && (
          <motion.div
            key="overlay-panel"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-40 h-full w-full sm:w-[480px] lg:w-[520px]"
          >
            <div
              className="glass h-full overflow-y-auto p-6 sm:p-8"
              style={{ borderRadius: "4px 0 0 4px", fontFamily: "var(--font-cinzel)" }}
            >
              <SectionComponent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isUIVisible && <BackButton />}
      </AnimatePresence>
    </>
  );
}
