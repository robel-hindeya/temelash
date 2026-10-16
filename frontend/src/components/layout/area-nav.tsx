"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n/client";

export interface NavLink {
  id: string;
  href: string;
  label: string;
}

/**
 * Navigation for one area. The list already contains only the entries the person may open (the server decided);
 * this component just renders it. Below the `md` breakpoint the list folds behind a "Menu" button so a long
 * Amharic label never has to squeeze into a header. The current page is marked with aria-current.
 */
export function AreaNav({
  items,
  label,
  orientation = "horizontal",
}: {
  items: NavLink[];
  label: string;
  orientation?: "horizontal" | "vertical";
}) {
  const pathname = usePathname() ?? "";
  const t = useT();
  const [open, setOpen] = useState(false);
  const listId = useId();
  const hydrated = useHydrated();
  if (items.length === 0) return null;

  // "/en/dashboard" must not mark every dashboard page as current: exact match, or a deeper path of a
  // non-root entry.
  const isCurrent = (href: string) =>
    pathname === href ||
    (items.some((i) => i.href !== href && i.href.startsWith(`${href}/`))
      ? false
      : pathname.startsWith(`${href}/`));

  return (
    <nav aria-label={label} className="min-w-0 w-full" data-hydrated={hydrated}>
      <div className="flex items-center gap-2 md:hidden">
        {items.length > 1 ? (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => setOpen((v) => !v)}
            className="touch-target inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface px-3 py-1.5 text-xs font-semibold text-green-900 shadow-2xs shrink-0"
          >
            <span>{t("nav.menu")}</span>
            <span aria-hidden="true" className="text-[10px]">{open ? "▲" : "▼"}</span>
          </button>
        ) : null}

        {/* Mobile Horizontal Scrollable Tab Bar */}
        <div className="flex-1 overflow-x-auto no-scrollbar py-1">
          <ul className="flex items-center gap-1.5 flex-nowrap min-w-max">
            {items.map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={`pill-${item.id}`} className="shrink-0">
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "inline-flex items-center rounded-xl px-3 py-1.5 text-xs font-semibold no-underline transition-all whitespace-nowrap",
                      current
                        ? "bg-green-800 text-white shadow-2xs"
                        : "bg-surface border border-border/70 text-charcoal-700 hover:bg-cream-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <ul
        id={listId}
        className={cn(
          "mt-2 flex-col gap-1 md:mt-0 md:flex",
          open ? "flex" : "hidden",
          orientation === "horizontal" ? "md:flex-row md:flex-wrap" : "md:w-full",
        )}
      >
        {items.map((item) => {
          const current = isCurrent(item.href);
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "touch-target flex items-center rounded-xl px-3.5 py-2.5 text-sm no-underline transition-all",
                  current
                    ? "bg-primary text-white shadow-2xs font-semibold"
                    : "text-charcoal-800 hover:bg-cream-100/90 hover:text-green-950 font-medium",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
