import type { Work } from "@/data/writers";

type WorkListProps = {
  works: Work[];
};

export default function WorkList({ works }: WorkListProps) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {works.map((work) => (
        <li
          key={work.title}
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3"
        >
          <span className="font-serif text-base text-foreground italic">
            {work.title}
          </span>
          <span className="text-sm text-muted">
            {work.note}
            {work.note && work.year ? " · " : ""}
            {work.year}
          </span>
        </li>
      ))}
    </ul>
  );
}
