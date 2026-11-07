"use client";

interface SkillBadgeProps {
  name: string;
  level: number;
  color: string;
}

export default function SkillBadge({ name, level, color }: SkillBadgeProps) {
  return (
    <div className="group flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-mono text-white/80">{name}</span>
        <span className="text-xs font-mono text-white/40">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${level}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}
