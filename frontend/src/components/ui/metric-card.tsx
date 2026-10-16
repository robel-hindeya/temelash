import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Skeleton } from "./states";

/**
 * One headline number with its label. The value is pre-formatted by the caller (locale-aware numbers) and
 * comes from the backend's metric definitions; this component never calculates anything.
 */
export function MetricCard({
  label,
  value,
  hint,
  loading = false,
  emphasis = false,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  /** Supporting line: the period, a comparison in words, or a "what is this" note. */
  hint?: ReactNode;
  loading?: boolean;
  /** For the single north-star metric. */
  emphasis?: boolean;
  className?: string;
}) {
  const labelId = useId();
  return (
    <article
      aria-labelledby={labelId}
      aria-busy={loading || undefined}
      className={cn(
        "rounded-card border bg-surface p-4 sm:p-5 shadow-sm transition-shadow",
        emphasis ? "border-gold-500 ring-2 ring-gold-300" : "border-border",
        className,
      )}
    >
      <p id={labelId} className="text-xs sm:text-sm font-medium text-charcoal-700 line-clamp-1">
        {label}
      </p>
      {loading ? (
        <Skeleton className="mt-2.5 h-8 sm:h-9 w-20 sm:w-24" />
      ) : (
        <p
          className={cn(
            "mt-1.5 font-bold text-green-900 tabular-nums tracking-tight",
            emphasis ? "text-2xl sm:text-4xl" : "text-xl sm:text-3xl",
          )}
        >
          {value}
        </p>
      )}
      {hint ? <p className="mt-1 text-xs sm:text-sm text-muted line-clamp-1">{hint}</p> : null}
    </article>
  );
}
