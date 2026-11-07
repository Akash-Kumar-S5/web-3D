import type { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    color: "#b8ccff",
    items: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Three.js / R3F", level: 75 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    category: "Backend",
    color: "#c8a857",
    items: [
      { name: "Node.js", level: 90 },
      { name: "Python / FastAPI", level: 85 },
      { name: "PostgreSQL", level: 85 },
      { name: "Redis", level: 75 },
      { name: "GraphQL", level: 80 },
    ],
  },
  {
    category: "DevOps",
    color: "#9ab0c8",
    items: [
      { name: "Docker", level: 85 },
      { name: "AWS / GCP", level: 80 },
      { name: "CI/CD", level: 85 },
      { name: "Kubernetes", level: 70 },
      { name: "Terraform", level: 65 },
    ],
  },
  {
    category: "Tools",
    color: "#e8e4df",
    items: [
      { name: "Git", level: 95 },
      { name: "Linux", level: 85 },
      { name: "Figma", level: 70 },
      { name: "VS Code", level: 95 },
    ],
  },
];
