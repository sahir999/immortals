type StatCardProps = {
  value: string | number;
  label: string;
  hint?: string;
};

export default function StatCard({ value, label, hint }: StatCardProps) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <p className="font-serif text-3xl leading-none text-accent sm:text-4xl">
        {value}
      </p>
      <p className="mt-3 text-sm font-medium text-foreground">{label}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
