import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import Pill from "@/components/ui/Pill";
import WriterGrid from "@/components/writers/WriterGrid";
import { getStats, getWritersByLanguage } from "@/lib/writers";

export const metadata: Metadata = {
  title: "Languages",
  description:
    "Indian literature sorted by the language it was written in — Sanskrit, Tamil, Bengali, Hindi, Urdu, Kannada, Malayalam and more.",
};

export default function LanguagesPage() {
  const groups = getWritersByLanguage();
  const stats = getStats();

  return (
    <>
      <PageHeader
        eyebrow="By language"
        title="A literature with no single mother tongue"
        description="The Indian constitution recognises twenty-two scheduled languages, and the Sahitya Akademi gives its award in twenty-four. Grouped here by the language each writer principally worked in — though many worked in two or three."
        meta={`${stats.languages} languages represented`}
      />

      <Container width="wide" className="py-12 sm:py-16">
        <nav aria-label="Jump to language" className="flex flex-wrap gap-2">
          {groups.map((group) => (
            <a
              key={group.language}
              href={`#${group.language.toLowerCase()}`}
              className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {group.language}
            </a>
          ))}
        </nav>

        <div className="mt-16 space-y-20">
          {groups.map((group) => (
            <section
              key={group.language}
              id={group.language.toLowerCase()}
              className="scroll-mt-24"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-4">
                <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                  {group.language}
                </h2>
                <Pill tone="outline">
                  {group.writers.length}{" "}
                  {group.writers.length === 1 ? "writer" : "writers"}
                </Pill>
              </div>

              <div className="mt-8">
                <WriterGrid writers={group.writers} />
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
