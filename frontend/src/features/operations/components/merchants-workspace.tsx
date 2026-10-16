"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Badge,
  EmptyState,
  ErrorState,
  FormField,
  MetricCard,
  Pagination,
  SearchField,
  Select,
  Skeleton,
  SkeletonGroup,
} from "@/components/ui";
import { Logo } from "@/components/layout/logo";
import { pickLocalized } from "@/features/enrollment/localized";
import { ResponsiveTable } from "@/features/org/responsive-table";
import { usePaged } from "@/features/org/use-paged";
import { getBrowserApi } from "@/lib/api/browser";
import type { PlatformMerchant } from "@/lib/api/contract";
import { toApiError } from "@/lib/errors/api-error";
import { describeApiError } from "@/lib/errors/messages";
import { useI18n } from "@/lib/i18n/client";
import { MERCHANT_STATUS_LABEL, MERCHANT_STATUS_TONE, filterMerchants } from "../ops-rules";

/** The merchant list. The backend returns it whole (no paging), so it is searched, filtered and paged here. */
export function MerchantsWorkspace() {
  const { t, locale, format } = useI18n();
  const list = useQuery({
    queryKey: ["ops", "merchants"],
    queryFn: ({ signal }) => getBrowserApi().operations.merchants(signal),
  });
  const [filter, setFilter] = useState({ search: "", status: "" });
  const shown = useMemo(() => filterMerchants(list.data ?? [], filter), [list.data, filter]);
  const paged = usePaged(shown);

  const n = (val: number) => format.integer(val);

  if (list.isPending) {
    return (
      <SkeletonGroup className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-28 rounded-card" />
          <Skeleton className="h-28 rounded-card" />
          <Skeleton className="h-28 rounded-card" />
          <Skeleton className="h-28 rounded-card" />
        </div>
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </SkeletonGroup>
    );
  }
  if (list.isError) {
    const failure = toApiError(list.error);
    return (
      <ErrorState
        title={t("ops.merchantsLoadError")}
        description={describeApiError(failure, t).description}
        requestId={failure.requestId}
        onRetry={() => void list.refetch()}
        retrying={list.isFetching}
      />
    );
  }

  const merchantsData = list.data ?? [];
  const totalCount = merchantsData.length;
  const activeCount = merchantsData.filter((m) => m.status === "ACTIVE").length;
  const suspendedCount = merchantsData.filter((m) => m.status === "SUSPENDED").length;
  const deactivatedCount = merchantsData.filter((m) => m.status === "DEACTIVATED").length;

  const nameOf = (m: PlatformMerchant) => pickLocalized(locale, m.nameEn, m.nameAm);
  const status = (m: PlatformMerchant) => (
    <Badge tone={MERCHANT_STATUS_TONE[m.status]}>{t(MERCHANT_STATUS_LABEL[m.status])}</Badge>
  );
  const open = (m: PlatformMerchant) => (
    <Link
      className="touch-target inline-flex items-center gap-1.5 rounded-lg border border-green-700/80 bg-surface px-3 py-1 text-xs font-semibold text-green-800 hover:bg-green-700 hover:text-white hover:border-green-700 shadow-2xs transition-all active:scale-[0.98]"
      href={`/${locale}/operations/merchants/${m.id}`}
    >
      <span>{t("ops.view")}</span>
      <span aria-hidden="true">→</span>
      <span className="sr-only"> — {nameOf(m).text}</span>
    </Link>
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Top Merchant KPI Metric Cards */}
      <section aria-label={t("ops.tileMerchants")} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label={t("ops.tileMerchants")}
          value={n(totalCount)}
          hint={t("ops.merchantsSubtitle")}
          className="border-green-300/80 bg-gradient-to-br from-surface via-green-50/40 to-green-100/30 shadow-xs hover:shadow-sm hover:border-green-400 transition-all"
        />

        <MetricCard
          label={t("ops.statusActive")}
          value={n(activeCount)}
          hint={`${n(activeCount)} / ${n(totalCount)}`}
          className="border-emerald-200/80 bg-gradient-to-br from-surface via-emerald-50/20 to-emerald-100/20 shadow-xs hover:shadow-sm hover:border-emerald-300 transition-all"
        />

        <MetricCard
          label={t("ops.statusSuspended")}
          value={n(suspendedCount)}
          hint={`${n(suspendedCount)} / ${n(totalCount)}`}
          className="border-amber-200/80 bg-gradient-to-br from-surface via-amber-50/20 to-amber-100/20 shadow-xs hover:shadow-sm hover:border-amber-300 transition-all"
        />

        <MetricCard
          label={t("ops.statusDeactivated")}
          value={n(deactivatedCount)}
          hint={`${n(deactivatedCount)} / ${n(totalCount)}`}
          className="border-border/80 bg-gradient-to-br from-surface to-charcoal-50/30 shadow-xs hover:shadow-sm hover:border-border transition-all"
        />
      </section>

      {/* Main Table Card Container */}
      <div className="flex flex-col gap-5 rounded-2xl border border-border/80 bg-surface p-6 shadow-sm">
        {/* Header with Title, TemelashCard Logo and Count */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-green-200/80 p-1.5 shadow-2xs ring-2 ring-green-600/5">
              <Logo className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {t("ops.merchantsTableLabel")}
              </h2>
              <p className="text-xs text-muted">{t("ops.merchantsSubtitle")}</p>
            </div>
          </div>
          <Badge tone="neutral">{n(shown.length)}</Badge>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end justify-between rounded-xl bg-cream-50/60 p-3.5 border border-border/60">
          <div className="flex-1 min-w-0">
            <SearchField
              label={t("ops.searchLabel")}
              placeholder={t("ops.searchPlaceholder")}
              onSearch={(search) => {
                setFilter((f) => ({ ...f, search }));
                paged.reset();
              }}
            />
          </div>
          <div className="w-full sm:w-64">
            <FormField label={t("ops.filterStatus")}>
              <Select
                value={filter.status}
                onChange={(event) => {
                  setFilter((f) => ({ ...f, status: event.target.value }));
                  paged.reset();
                }}
              >
                <option value="">{t("ops.anyStatus")}</option>
                <option value="ACTIVE">{t("ops.statusActive")}</option>
                <option value="SUSPENDED">{t("ops.statusSuspended")}</option>
                <option value="DEACTIVATED">{t("ops.statusDeactivated")}</option>
              </Select>
            </FormField>
          </div>
        </div>

        {/* Content Table or Empty State */}
        {merchantsData.length === 0 ? (
          <EmptyState title={t("ops.merchantsEmpty")} />
        ) : shown.length === 0 ? (
          <EmptyState title={t("ops.merchantsNoMatch")} />
        ) : (
          <>
            <ResponsiveTable
              label={t("ops.merchantsTableLabel")}
              items={paged.slice}
              rowKey={(m) => m.id}
              columns={[
                {
                  id: "name",
                  header: t("ops.colName"),
                  rowHeader: true,
                  cell: (m) => (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-700 to-green-900 font-bold text-xs text-white shadow-xs tracking-wider border border-green-600/30">
                        {(nameOf(m).text || m.slug).slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground leading-tight" lang={nameOf(m).lang}>
                          {nameOf(m).text}
                        </p>
                        {locale === "en" && m.nameAm ? (
                          <p className="text-xs text-muted" lang="am">{m.nameAm}</p>
                        ) : locale === "am" && m.nameEn ? (
                          <p className="text-xs text-muted" lang="en">{m.nameEn}</p>
                        ) : null}
                      </div>
                    </div>
                  ),
                },
                {
                  id: "slug",
                  header: t("ops.colSlug"),
                  cell: (m) => (
                    <code className="text-xs font-mono font-medium text-charcoal-800 bg-cream-100/90 px-2.5 py-1 rounded-md border border-border/70">
                      {m.slug}
                    </code>
                  ),
                },
                { id: "status", header: t("ops.colStatus"), cell: status },
                { id: "actions", header: t("ops.colActions"), cell: open },
              ]}
              card={(m) => (
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-700 to-green-900 font-bold text-xs text-white shadow-xs tracking-wider border border-green-600/30">
                        {(nameOf(m).text || m.slug).slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground" lang={nameOf(m).lang}>
                          {nameOf(m).text}
                        </p>
                        {locale === "en" && m.nameAm ? (
                          <p className="text-xs text-muted" lang="am">{m.nameAm}</p>
                        ) : locale === "am" && m.nameEn ? (
                          <p className="text-xs text-muted" lang="en">{m.nameEn}</p>
                        ) : null}
                      </div>
                    </div>
                    {status(m)}
                  </div>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm border-t border-border/50 pt-2">
                    <dt className="text-muted">{t("ops.colSlug")}</dt>
                    <dd className="font-mono text-xs">{m.slug}</dd>
                  </dl>
                  <div className="pt-1">{open(m)}</div>
                </div>
              )}
            />
            <Pagination
              hasPrevious={paged.hasPrevious}
              hasNext={paged.hasNext}
              onPrevious={paged.previous}
              onNext={paged.next}
              from={paged.from}
              to={paged.to}
              total={paged.total}
            />
          </>
        )}
      </div>
    </div>
  );
}
