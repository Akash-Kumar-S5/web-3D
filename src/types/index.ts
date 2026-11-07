import type { Section } from "@/stores/usePortfolioStore";

export interface InteractiveObjectProps {
  section: Section;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  category: string;
  color: string;
  items: Skill[];
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  photo: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}
