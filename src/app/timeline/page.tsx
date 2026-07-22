import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import Monogram from "@/components/ui/Monogram";
import Pill from "@/components/ui/Pill";
import { getStats, getWritersByEra } from "@/lib/writers";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "Twenty-five centuries of Indian literature in chronological order, divided into five eras.",
};

export default function TimelinePage() {
  const groups = getWritersByEra();
  const stats = getStats();

  return (
    <>
      <PageHeader
        eyebrow="Chronology"
        title="Two and a half thousand years, in order"
        description="Dates before the modern period are traditional or contested, and are given as ranges where scholarship disagrees. The sequence still holds: epic, then devotion, then prose, then the nation, then the world."
        meta={`${stats.eras} eras · ${stats.writers} writers`}
      />

      <Container width="wide" className="py-12 sm:py-16">
        <nav aria-label="Jump to era" className="flex flex-wrap gap-2">
          {groups.map((group) => (
            <a
              key={group.era.key}
              href={`#${group.era.key}`}
              className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {group.era.label}
            </a>
          ))}
        </nav>

        <div className="mt-16 space-y-20">
          {groups.map((group) => (
            <section
              key={group.era.key}
              id={group.era.key}
              className="scroll-mt-24"
            >
              <div className="max-w-2xl">
                <Pill tone="accent">{group.era.span}</Pill>
                <h2 className="mt-4 font-serif text-2xl text-foreground sm:text-3xl">
                  {group.era.label}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {group.era.blurb}
                </p>
              </div>

              <ol className="mt-10 border-l border-line">
                {group.writers.map((writer) => (
                  <li key={writer.slug} className="relative pb-10 pl-8 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="absolute top-2 -left-[5px] h-2.5 w-2.5 rounded-full border border-line bg-accent"
                    />
                    <Link href={`/writers/${writer.slug}`} className="group block">
                      <p className="font-mono text-xs tracking-wide text-muted">
                        {writer.lifespan}
                      </p>
                      <div className="mt-2 flex items-start gap-4">
                        <Monogram name={writer.name} size="sm" />
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg text-foreground group-hover:text-accent">
                            {writer.name}
                            {writer.nativeName ? (
                              <span className="ml-2 text-sm text-muted">
                                {writer.nativeName}
                              </span>
                            ) : null}
                          </h3>
                          <p className="mt-1 text-sm text-accent">
                            {writer.epithet}
                          </p>
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                            {writer.knownFor}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
