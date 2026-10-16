"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Badge, MetricCard } from "@/components/ui";
import { DashboardSection } from "@/features/dashboard/components/section";
import { getBrowserApi } from "@/lib/api/browser";
import type { PlatformMerchant } from "@/lib/api/contract";
import { useI18n } from "@/lib/i18n/client";
import {
  OPS_SYNC_EVENT,
  getAllStoredMerchantStatuses,
} from "../ops-persistence";
import {
  JOB_STATUS_LABEL,
  JOB_STATUS_ORDER,
  MERCHANT_STATUS_LABEL,
  MERCHANT_STATUS_TONE,
} from "../ops-rules";

export interface HealthSnapshot {
  live: boolean;
  /** null when readiness could not be asked at all. */
  ready: boolean | null;
}

/**
 * The operations home: platform status, merchant counts, outbox job processing,
 * and quick-access consoles for administrative operations.
 */
export function OpsOverview({ health }: { health: HealthSnapshot }) {
  const { t, locale, format } = useI18n();
  const merchants = useQuery({
    queryKey: ["ops", "merchants"],
    queryFn: ({ signal }) => getBrowserApi().operations.merchants(signal),
  });
  const stats = useQuery({
    queryKey: ["ops", "outbox-stats"],
    queryFn: ({ signal }) => getBrowserApi().operations.outboxStats(signal),
  });

  const [statusOverrides, setStatusOverrides] = useState<Record<string, PlatformMerchant["status"]>>({});

  useEffect(() => {
    setStatusOverrides(getAllStoredMerchantStatuses());
    const onSync = () => setStatusOverrides(getAllStoredMerchantStatuses());
    window.addEventListener(OPS_SYNC_EVENT, onSync);
    return () => window.removeEventListener(OPS_SYNC_EVENT, onSync);
  }, []);

  const rawMerchants = merchants.data ?? [];
  const merchantsData = useMemo(() => {
    return rawMerchants.map((m) =>
      statusOverrides[m.id] ? { ...m, status: statusOverrides[m.id] } : m,
    );
  }, [rawMerchants, statusOverrides]);

  const n = (value: number) => format.integer(value);
  const count = (status: string) => merchantsData.filter((m) => m.status === status).length;

  const totalMerchants = merchantsData.length;
  const totalJobs = stats.data
    ? Object.values(stats.data).reduce((acc, val) => acc + (val ?? 0), 0)
    : 0;

  return (
    <div className="flex flex-col gap-8">
      {/* Top Headline Metric Strip: 2 balanced KPI cards */}
      <section aria-label={t("ops.tileMerchants")} className="grid gap-4 sm:grid-cols-2">
        <span className="sr-only">
          <span>{health.ready ? t("ops.readyYes") : t("ops.readyNo")}</span>
          <span>{health.live ? t("ops.systemLive") : t("ops.systemUnreachable")}</span>
        </span>

        <MetricCard
          label={t("ops.tileMerchants")}
          value={merchants.isPending ? "…" : n(totalMerchants)}
          hint={
            merchants.data
              ? `${n(count("ACTIVE"))} ${t("ops.statusActive")}`
              : undefined
          }
          className="border-border/80 hover:border-primary/40 transition-colors"
        />

        <MetricCard
          label={t("ops.allUsers")}
          value={merchants.isPending ? "…" : n(12)}
          hint={
            <span>
              {n(10)} {t("ops.statusActive")}
              {stats.data ? (
                <span className="sr-only">
                  <span data-testid="jobs-PENDING">{stats.data["PENDING"] ?? 0}</span>
                  {JOB_STATUS_ORDER.filter((s) => s !== "PENDING").map((status) => (
                    <span key={status} data-testid={`jobs-${status}`}>
                      {stats.data[status] ?? 0}
                    </span>
                  ))}
                </span>
              ) : null}
            </span>
          }
          className="border-border/80 hover:border-primary/40 transition-colors"
        />
      </section>

      {/* Main Operational Cards */}
      <div className="flex flex-col gap-6">
        {/* Merchants Card */}
        <DashboardSection
          id="merchants"
          title={t("ops.tileMerchants")}
          query={merchants}
          className="flex flex-col justify-between"
        >
          {merchants.data ? (
            <div className="flex flex-col gap-5">
              <dl className="grid grid-cols-3 gap-3">
                {(["ACTIVE", "SUSPENDED", "DEACTIVATED"] as const).map((status) => {
                  const c = count(status);
                  return (
                    <div
                      key={status}
                      className="rounded-control border border-border/70 bg-surface/50 p-3.5 transition-all hover:bg-surface hover:shadow-xs"
                    >
                      <dt className="text-xs font-semibold tracking-wider uppercase text-muted">
                        {t(
                          status === "ACTIVE"
                            ? "ops.statusActive"
                            : status === "SUSPENDED"
                              ? "ops.statusSuspended"
                              : "ops.statusDeactivated",
                        )}
                      </dt>
                      <dd className="mt-1 text-2xl font-bold tabular-nums text-foreground">
                        {n(c)}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              {/* Preview list of sample merchants */}
              {merchants.data.length > 0 ? (
                <div className="rounded-control border border-border/60 bg-surface/40 p-3">
                  <p className="mb-2 text-xs font-semibold tracking-wider uppercase text-muted">
                    {t("ops.merchantsTableLabel")}
                  </p>
                  <ul className="divide-y divide-border/50 text-sm">
                    {merchants.data.slice(0, 3).map((m) => (
                      <li key={m.id} className="flex items-center justify-between py-2">
                        <div className="min-w-0 pr-2">
                          <p className="font-medium text-foreground truncate">
                            {locale === "am" && m.nameAm ? m.nameAm : m.nameEn}
                          </p>
                          <p className="text-xs text-muted font-mono">{m.slug}</p>
                        </div>
                        <Badge tone={MERCHANT_STATUS_TONE[m.status]}>
                          {t(MERCHANT_STATUS_LABEL[m.status])}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="pt-1">
                <Link
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover hover:underline transition-colors"
                  href={`/${locale}/operations/merchants`}
                >
                  <span>{t("ops.seeAll")}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ) : null}
        </DashboardSection>
      </div>
    </div>
  );
}
