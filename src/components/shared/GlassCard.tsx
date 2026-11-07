"use client";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`glass rounded-xl p-4 transition-all hover:bg-white/5 hover:shadow-[0_0_20px_rgba(200,168,87,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}
