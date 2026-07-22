import Link from "next/link";
import Container from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
        404
      </p>
      <h1 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
        No such page
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
        The writer or page you were looking for is not in this collection.
      </p>
      <Link
        href="/writers"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Browse all writers
      </Link>
    </Container>
  );
}
