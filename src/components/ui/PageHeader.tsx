import Container from "@/components/layout/Container";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  meta,
}: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-surface">
      <Container width="wide" className="py-14 sm:py-20">
        <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
        {meta ? (
          <p className="mt-6 text-xs tracking-wide text-muted uppercase">
            {meta}
          </p>
        ) : null}
      </Container>
    </header>
  );
}
