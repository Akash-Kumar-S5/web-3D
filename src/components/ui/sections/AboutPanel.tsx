"use client";

import { motion } from "framer-motion";
import NeonText from "@/components/shared/NeonText";
import { profile } from "@/data/profile";

export default function AboutPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col gap-6"
    >
      <div>
        <NeonText as="h2" color="green" className="text-2xl font-bold tracking-wider">
          ABOUT ME
        </NeonText>
        <div className="mt-1 h-0.5 w-16" style={{ background: "rgba(154,176,200,0.4)" }} />
      </div>

      {/* Profile header */}
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full flex items-center justify-center" style={{ background: "radial-gradient(circle, rgba(184,204,255,0.18) 0%, rgba(200,168,87,0.1) 100%)", border: "1px solid rgba(200,168,87,0.2)" }}>
          <span className="text-3xl font-bold text-hk-pale">
            {profile.name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{profile.name}</h3>
          <p className="font-mono text-sm text-hk-soul/70">{profile.title}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-3">
        {profile.bio.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed text-white/70">
            {paragraph.trim()}
          </p>
        ))}
      </div>

      {/* Social links */}
      <div className="flex flex-col gap-3 mt-2">
        <NeonText as="h3" color="cyan" className="text-sm font-bold tracking-wider">
          CONNECT
        </NeonText>
        <div className="grid grid-cols-2 gap-2">
          {profile.socials.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-lg px-3 py-2 text-sm font-mono text-white/70 transition-all hover:text-hk-soul hover:bg-white/10"
            >
              GitHub
            </a>
          )}
          {profile.socials.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-lg px-3 py-2 text-sm font-mono text-white/70 transition-all hover:text-hk-soul hover:bg-white/10"
            >
              LinkedIn
            </a>
          )}
          {profile.socials.twitter && (
            <a
              href={profile.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-lg px-3 py-2 text-sm font-mono text-white/70 transition-all hover:text-hk-soul hover:bg-white/10"
            >
              Twitter
            </a>
          )}
          {profile.socials.email && (
            <a
              href={`mailto:${profile.socials.email}`}
              className="glass rounded-lg px-3 py-2 text-sm font-mono text-white/70 transition-all hover:text-hk-soul hover:bg-white/10"
            >
              Email
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
