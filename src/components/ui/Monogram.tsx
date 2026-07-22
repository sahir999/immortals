import { getInitials } from "@/lib/writers";

type MonogramProps = {
  name: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-base",
  lg: "h-20 w-20 text-2xl",
};

/**
 * A typographic stand-in for a portrait. Most of these writers predate
 * photography, and the ones who don't are still under copyright.
 */
export default function Monogram({ name, size = "md" }: MonogramProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-line bg-accent-soft font-serif font-medium text-accent ${sizes[size]}`}
    >
      {getInitials(name)}
    </span>
  );
}
