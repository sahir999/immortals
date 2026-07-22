type PillProps = {
  children: React.ReactNode;
  tone?: "default" | "accent" | "outline";
  size?: "sm" | "md";
};

const tones = {
  default: "bg-surface-muted text-muted",
  accent: "bg-accent-soft text-accent",
  outline: "border border-line text-muted",
};

const sizes = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-3 py-1 text-xs",
};

export default function Pill({
  children,
  tone = "default",
  size = "md",
}: PillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium tracking-wide whitespace-nowrap ${tones[tone]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
}
