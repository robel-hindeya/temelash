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
import type { MessageKey } from "@/lib/i18n/translator";
import { paramsFor, rangeFromParams } from "../range";
import {
  useBranchActivity,
  useDefinitions,
  useOverview,
  useWalletHealth,
} from "../use-dashboard-data";
import { DateRangeControl } from "./date-range-control";
import { DashboardSection } from "./section";

const PROVIDER_LABEL: Record<string, MessageKey> = {
  APPLE: "dashboard.walletApple",
  GOOGLE: "dashboard.walletGoogle",
  WEB: "dashboard.walletWeb",
};

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
  const wallet = useWalletHealth(range, canReadAnalytics);
  const definitions = useDefinitions(canReadAnalytics);

  const go = (query: string) => router.replace(`${pathname}${query}`, { scroll: false });
  const failedSections = [overview, branches, wallet].filter(
    (q) => q.isError,
  ).length;

  const n = (value: number) => format.integer(value);
  const data = overview.data;
  const totalUsers = overview.data?.totalCustomers ?? wallet.data?.activeMemberships;
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
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <MetricCard
              emphasis
              label={t("dashboard.allUsers")}
              loading={
                (overview.isPending && wallet.isPending) ||
                (totalUsers === undefined && (overview.isPending || wallet.isPending))
              }
              value={
                totalUsers !== undefined
                  ? n(totalUsers)
                  : overview.isError && wallet.isError
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
              ) : null}
            </DashboardSection>

            <DashboardSection
              id="wallet"
              title={t("dashboard.walletTitle")}
              query={wallet}
              empty={
                wallet.data && wallet.data.activeMemberships === 0 ? (
                  <EmptyState title={t("dashboard.walletEmpty")} />
                ) : undefined
              }
            >
              {wallet.data ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-semibold">{t("dashboard.walletAdoption")}</h3>
                    <ul className="mt-1 flex flex-col gap-1">
                      {wallet.data.providers.map((p) => (
                        <li key={p.provider} className="flex flex-wrap justify-between gap-2">
                          <span>{t(PROVIDER_LABEL[p.provider] ?? "dashboard.walletWeb")}</span>
                          <span className="font-medium tabular-nums">
                            {t("dashboard.walletOf", {
                              count: n(p.memberships),
                              total: n(wallet.data.activeMemberships),
                            })}
                            {p.adoptionRate !== null ? ` (${format.percent(p.adoptionRate)})` : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t("dashboard.walletUpdates")}</h3>
                    <p
                      className="mt-1 text-2xl font-bold text-green-900 tabular-nums"
                      data-testid="wallet-rate"
                    >
                      {wallet.data.updates.successRate === null
                        ? "—"
                        : format.percent(wallet.data.updates.successRate)}
                    </p>
                    <p className="text-sm text-muted">
                      {wallet.data.updates.successRate === null
                        ? t("dashboard.walletRateNone")
                        : t("dashboard.walletRate")}
                    </p>
                    <ul className="mt-2 flex flex-col gap-0.5 text-charcoal-700">
                      <li>
                        {t("dashboard.walletSucceeded", {
                          count: n(wallet.data.updates.succeeded),
                        })}
                      </li>
                      <li>
                        {t("dashboard.walletFailed", { count: n(wallet.data.updates.failed) })}
                      </li>
                      <li>
                        {t("dashboard.walletQueued", { count: n(wallet.data.updates.stillQueued) })}
                      </li>
                      {wallet.data.updates.succeededAfterRetry > 0 ? (
                        <li>
                          {t("dashboard.walletRetried", {
                            count: n(wallet.data.updates.succeededAfterRetry),
                          })}
                        </li>
                      ) : null}
                    </ul>
                    {wallet.data.updates.failed > 0 ? (
                      <Alert tone="warning" className="mt-3">
                        {t("dashboard.walletFailedNote")}
                      </Alert>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </DashboardSection>
          </div>
        </>
      )}
    </div>
  );
}
