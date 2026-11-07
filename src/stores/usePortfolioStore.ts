import { create } from "zustand";

export type Section = "overview" | "projects" | "skills" | "about" | "contact";
export type CameraState = "overview" | "flying" | "focused" | "returning";
export type AppState = "loading" | "space" | "entering" | "portfolio";

interface PortfolioState {
  appState: AppState;
  activeSection: Section;
  cameraState: CameraState;
  isUIVisible: boolean;
  isLoaded: boolean;
  setAppState: (state: AppState) => void;
  setActiveSection: (section: Section) => void;
  setCameraState: (state: CameraState) => void;
  setUIVisible: (visible: boolean) => void;
  setLoaded: (loaded: boolean) => void;
  returnToOverview: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  appState: "loading",
  activeSection: "overview",
  cameraState: "overview",
  isUIVisible: false,
  isLoaded: false,
  setAppState: (state) => set({ appState: state }),
  setActiveSection: (section) => set({ activeSection: section }),
  setCameraState: (state) => set({ cameraState: state }),
  setUIVisible: (visible) => set({ isUIVisible: visible }),
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  returnToOverview: () =>
    set({
      activeSection: "overview",
      cameraState: "returning",
      isUIVisible: false,
    }),
}));
