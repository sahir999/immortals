import Link from "next/link";
import Container from "@/components/layout/Container";
import { navigation, site } from "@/config/site";
import { getStats } from "@/lib/writers";

export default function SiteFooter() {
  const stats = getStats();

  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <Container width="wide" className="py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-lg text-foreground">{site.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {stats.writers} writers, {stats.languages} languages and some two
              and a half thousand years of literature made in India.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
              Browse
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-muted">
          A reference project. Dates for pre-modern figures are traditional or
          contested; where scholarship disagrees, the range is given rather than
          a single year.
        </p>
      </Container>
    </footer>
  );
}
