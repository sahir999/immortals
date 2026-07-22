type QuoteBlockProps = {
  text: string;
  attribution: string;
  source?: string;
  size?: "md" | "lg";
};

export default function QuoteBlock({
  text,
  attribution,
  source,
  size = "md",
}: QuoteBlockProps) {
  return (
    <figure className="border-l-2 border-accent pl-6">
      <blockquote
        className={`font-serif leading-relaxed text-balance text-foreground ${
          size === "lg" ? "text-xl sm:text-2xl" : "text-lg"
        }`}
      >
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-sm text-muted">
        <span className="font-medium text-foreground">{attribution}</span>
        {source ? <span> &middot; {source}</span> : null}
      </figcaption>
    </figure>
  );
}
