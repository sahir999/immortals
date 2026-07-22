import {
  eras,
  honourCategories,
  writers,
  type EraKey,
  type HonourKey,
  type Writer,
} from "@/data/writers";

/** Everything, in chronological order. */
export function getAllWriters(): Writer[] {
  return [...writers].sort((a, b) => a.sortYear - b.sortYear);
}

export function getWriterBySlug(slug: string): Writer | undefined {
  return writers.find((writer) => writer.slug === slug);
}

export function getAllSlugs(): string[] {
  return writers.map((writer) => writer.slug);
}

export function getFeaturedWriters(limit = 6): Writer[] {
  return getAllWriters()
    .filter((writer) => writer.featured)
    .slice(0, limit);
}

export type EraGroup = {
  era: (typeof eras)[number];
  writers: Writer[];
};

export function getWritersByEra(): EraGroup[] {
  return eras.map((era) => ({
    era,
    writers: getAllWriters().filter((writer) => writer.era === era.key),
  }));
}

export function getEra(key: EraKey) {
  return eras.find((era) => era.key === key);
}

export type LanguageGroup = {
  language: string;
  writers: Writer[];
};

/** Grouped by primary language, largest group first. */
export function getWritersByLanguage(): LanguageGroup[] {
  const groups = new Map<string, Writer[]>();

  for (const writer of getAllWriters()) {
    const existing = groups.get(writer.language);
    if (existing) {
      existing.push(writer);
    } else {
      groups.set(writer.language, [writer]);
    }
  }

  return [...groups.entries()]
    .map(([language, list]) => ({ language, writers: list }))
    .sort(
      (a, b) =>
        b.writers.length - a.writers.length ||
        a.language.localeCompare(b.language),
    );
}

/** Every language anyone in the collection wrote in, not just their primary. */
export function getAllLanguages(): string[] {
  const all = new Set<string>();
  for (const writer of writers) {
    for (const language of writer.languages) all.add(language);
  }
  return [...all].sort((a, b) => a.localeCompare(b));
}

export type HonourGroup = {
  honour: (typeof honourCategories)[number];
  writers: Writer[];
};

export function getWritersByHonour(): HonourGroup[] {
  return honourCategories
    .map((honour) => ({
      honour,
      writers: getAllWriters().filter((writer) =>
        writer.honourKeys.includes(honour.key),
      ),
    }))
    .filter((group) => group.writers.length > 0);
}

export function getWritersWithHonour(key: HonourKey): Writer[] {
  return getAllWriters().filter((writer) => writer.honourKeys.includes(key));
}

/** Figures who predate the age of literary prizes entirely. */
export function getUnawardedGreats(): Writer[] {
  return getAllWriters().filter((writer) => writer.honourKeys.length === 0);
}

export function getWritersWithQuotes(): Writer[] {
  return getAllWriters().filter((writer) => writer.quote);
}

/** Previous and next in chronological order, for detail-page navigation. */
export function getNeighbours(slug: string): {
  previous?: Writer;
  next?: Writer;
} {
  const ordered = getAllWriters();
  const index = ordered.findIndex((writer) => writer.slug === slug);
  if (index === -1) return {};
  return {
    previous: index > 0 ? ordered[index - 1] : undefined,
    next: index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}

/** Others writing in the same language, or failing that the same era. */
export function getRelatedWriters(writer: Writer, limit = 3): Writer[] {
  const sameLanguage = getAllWriters().filter(
    (other) => other.slug !== writer.slug && other.language === writer.language,
  );
  const sameEra = getAllWriters().filter(
    (other) =>
      other.slug !== writer.slug &&
      other.era === writer.era &&
      other.language !== writer.language,
  );
  return [...sameLanguage, ...sameEra].slice(0, limit);
}

export function getStats() {
  const languages = getAllLanguages();
  const centuries = getAllWriters();
  const earliest = centuries[0];
  const latest = centuries[centuries.length - 1];

  return {
    writers: writers.length,
    languages: languages.length,
    works: writers.reduce((total, writer) => total + writer.works.length, 0),
    eras: eras.length,
    span: `${earliest.lifespan.replace(/^c\. /, "")} – ${latest.lifespan.replace(/^b\. /, "")}`,
  };
}

/** "Rabindranath Tagore" → "RT", "Kalidasa" → "Ka" */
export function getInitials(name: string): string {
  const words = name
    .replace(/['"]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 0 && !/^[a-z]/.test(word));

  if (words.length === 0) return name.slice(0, 2);
  if (words.length === 1) return words[0].slice(0, 2);

  const first = words[0][0];
  const last = words[words.length - 1][0];
  return `${first}${last}`;
}
