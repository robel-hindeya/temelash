"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  Alert,
  EmptyState,
  MetricCard,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
  RowHeader,
} from "@/components/ui";
import { pickLocalized } from "@/features/enrollment/localized";
import { createFormatter } from "@/lib/i18n/format";
import { useI18n } from "@/lib/i18n/client";
import { paramsFor, rangeFromParams } from "../range";
import {
  useBranchActivity,
  useDefinitions,
  useOverview,
} from "../use-dashboard-data";
import { DateRangeControl } from "./date-range-control";
import { DashboardSection } from "./section";

/**
 * The merchant overview. Every figure is exactly what the backend returned for the chosen days, using the
 * backend's own metric definitions: this component picks the dates, formats numbers for the language and time zone,
 * and lays things out. It adds up, averages and compares nothing, and it has no money anywhere: loyalty activity
 * only.
 */
export function OverviewDashboard({
  timeZone,
  today,
  canReadAnalytics,
}: {
  timeZone: string;
  /** Today's date in the business time zone, decided on the server so the first render matches it. */
  today: string;
  canReadAnalytics: boolean;
}) {
  const { t, locale } = useI18n();
  const format = useMemo(() => createFormatter(locale, timeZone), [locale, timeZone]);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { range, preset } = rangeFromParams(params, today);

  const overview = useOverview(range, canReadAnalytics);
  const branches = useBranchActivity(range, canReadAnalytics);
  const definitions = useDefinitions(canReadAnalytics);

  const go = (query: string) => router.replace(`${pathname}${query}`, { scroll: false });
  const failedSections = [overview, branches].filter(
    (q) => q.isError,
  ).length;

  const n = (value: number) => format.integer(value);
  const data = overview.data;
  const totalUsers = overview.data?.totalCustomers;
  const quiet =
    data !== undefined &&
    data.stampsIssued.count === 0 &&
    data.newMembers === 0 &&
    data.activeMembers === 0 &&
    data.rewardsUnlocked === 0 &&
    data.rewardsRedeemed === 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <DateRangeControl
          preset={preset}
          range={range}
          onPreset={(p) => go(paramsFor(p))}
          onCustom={(r) => go(paramsFor(r))}
        />
        <p className="text-sm text-muted" data-testid="range-summary">
          {t("dashboard.rangeShown", {
            from: format.calendarDate(range.from),
            to: format.calendarDate(range.to),
          })}
          {" · "}
          {t("dashboard.timezoneNote", { zone: timeZone })}
        </p>
      </div>

      {failedSections > 0 ? (
        <Alert tone="warning" title={t("dashboard.partialTitle")}>
          {t("dashboard.partialBody")}
        </Alert>
      ) : null}

      {!canReadAnalytics ? (
        <Alert tone="info">{t("dashboard.noAnalyticsAccess")}</Alert>
      ) : (
        <>
          {quiet ? <Alert tone="info">{t("dashboard.emptyPeriod")}</Alert> : null}

          <section
            aria-label={t("dashboard.thisPeriod")}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            <MetricCard
              emphasis
              label={t("dashboard.allUsers")}
              loading={overview.isPending}
              value={
                totalUsers !== undefined
                  ? n(totalUsers)
                  : overview.isError
                    ? "—"
                    : ""
              }
              hint={t("dashboard.allUsersHint")}
            />
            <MetricCard
              label={t("dashboard.newMembers")}
              loading={overview.isPending}
              value={data ? n(data.newMembers) : "—"}
              hint={t("dashboard.thisPeriod")}
            />
            <MetricCard
              label={t("dashboard.inProgress")}
              loading={overview.isPending}
              value={data ? n(data.activeMembers) : "—"}
              hint={t("dashboard.inProgressHint")}
            />
            <MetricCard
              label={t("dashboard.done")}
              loading={overview.isPending}
              value={data ? n(data.rewardsUnlocked) : "—"}
              hint={t("dashboard.doneHint")}
            />
          </section>

          {overview.isError ? (
            <DashboardSection id="overview" title={t("dashboard.thisPeriod")} query={overview}>
              {null}
            </DashboardSection>
          ) : null}

          {definitions.data && definitions.data.length > 0 ? (
            <details
              className="rounded-card border border-border bg-surface p-4"
              data-testid="definitions"
            >
              <summary className="cursor-pointer font-medium text-green-800">
                {t("dashboard.definitionsToggle")}
              </summary>
              <p className="mt-2 text-sm text-muted">{t("dashboard.definitionsNote")}</p>
              <dl className="mt-3 grid gap-3">
                {definitions.data.map((d) => (
                  <div key={d.key}>
                    <dt className="font-semibold">{d.name}</dt>
                    <dd className="text-charcoal-700">{d.definition}</dd>
                  </div>
                ))}
              </dl>
            </details>
          ) : null}

          <div className="grid grid-cols-1 gap-6">
            <DashboardSection
              id="branches"
              title={t("dashboard.branchesTitle")}
              query={branches}
              empty={
                branches.data &&
                branches.data.items.every((b) => b.stamps === 0 && b.redemptions === 0) ? (
                  <EmptyState title={t("dashboard.branchesEmpty")} />
                ) : undefined
              }
            >
              {branches.data ? (
                <>
                  {/* Mobile stacked branch activity cards (phone-first UI) */}
                  <div className="sm:hidden flex flex-col gap-3">
                    {branches.data.items.map((b) => {
                      const name = pickLocalized(locale, b.nameEn, b.nameAm);
                      return (
                        <div
                          key={`mobile-${b.branchId}`}
                          className="rounded-2xl border border-border/80 bg-surface p-4 shadow-2xs flex flex-col gap-3"
                        >
                          <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-2.5">
                            <h4 className="font-bold text-foreground text-base" lang={name.lang}>
                              {name.text}
                            </h4>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                              {n(b.stamps)}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="flex flex-col bg-cream-50/70 rounded-xl p-2 border border-border/50">
                              <span className="text-[11px] font-semibold text-muted uppercase">
                                {t("dashboard.colStamps")}
                              </span>
                              <span className="text-base font-bold text-green-900 mt-0.5">
                                {n(b.stamps)}
                              </span>
                            </div>
                            <div className="flex flex-col bg-cream-50/70 rounded-xl p-2 border border-border/50">
                              <span className="text-[11px] font-semibold text-muted uppercase">
                                {t("dashboard.colCustomers")}
                              </span>
                              <span className="text-base font-bold text-foreground mt-0.5">
                                {n(b.uniqueCustomers)}
                              </span>
                            </div>
                            <div className="flex flex-col bg-cream-50/70 rounded-xl p-2 border border-border/50">
                              <span className="text-[11px] font-semibold text-muted uppercase">
                                {t("dashboard.colRedemptions")}
                              </span>
                              <span className="text-base font-bold text-green-800 mt-0.5">
                                {n(b.redemptions)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tablet and Desktop Table */}
                  <div className="hidden sm:block">
                    <Table label={t("dashboard.branchesCaption")}>
                      <THead>
                        <TR>
                          <TH>{t("dashboard.colBranch")}</TH>
                          <TH>{t("dashboard.colStamps")}</TH>
                          <TH>{t("dashboard.colCustomers")}</TH>
                          <TH>{t("dashboard.colRedemptions")}</TH>
                        </TR>
                      </THead>
                      <TBody>
                        {branches.data.items.map((b) => {
                          const name = pickLocalized(locale, b.nameEn, b.nameAm);
                          return (
                            <TR key={b.branchId}>
                              <RowHeader lang={name.lang}>{name.text}</RowHeader>
                              <TD>{n(b.stamps)}</TD>
                              <TD>{n(b.uniqueCustomers)}</TD>
                              <TD>{n(b.redemptions)}</TD>
                            </TR>
                          );
                        })}
                      </TBody>
                    </Table>
                  </div>
                </>
              ) : null}
            </DashboardSection>
          </div>
        </>
      )}
    </div>
  );
}
