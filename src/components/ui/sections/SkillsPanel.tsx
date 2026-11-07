"use client";

import { motion } from "framer-motion";
import NeonText from "@/components/shared/NeonText";
import SkillBadge from "@/components/shared/SkillBadge";
import { skills } from "@/data/skills";

export default function SkillsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col gap-6"
    >
      <div>
        <NeonText as="h2" color="magenta" className="text-2xl font-bold tracking-wider">
          SKILLS
        </NeonText>
        <div className="mt-1 h-0.5 w-16" style={{ background: "rgba(200,168,87,0.4)" }} />
      </div>

      {skills.map((category, catIdx) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + catIdx * 0.1 }}
          className="flex flex-col gap-3"
        >
          <h3
            className="text-sm font-bold tracking-wider font-mono"
            style={{ color: category.color }}
          >
            {category.category.toUpperCase()}
          </h3>
          <div className="flex flex-col gap-2.5 glass rounded-xl p-4">
            {category.items.map((skill) => (
              <SkillBadge
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={category.color}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
