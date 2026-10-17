import { useCountUp } from "@/lib/motion";

/**
 * A number like "130+" that counts up the first time it scrolls into view. The real value is
 * server-rendered (and read to screen readers), so nothing is lost without JavaScript.
 */
export function StatValue({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const { ref, value: n } = useCountUp(target);
  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref as React.Ref<HTMLSpanElement>} className={className}>
      <span aria-hidden className="stat-value">
        {n}
        <span className="gradient-text">{suffix}</span>
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
