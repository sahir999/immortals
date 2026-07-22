"use client";

import { useMemo, useState } from "react";
import WriterGrid from "@/components/writers/WriterGrid";
import { eras, type EraKey, type Writer } from "@/data/writers";

type WriterExplorerProps = {
  writers: Writer[];
  languages: string[];
};

type EraFilter = EraKey | "all";

export default function WriterExplorer({
  writers,
  languages,
}: WriterExplorerProps) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [era, setEra] = useState<EraFilter>("all");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return writers.filter((writer) => {
      if (era !== "all" && writer.era !== era) return false;
      if (language !== "all" && !writer.languages.includes(language)) {
        return false;
      }
      if (!needle) return true;

      const haystack = [
        writer.name,
        writer.nativeName ?? "",
        writer.epithet,
        writer.region,
        writer.knownFor,
        ...writer.languages,
        ...writer.forms,
        ...writer.works.map((work) => work.title),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [writers, query, language, era]);

  const filtered = query.trim() !== "" || language !== "all" || era !== "all";

  return (
    <div>
      <div className="rounded-lg border border-line bg-surface p-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="sm:col-span-3">
            <span className="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase">
              Search
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="A name, a work, a region — try &ldquo;Partition&rdquo; or &ldquo;Malgudi&rdquo;"
              className="w-full rounded-md border border-line bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase">
              Language
            </span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="w-full rounded-md border border-line bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
            >
              <option value="all">All languages</option>
              {languages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase">
              Era
            </span>
            <select
              value={era}
              onChange={(event) => setEra(event.target.value as EraFilter)}
              className="w-full rounded-md border border-line bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
            >
              <option value="all">All eras</option>
              {eras.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label} ({item.span})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-4">
          <p aria-live="polite" className="text-sm text-muted">
            {results.length} of {writers.length} writers
          </p>
          {filtered ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setLanguage("all");
                setEra("all");
              }}
              className="text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-8">
        <WriterGrid
          writers={results}
          emptyMessage="No writer matches that combination. Try clearing a filter."
        />
      </div>
    </div>
  );
}
