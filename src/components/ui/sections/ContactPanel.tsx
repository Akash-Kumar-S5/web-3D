"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NeonText from "@/components/shared/NeonText";
import GlassCard from "@/components/shared/GlassCard";
import { profile } from "@/data/profile";

export default function ContactPanel() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${profile.socials.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.open(mailtoLink);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col gap-6"
    >
      <div>
        <NeonText as="h2" color="blue" className="text-2xl font-bold tracking-wider">
          CONTACT
        </NeonText>
        <div className="mt-1 h-0.5 w-16" style={{ background: "rgba(184,204,255,0.4)" }} />
      </div>

      <p className="text-sm text-white/50">
        Want to work together or just say hi? Drop me a message.
      </p>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        {profile.socials.email && (
          <GlassCard className="text-center">
            <a
              href={`mailto:${profile.socials.email}`}
              className="flex flex-col items-center gap-2 text-white/70 hover:text-hk-soul transition-colors"
            >
              <span className="text-2xl">@</span>
              <span className="text-xs font-mono">Email</span>
            </a>
          </GlassCard>
        )}
        {profile.socials.github && (
          <GlassCard className="text-center">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-white/70 hover:text-hk-soul transition-colors"
            >
              <span className="text-2xl">&lt;/&gt;</span>
              <span className="text-xs font-mono">GitHub</span>
            </a>
          </GlassCard>
        )}
        {profile.socials.linkedin && (
          <GlassCard className="text-center">
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-white/70 hover:text-hk-amber transition-colors"
            >
              <span className="text-2xl">in</span>
              <span className="text-xs font-mono">LinkedIn</span>
            </a>
          </GlassCard>
        )}
        {profile.socials.twitter && (
          <GlassCard className="text-center">
            <a
              href={profile.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-white/70 hover:text-hk-fog transition-colors"
            >
              <span className="text-2xl">X</span>
              <span className="text-xs font-mono">Twitter</span>
            </a>
          </GlassCard>
        )}
      </div>

      {/* Contact form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <NeonText as="h3" color="cyan" className="text-sm font-bold tracking-wider">
          SEND A MESSAGE
        </NeonText>
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="glass rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-hk-soul/40 transition-colors bg-transparent"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="glass rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-hk-soul/40 transition-colors bg-transparent"
        />
        <textarea
          placeholder="Your Message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          className="glass rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-hk-soul/40 transition-colors bg-transparent resize-none"
        />
        <button
          type="submit"
          className="glass rounded-lg px-4 py-2.5 text-sm font-mono text-hk-amber border-hk-amber/30
            transition-all hover:bg-hk-amber/5 hover:shadow-[0_0_15px_rgba(200,168,87,0.2)]
            active:scale-[0.98]"
        >
          SEND &rarr;
        </button>
      </form>
    </motion.div>
  );
}
