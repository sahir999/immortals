import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import WriterGrid from "@/components/writers/WriterGrid";
import WriterCard from "@/components/writers/WriterCard";
import {
  getUnawardedGreats,
  getWritersByHonour,
  getWritersWithHonour,
} from "@/lib/writers";

export const metadata: Metadata = {
  title: "Honours",
  description:
    "The Nobel, the Booker Prizes, the Jnanpith, the Sahitya Akademi Award and the Padma honours, and the writers in this collection who hold them.",
};

export default function HonoursPage() {
  const groups = getWritersByHonour();
  const unawarded = getUnawardedGreats();

  const nobel = getWritersWithHonour("nobel").length;
  const booker = getWritersWithHonour("booker").length;
  const jnanpith = getWritersWithHonour("jnanpith").length;
  const akademi = getWritersWithHonour("sahitya-akademi").length;

  return (
    <>
      <PageHeader
        eyebrow="Recognition"
        title="Prizes, and the writers who predate them"
        description="The Jnanpith began in 1961, the Sahitya Akademi Award in 1955. Almost everything great in Indian literature was written before either existed — so this page ends with the figures no committee ever got to consider."
      />

      <Container width="wide" className="py-12 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard value={nobel} label="Nobel laureate" hint="Tagore, 1913" />
          <StatCard
            value={booker}
            label="Booker winners"
            hint="Including the International Booker"
          />
          <StatCard
            value={jnanpith}
            label="Jnanpith recipients"
            hint="India's highest literary honour"
          />
          <StatCard
            value={akademi}
            label="Sahitya Akademi Awards"
            hint="Given in each language separately"
          />
        </div>

        <div className="mt-20 space-y-20">
          {groups.map((group) => (
            <section key={group.honour.key} id={group.honour.key} className="scroll-mt-24">
              <div className="max-w-2xl border-b border-line pb-4">
                <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                  {group.honour.label}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {group.honour.blurb}
                </p>
              </div>

              <div className="mt-8">
                <WriterGrid writers={group.writers} />
              </div>
            </section>
          ))}

          <section className="border-t border-line pt-16">
            <div className="max-w-2xl">
              <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                Before the age of prizes
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Valmiki, Kalidasa, Thiruvalluvar, Kabir, Ghalib and the rest hold
                no medals. Their standing rests on the older honour of being
                copied, sung, argued with and never once out of circulation.
              </p>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {unawarded.map((writer) => (
                <li key={writer.slug}>
                  <WriterCard writer={writer} variant="compact" />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </>
  );
}
