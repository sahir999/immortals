import Link from "next/link";
import type { EraGroup } from "@/lib/writers";

type EraStripProps = {
  groups: EraGroup[];
};

export default function EraStrip({ groups }: EraStripProps) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {groups.map((group, index) => (
        <li key={group.era.key}>
          <Link
            href={`/timeline#${group.era.key}`}
            className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent"
          >
            <span className="font-mono text-xs text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-3 font-serif text-base leading-snug text-foreground">
              {group.era.label}
            </span>
            <span className="mt-1 text-xs text-accent">{group.era.span}</span>
            <span className="mt-3 flex-1 text-xs leading-relaxed text-muted">
              {group.era.blurb}
            </span>
            <span className="mt-4 text-xs tracking-wide text-muted uppercase">
              {group.writers.length} writers
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
