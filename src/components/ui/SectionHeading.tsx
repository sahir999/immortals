import Link from "next/link";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-accent uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-serif text-2xl leading-tight tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          className="shrink-0 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {action.label} &rarr;
        </Link>
      ) : null}
    </div>
  );
}
