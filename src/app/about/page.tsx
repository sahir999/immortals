import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import QuoteBlock from "@/components/ui/QuoteBlock";
import { getStats, getWriterBySlug } from "@/lib/writers";

export const metadata: Metadata = {
  title: "About",
  description:
    "What this collection covers, how the writers were chosen, and where its dates come from.",
};

export default function AboutPage() {
  const stats = getStats();
  const kabir = getWriterBySlug("kabir");

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="What this is"
        description="A reference site about the people who made literature in India — built as a single dataset rendered through a small set of reusable components."
      />

      <Container width="prose" className="py-14 sm:py-20">
        <div className="space-y-6 text-base leading-relaxed text-muted">
          <p>
            Indian literature is usually taught one language at a time. A Tamil
            reader gets Thiruvalluvar and Bharati; a Bengali reader gets Bankim
            and Tagore; almost nobody gets both. This collection puts{" "}
            {stats.writers} figures from {stats.languages} languages into one
            chronology so the connections are visible — Tulsidas doing in Awadhi
            what Jayadeva had done in Sanskrit, Premchand and Manto working the
            same Hindi-Urdu ground from opposite ends.
          </p>

          <h2 className="pt-6 font-serif text-2xl text-foreground">
            How the selection works
          </h2>
          <p>
            Three tests, loosely applied. Did the writer create or decisively
            change a form? Did they carry a language somewhere it had not been?
            Are they still read, sung or argued about? Anyone clearing two of the
            three was a candidate; breadth across language and period settled the
            rest.
          </p>
          <p>
            The result is deliberately uneven in one direction: it includes the
            anonymous and the ancient alongside living novelists, because a list
            of Indian literature that starts in 1850 is not a list of Indian
            literature.
          </p>

          <h2 className="pt-6 font-serif text-2xl text-foreground">
            About the dates
          </h2>
          <p>
            For anyone before about 1800, dates are traditional, contested, or
            both. Valmiki, Vyasa and Thiruvalluvar are given as centuries-wide
            ranges because that is the honest state of the scholarship.
            Attributions follow tradition where tradition is what survives — the
            Ramayana is Valmiki&rsquo;s in the sense that matters, whoever held
            the stylus.
          </p>

          <h2 className="pt-6 font-serif text-2xl text-foreground">
            About the quotations
          </h2>
          <p>
            Quoted lines appear in English. Translating a Kural couplet or a
            Ghalib sher costs most of what makes it worth quoting, so these are
            offered as an indication of sense, not as a published translation.
            Where a verse is numbered, the numbering follows the standard
            edition &mdash; Kural 571 for the couplet on compassion, vachana 820
            in Ramanujan&rsquo;s ordering for Basavanna &mdash; though editions
            differ. Valmiki&rsquo;s line is a gloss on the traditional account
            of the first shloka, not a quotation from the text.
          </p>

          <h2 className="pt-6 font-serif text-2xl text-foreground">
            Where disagreement is visible
          </h2>
          <p>
            Ismat Chughtai&rsquo;s birth year is given as 1911 or 1915 because
            sources genuinely split on it. Thakazhi&rsquo;s 1984 Jnanpith is
            listed without a work, since the citation is recorded variously as{" "}
            <em>Kayar</em> and <em>Oru Desathinte Katha</em>. Award years were
            checked against the Jnanpith and Sahitya Akademi records; anything
            that could not be corroborated was removed rather than kept.
          </p>
        </div>

        {kabir?.quote ? (
          <div className="mt-14">
            <QuoteBlock
              text={kabir.quote.text}
              attribution={kabir.name}
              source={kabir.quote.source}
            />
          </div>
        ) : null}

        <div className="mt-14 rounded-lg border border-line bg-surface p-6">
          <h2 className="font-serif text-lg text-foreground">
            How the site is built
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Every page reads from one typed dataset in{" "}
            <code className="font-mono text-xs text-accent">
              src/data/writers.ts
            </code>
            , queried through helpers in{" "}
            <code className="font-mono text-xs text-accent">
              src/lib/writers.ts
            </code>
            . Nothing is hard-coded into a page: adding a writer to the array
            makes them appear in the collection, the timeline, their language
            group, the honours page and their own detail page at once.
          </p>
          <Link
            href="/writers"
            className="mt-5 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Browse the collection &rarr;
          </Link>
        </div>
      </Container>
    </>
  );
}
