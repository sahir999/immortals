import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import Monogram from "@/components/ui/Monogram";
import Pill from "@/components/ui/Pill";
import QuoteBlock from "@/components/ui/QuoteBlock";
import WriterGrid from "@/components/writers/WriterGrid";
import WorkList from "@/components/writers/WorkList";
import {
  getAllSlugs,
  getEra,
  getNeighbours,
  getRelatedWriters,
  getWriterBySlug,
} from "@/lib/writers";

type WriterPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WriterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const writer = getWriterBySlug(slug);

  if (!writer) return { title: "Writer not found" };

  return {
    title: writer.name,
    description: `${writer.name} (${writer.lifespan}) — ${writer.knownFor}`,
  };
}

export default async function WriterPage({ params }: WriterPageProps) {
  const { slug } = await params;
  const writer = getWriterBySlug(slug);

  if (!writer) notFound();

  const era = getEra(writer.era);
  const { previous, next } = getNeighbours(writer.slug);
  const related = getRelatedWriters(writer);

  return (
    <>
      <header className="border-b border-line bg-surface">
        <Container width="wide" className="py-12 sm:py-16">
          <Link
            href="/writers"
            className="text-sm text-muted underline-offset-4 hover:text-accent hover:underline"
          >
            &larr; All writers
          </Link>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <Monogram name={writer.name} size="lg" />

            <div className="min-w-0 flex-1">
              <h1 className="font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-5xl">
                {writer.name}
              </h1>
              {writer.nativeName ? (
                <p className="mt-2 font-serif text-xl text-muted">
                  {writer.nativeName}
                </p>
              ) : null}
              <p className="mt-4 text-base text-accent sm:text-lg">
                {writer.epithet}
              </p>

              <dl className="mt-8 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs tracking-wide text-muted uppercase">
                    Lived
                  </dt>
                  <dd className="mt-1 text-foreground">{writer.lifespan}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-wide text-muted uppercase">
                    Wrote in
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {writer.languages.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-wide text-muted uppercase">
                    Region
                  </dt>
                  <dd className="mt-1 text-foreground">{writer.region}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                {era ? <Pill tone="accent">{era.label}</Pill> : null}
                {writer.forms.map((form) => (
                  <Pill key={form}>{form}</Pill>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </header>

      <Container width="wide" className="py-14 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <section>
              <h2 className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                Known for
              </h2>
              <p className="mt-4 font-serif text-xl leading-relaxed text-balance text-foreground">
                {writer.knownFor}
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted">
                {writer.bio}
              </p>
            </section>

            {writer.quote ? (
              <section className="mt-12">
                <QuoteBlock
                  text={writer.quote.text}
                  attribution={writer.name}
                  source={writer.quote.source}
                />
              </section>
            ) : null}

            <section className="mt-12">
              <h2 className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                Principal works
              </h2>
              <div className="mt-5">
                <WorkList works={writer.works} />
              </div>
            </section>
          </div>

          <aside className="lg:pt-1">
            <div className="rounded-lg border border-line bg-surface p-6">
              <h2 className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                Honours
              </h2>
              <ul className="mt-4 space-y-3">
                {writer.honours.map((honour) => (
                  <li
                    key={honour}
                    className="text-sm leading-relaxed text-muted"
                  >
                    {honour}
                  </li>
                ))}
              </ul>
            </div>

            {era ? (
              <div className="mt-6 rounded-lg border border-line p-6">
                <h2 className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                  {era.span}
                </h2>
                <p className="mt-3 font-serif text-lg text-foreground">
                  {era.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {era.blurb}
                </p>
                <Link
                  href={`/timeline#${era.key}`}
                  className="mt-4 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  See the period &rarr;
                </Link>
              </div>
            ) : null}
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="mt-20 border-t border-line pt-12">
            <h2 className="font-serif text-2xl text-foreground">
              Read alongside
            </h2>
            <div className="mt-8">
              <WriterGrid writers={related} />
            </div>
          </section>
        ) : null}

        <nav
          aria-label="Chronological"
          className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:justify-between"
        >
          {previous ? (
            <Link
              href={`/writers/${previous.slug}`}
              className="text-sm text-muted hover:text-accent"
            >
              &larr; Earlier: {previous.name}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/writers/${next.slug}`}
              className="text-sm text-muted hover:text-accent sm:text-right"
            >
              Later: {next.name} &rarr;
            </Link>
          ) : null}
        </nav>
      </Container>
    </>
  );
}
