import Link from "next/link";
import EraStrip from "@/components/home/EraStrip";
import Hero from "@/components/home/Hero";
import LanguageMosaic from "@/components/home/LanguageMosaic";
import Container from "@/components/layout/Container";
import QuoteBlock from "@/components/ui/QuoteBlock";
import SectionHeading from "@/components/ui/SectionHeading";
import WriterGrid from "@/components/writers/WriterGrid";
import {
  getFeaturedWriters,
  getWritersByEra,
  getWritersByLanguage,
  getWritersWithHonour,
  getWriterBySlug,
} from "@/lib/writers";

export default function Home() {
  const featured = getFeaturedWriters(6);
  const eraGroups = getWritersByEra();
  const languageGroups = getWritersByLanguage();
  const laureates = [
    ...getWritersWithHonour("nobel"),
    ...getWritersWithHonour("booker"),
  ];
  const tagore = getWriterBySlug("rabindranath-tagore");

  return (
    <>
      <Hero />

      <Container width="wide" className="py-16 sm:py-24">
        <SectionHeading
          eyebrow="Start here"
          title="Six to read first"
          description="If the whole collection is too much at once, these six between them cover the epic, the devotional, the colonial novel and the modern short story."
          action={{ href: "/writers", label: "See everyone" }}
        />
        <div className="mt-10">
          <WriterGrid writers={featured} variant="feature" />
        </div>
      </Container>

      <div className="rule-fade h-px" />

      <Container width="wide" className="py-16 sm:py-24">
        <SectionHeading
          eyebrow="The long view"
          title="Five eras, one continuous argument"
          description="Each period inherits the last one's forms and then breaks them. The bhakti poets abandoned Sanskrit; the renaissance novelists abandoned verse; the moderns abandoned the village for the city and then went back."
          action={{ href: "/timeline", label: "Full timeline" }}
        />
        <div className="mt-10">
          <EraStrip groups={eraGroups} />
        </div>
      </Container>

      {tagore?.quote ? (
        <section className="border-y border-line bg-surface">
          <Container className="py-16 sm:py-20">
            <QuoteBlock
              text={tagore.quote.text}
              attribution={tagore.name}
              source={tagore.quote.source}
              size="lg"
            />
          </Container>
        </section>
      ) : null}

      <Container width="wide" className="py-16 sm:py-24">
        <SectionHeading
          eyebrow="Many tongues"
          title="No single language holds it"
          description="Sanskrit and Tamil are older than most literatures anywhere. Bengali, Hindi, Urdu, Kannada, Malayalam, Telugu, Marathi, Odia, Gujarati and Punjabi each carry a canon of their own — and English is only the most recent arrival."
          action={{ href: "/languages", label: "Browse by language" }}
        />
        <div className="mt-10">
          <LanguageMosaic groups={languageGroups} />
        </div>
      </Container>

      <div className="rule-fade h-px" />

      <Container width="wide" className="py-16 sm:py-24">
        <SectionHeading
          eyebrow="Recognition"
          title="A Nobel, and the Bookers that followed"
          description="Tagore took the prize in 1913, the first laureate from outside Europe. Seventy years later Indian writing in English arrived at the Booker, and in 2022 the International Booker finally crossed into an Indian language."
          action={{ href: "/honours", label: "All honours" }}
        />
        <div className="mt-10">
          <WriterGrid writers={laureates} columns={2} />
        </div>
      </Container>

      <Container className="pb-8">
        <div className="rounded-lg border border-line bg-surface p-8 text-center sm:p-12">
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
            Everything, in one searchable list
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
            Filter by language or era, or search across names, regions and the
            titles of individual works.
          </p>
          <Link
            href="/writers"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Open the collection
          </Link>
        </div>
      </Container>
    </>
  );
}
