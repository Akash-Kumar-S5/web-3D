"use client";

import { motion } from "framer-motion";
import NeonText from "@/components/shared/NeonText";
import GlassCard from "@/components/shared/GlassCard";
import { projects } from "@/data/projects";

export default function ProjectsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col gap-6"
    >
      <div>
        <NeonText as="h2" color="cyan" className="text-2xl font-bold tracking-wider">
          PROJECTS
        </NeonText>
        <div className="mt-1 h-0.5 w-16" style={{ background: "rgba(184,204,255,0.4)" }} />
      </div>

      <div className="flex flex-col gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <GlassCard>
              {/* Project image placeholder */}
              <div className="mb-3 h-32 rounded-lg bg-linear-to-br from-[#1a1820] to-[#050508] flex items-center justify-center border border-white/5">
                <span className="font-mono text-xs text-white/20">
                  {project.title}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">{project.title}</h3>
              <p className="mt-1 text-sm text-white/50 leading-relaxed">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full px-2 py-0.5 text-xs font-mono"
                    style={{ background: "rgba(184,204,255,0.08)", color: "rgba(184,204,255,0.75)", border: "1px solid rgba(184,204,255,0.15)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-3 flex gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white/40 transition-colors hover:text-hk-soul"
                  >
                    GitHub &rarr;
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white/40 transition-colors hover:text-hk-amber"
                  >
                    Live Demo &rarr;
                  </a>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
