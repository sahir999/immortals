import Link from "next/link";
import Monogram from "@/components/ui/Monogram";
import Pill from "@/components/ui/Pill";
import type { Writer } from "@/data/writers";

type WriterCardProps = {
  writer: Writer;
  /** `feature` adds the epithet and a longer summary. */
  variant?: "default" | "feature" | "compact";
};

export default function WriterCard({
  writer,
  variant = "default",
}: WriterCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/writers/${writer.slug}`}
        className="flex items-center gap-4 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent"
      >
        <Monogram name={writer.name} size="sm" />
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-foreground">
            {writer.name}
          </span>
          <span className="block truncate text-xs text-muted">
            {writer.language} &middot; {writer.lifespan}
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/writers/${writer.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent"
    >
      <div className="flex items-start gap-4">
        <Monogram name={writer.name} size={variant === "feature" ? "md" : "sm"} />
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg leading-snug text-foreground group-hover:text-accent">
            {writer.name}
          </h3>
          {writer.nativeName ? (
            <p className="mt-0.5 text-sm text-muted">{writer.nativeName}</p>
          ) : null}
          <p className="mt-1 text-xs tracking-wide text-muted">
            {writer.lifespan}
          </p>
        </div>
      </div>

      {variant === "feature" ? (
        <p className="mt-4 text-sm text-accent">{writer.epithet}</p>
      ) : null}

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {writer.knownFor}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Pill tone="accent" size="sm">
          {writer.language}
        </Pill>
        {writer.forms.slice(0, 2).map((form) => (
          <Pill key={form} size="sm">
            {form}
          </Pill>
        ))}
      </div>
    </Link>
  );
}
