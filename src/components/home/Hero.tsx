import Link from "next/link";
import Container from "@/components/layout/Container";
import { site } from "@/config/site";
import { getStats } from "@/lib/writers";

export default function Hero() {
  const stats = getStats();

  return (
    <section className="border-b border-line bg-surface">
      <Container width="wide" className="py-20 sm:py-28">
        <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
          {site.tagline}
        </p>

        <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.08] tracking-tight text-balance text-foreground sm:text-6xl">
          Twenty-five centuries of writing, in a dozen languages, from one
          country.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          India has no single literary tradition. It has Sanskrit epic and Tamil
          ethics, Bhakti poets who abandoned the sacred language for the spoken
          one, novelists who invented prose fiction in Bengali and Odia, and a
          modern canon written in more than twenty languages at once. These are
          the people who built it.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/writers"
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Browse all {stats.writers} writers
          </Link>
          <Link
            href="/timeline"
            className="inline-flex h-11 items-center justify-center rounded-full border border-line px-6 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Walk the timeline
          </Link>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-10 sm:grid-cols-4">
          {[
            { value: stats.writers, label: "Writers" },
            { value: stats.languages, label: "Languages" },
            { value: stats.works, label: "Works listed" },
            { value: stats.eras, label: "Eras" },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs tracking-wide text-muted uppercase">
                {stat.label}
              </dt>
              <dd className="mt-1 font-serif text-3xl text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
