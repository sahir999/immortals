import WriterCard from "@/components/writers/WriterCard";
import type { Writer } from "@/data/writers";

type WriterGridProps = {
  writers: Writer[];
  variant?: "default" | "feature" | "compact";
  columns?: 2 | 3;
  emptyMessage?: string;
};

export default function WriterGrid({
  writers,
  variant = "default",
  columns = 3,
  emptyMessage = "Nothing matches those filters.",
}: WriterGridProps) {
  if (writers.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line px-6 py-12 text-center text-sm text-muted">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul
      className={`grid gap-5 sm:grid-cols-2 ${
        columns === 3 ? "lg:grid-cols-3" : ""
      }`}
    >
      {writers.map((writer) => (
        <li key={writer.slug} className="h-full">
          <WriterCard writer={writer} variant={variant} />
        </li>
      ))}
    </ul>
  );
}
