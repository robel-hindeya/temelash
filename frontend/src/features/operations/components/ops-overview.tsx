"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Badge, MetricCard } from "@/components/ui";
import { DashboardSection } from "@/features/dashboard/components/section";
import { getBrowserApi } from "@/lib/api/browser";
import { useI18n } from "@/lib/i18n/client";
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
  const n = (value: number) => format.integer(value);
  const count = (status: string) => merchants.data?.filter((m) => m.status === status).length ?? 0;

  const totalMerchants = merchants.data?.length ?? 0;
  const totalJobs = stats.data
    ? Object.values(stats.data).reduce((acc, val) => acc + (val ?? 0), 0)
    : 0;

  return (
    <div className="flex flex-col gap-8">
      {/* Top Headline Metric Strip: 3 balanced KPI cards */}
      <section aria-label={t("ops.tileSystem")} className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          label={t("ops.tileSystem")}
          value={
            <Badge tone={health.ready ? "success" : "danger"}>
              {health.ready ? t("ops.readyYes") : t("ops.readyNo")}
            </Badge>
          }
          hint={health.live ? t("ops.systemLive") : t("ops.systemUnreachable")}
          className="border-green-200/60 bg-gradient-to-br from-surface to-green-50/20"
        />

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
          label={t("ops.tileJobs")}
          value={stats.isPending ? "…" : n(totalJobs)}
          hint={
            stats.data
              ? `${n(stats.data["COMPLETED"] ?? 0)} ${t("ops.jobCompleted")}`
              : undefined
          }
          className="border-border/80 hover:border-primary/40 transition-colors"
        />
      </section>

      {/* Main 2-column Operational Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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

        {/* Background Jobs Card */}
        <DashboardSection
          id="jobs"
          title={t("ops.tileJobs")}
          query={stats}
          className="flex flex-col justify-between"
        >
          {stats.data ? (
            <div className="flex flex-col gap-5">
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {JOB_STATUS_ORDER.map((status) => {
                  const val = stats.data[status] ?? 0;
                  const isDead = status === "DEAD" && val > 0;
                  return (
                    <div
                      key={status}
                      className={`rounded-control border p-3.5 transition-all hover:shadow-xs ${
                        isDead
                          ? "border-danger/40 bg-red-50/30"
                          : "border-border/70 bg-surface/50 hover:bg-surface"
                      }`}
                    >
                      <dt className="text-xs font-semibold tracking-wider uppercase text-muted">
                        {t(JOB_STATUS_LABEL[status]!)}
                      </dt>
                      <dd
                        className={`mt-1 text-2xl font-bold tabular-nums ${
                          isDead ? "text-danger" : "text-foreground"
                        }`}
                        data-testid={`jobs-${status}`}
                      >
                        {n(val)}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              {/* Progress/Health Bar */}
              <div className="rounded-control border border-border/60 bg-surface/40 p-3">
                <div className="flex items-center justify-between text-xs text-muted mb-1.5">
                  <span className="font-medium">{t("ops.walletSubtitle")}</span>
                  <span className="font-mono font-semibold text-foreground">
                    {stats.data["COMPLETED"] ?? 0} / {totalJobs}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-border/60">
                  <div
                    className="h-full bg-primary transition-all duration-500 rounded-full"
                    style={{
                      width:
                        totalJobs > 0
                          ? `${Math.round(((stats.data["COMPLETED"] ?? 0) / totalJobs) * 100)}%`
                          : "100%",
                    }}
                  />
                </div>
              </div>

              <div className="pt-1">
                <Link
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover hover:underline transition-colors"
                  href={`/${locale}/operations/wallet-health`}
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
