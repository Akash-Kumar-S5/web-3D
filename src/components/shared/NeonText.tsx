"use client";

interface NeonTextProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

const colorMap: Record<string, { color: string; textShadow: string }> = {
  cyan:    { color: "#b8ccff", textShadow: "0 0 8px rgba(184,204,255,0.6), 0 0 16px rgba(184,204,255,0.25)" },
  magenta: { color: "#c8a857", textShadow: "0 0 8px rgba(200,168,87,0.6), 0 0 16px rgba(200,168,87,0.25)" },
  green:   { color: "#9ab0c8", textShadow: "0 0 8px rgba(154,176,200,0.5)" },
  blue:    { color: "#b8ccff", textShadow: "0 0 8px rgba(184,204,255,0.6), 0 0 16px rgba(184,204,255,0.25)" },
  amber:   { color: "#c8a857", textShadow: "0 0 8px rgba(200,168,87,0.6), 0 0 16px rgba(200,168,87,0.25)" },
  pale:    { color: "#e8e4df", textShadow: "0 0 6px rgba(232,228,223,0.3)" },
};

export default function NeonText({
  children,
  color = "cyan",
  className = "",
  as: Tag = "span",
}: NeonTextProps) {
  const style = colorMap[color] || colorMap.cyan;
  return (
    <Tag className={className} style={{ color: style.color, textShadow: style.textShadow }}>
      {children}
    </Tag>
  );
}
