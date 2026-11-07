import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard. Built with modern web technologies.",
    image: "/images/projects/placeholder.svg",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "project-2",
    title: "Real-time Chat App",
    description:
      "WebSocket-powered messaging platform with end-to-end encryption, file sharing, and group channels.",
    image: "/images/projects/placeholder.svg",
    techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Redis"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "project-3",
    title: "AI Dashboard",
    description:
      "Analytics dashboard with ML-powered insights, interactive charts, and automated reporting for business intelligence.",
    image: "/images/projects/placeholder.svg",
    techStack: ["Python", "FastAPI", "React", "D3.js", "TensorFlow"],
    githubUrl: "https://github.com",
  },
  {
    id: "project-4",
    title: "DevOps Pipeline Tool",
    description:
      "CI/CD automation tool with container orchestration, deployment monitoring, and rollback capabilities.",
    image: "/images/projects/placeholder.svg",
    techStack: ["Go", "Docker", "Kubernetes", "Terraform", "AWS"],
    githubUrl: "https://github.com",
  },
];
