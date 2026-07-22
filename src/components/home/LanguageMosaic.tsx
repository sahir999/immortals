import Link from "next/link";
import type { LanguageGroup } from "@/lib/writers";

type LanguageMosaicProps = {
  groups: LanguageGroup[];
};

export default function LanguageMosaic({ groups }: LanguageMosaicProps) {
  return (
    <ul className="flex flex-wrap gap-3">
      {groups.map((group) => (
        <li key={group.language}>
          <Link
            href={`/languages#${group.language.toLowerCase()}`}
            className="flex items-baseline gap-2 rounded-full border border-line bg-surface px-4 py-2 transition-colors hover:border-accent"
          >
            <span className="text-sm font-medium text-foreground">
              {group.language}
            </span>
            <span className="font-mono text-xs text-muted">
              {group.writers.length}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
