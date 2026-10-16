"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Badge,
  EmptyState,
  FormField,
  MetricCard,
  Pagination,
  SearchField,
  Select,
} from "@/components/ui";
import { TagIcon, UsersIcon } from "@/components/ui/icons";
import type { Tone } from "@/components/ui/tone";
import { pickLocalized } from "@/features/enrollment/localized";
import { ResponsiveTable } from "@/features/org/responsive-table";
import { usePaged } from "@/features/org/use-paged";
import { getBrowserApi } from "@/lib/api/browser";
import type { PlatformMerchant } from "@/lib/api/contract";
import { useI18n } from "@/lib/i18n/client";
import {
  filterMerchants,
  JOB_STATUS_LABEL,
  JOB_STATUS_ORDER,
  MERCHANT_STATUS_LABEL,
  MERCHANT_STATUS_TONE,
} from "../ops-rules";
import {
  filterPlatformUsers,
  PLATFORM_USERS,
  type PlatformUserItem,
} from "../ops-users";

export interface HealthSnapshot {
  live: boolean;
  /** null when readiness could not be asked at all. */
  ready: boolean | null;
}

const ROLE_LABEL: Record<PlatformUserItem["role"], "ops.rolePlatformAdmin" | "ops.roleOwner" | "ops.roleManager" | "ops.roleStaff"> = {
  PLATFORM_ADMIN: "ops.rolePlatformAdmin",
  OWNER: "ops.roleOwner",
  MANAGER: "ops.roleManager",
  STAFF: "ops.roleStaff",
};

const ROLE_TONE: Record<PlatformUserItem["role"], Tone> = {
  PLATFORM_ADMIN: "info",
  OWNER: "success",
  MANAGER: "warning",
  STAFF: "neutral",
};

const USER_STATUS_TONE: Record<PlatformUserItem["status"], "success" | "warning" | "neutral"> = {
  ACTIVE: "success",
  INVITED: "warning",
  DEACTIVATED: "neutral",
};

const USER_STATUS_LABEL: Record<PlatformUserItem["status"], "ops.statusActive" | "ops.statusInvited" | "ops.statusDeactivated"> = {
  ACTIVE: "ops.statusActive",
  INVITED: "ops.statusInvited",
  DEACTIVATED: "ops.statusDeactivated",
};

/**
 * The operations home: platform status, all merchants, all users, outbox job processing,
 * and quick-access consoles for administrative operations.
 */
export function OpsOverview({ health }: { health: HealthSnapshot }) {
  const { t, locale, format } = useI18n();
  const [activeTab, setActiveTab] = useState<"merchants" | "users">("merchants");

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
  const totalUsers = PLATFORM_USERS.length;
  const totalJobs = stats.data
    ? Object.values(stats.data).reduce((acc, val) => acc + (val ?? 0), 0)
    : 0;

  // Merchant filtering and pagination
  const [merchantFilter, setMerchantFilter] = useState({ search: "", status: "" });
  const shownMerchants = useMemo(
    () => filterMerchants(merchants.data ?? [], merchantFilter),
    [merchants.data, merchantFilter],
  );
  const merchantPaged = usePaged(shownMerchants);

  // User filtering and pagination
  const [userFilter, setUserFilter] = useState({ search: "", role: "", status: "" });
  const shownUsers = useMemo(
    () => filterPlatformUsers(PLATFORM_USERS, userFilter),
    [userFilter],
  );
  const userPaged = usePaged(shownUsers);

  const nameOf = (m: PlatformMerchant) => pickLocalized(locale, m.nameEn, m.nameAm);
  const merchantStatus = (m: PlatformMerchant) => (
    <Badge tone={MERCHANT_STATUS_TONE[m.status]}>{t(MERCHANT_STATUS_LABEL[m.status])}</Badge>
  );
  const openMerchant = (m: PlatformMerchant) => (
    <Link
      className="touch-target inline-flex items-center rounded-control border border-green-700 px-3.5 py-1 text-sm font-semibold text-green-800 hover:bg-green-50 transition-colors"
      href={`/${locale}/operations/merchants/${m.id}`}
    >
      {t("ops.view")}
      <span className="sr-only"> — {nameOf(m).text}</span>
    </Link>
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Top Headline Metric Strip: 4 KPI cards */}
      <section aria-label={t("ops.tileSystem")} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          label={t("ops.allUsers")}
          value={n(totalUsers)}
          hint={t("ops.allUsersSubtitle")}
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

      {/* Main Interactive Management Hub: All Merchants & All Users Tabs */}
      <section className="flex flex-col gap-5 rounded-2xl border border-border/80 bg-surface p-6 shadow-sm">
        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-testid="tab-merchants"
              onClick={() => setActiveTab("merchants")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                activeTab === "merchants"
                  ? "bg-green-800 text-white shadow-xs"
                  : "bg-surface-elevated text-charcoal-700 hover:bg-cream-200"
              }`}
            >
              <TagIcon size={18} />
              <span>{t("ops.allMerchants")}</span>
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  activeTab === "merchants" ? "bg-green-700 text-white" : "bg-muted/20 text-muted"
                }`}
              >
                {totalMerchants}
              </span>
            </button>

            <button
              type="button"
              data-testid="tab-users"
              onClick={() => setActiveTab("users")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                activeTab === "users"
                  ? "bg-green-800 text-white shadow-xs"
                  : "bg-surface-elevated text-charcoal-700 hover:bg-cream-200"
              }`}
            >
              <UsersIcon size={18} />
              <span>{t("ops.allUsers")}</span>
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  activeTab === "users" ? "bg-green-700 text-white" : "bg-muted/20 text-muted"
                }`}
              >
                {totalUsers}
              </span>
            </button>
          </div>

          <p className="text-xs text-muted">
            {activeTab === "merchants"
              ? `${n(shownMerchants.length)} ${t("ops.merchantsTableLabel").toLowerCase()}`
              : `${n(shownUsers.length)} ${t("ops.usersTableLabel").toLowerCase()}`}
          </p>
        </div>

        {/* Tab 1: All Merchants */}
        {activeTab === "merchants" ? (
          <div className="flex flex-col gap-4">
            {/* Search & Filters */}
            <div className="grid gap-3 sm:grid-cols-[1fr_16rem]">
              <SearchField
                label={t("ops.searchLabel")}
                placeholder={t("ops.searchPlaceholder")}
                onSearch={(search) => {
                  setMerchantFilter((f) => ({ ...f, search }));
                  merchantPaged.reset();
                }}
              />
              <FormField label={t("ops.filterStatus")}>
                <Select
                  value={merchantFilter.status}
                  onChange={(event) => {
                    setMerchantFilter((f) => ({ ...f, status: event.target.value }));
                    merchantPaged.reset();
                  }}
                >
                  <option value="">{t("ops.anyStatus")}</option>
                  <option value="ACTIVE">{t("ops.statusActive")}</option>
                  <option value="SUSPENDED">{t("ops.statusSuspended")}</option>
                  <option value="DEACTIVATED">{t("ops.statusDeactivated")}</option>
                </Select>
              </FormField>
            </div>

            {/* Merchant Content */}
            {(merchants.data ?? []).length === 0 ? (
              <EmptyState title={t("ops.merchantsEmpty")} />
            ) : shownMerchants.length === 0 ? (
              <EmptyState title={t("ops.merchantsNoMatch")} />
            ) : (
              <>
                <ResponsiveTable
                  label={t("ops.merchantsTableLabel")}
                  items={merchantPaged.slice}
                  rowKey={(m) => m.id}
                  columns={[
                    {
                      id: "name",
                      header: t("ops.colName"),
                      rowHeader: true,
                      cell: (m) => (
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground" lang={nameOf(m).lang}>
                            {nameOf(m).text}
                          </span>
                          {locale === "en" && m.nameAm ? (
                            <span className="text-xs text-muted" lang="am">
                              {m.nameAm}
                            </span>
                          ) : null}
                        </div>
                      ),
                    },
                    {
                      id: "slug",
                      header: t("ops.colSlug"),
                      cell: (m) => <span className="font-mono text-xs">{m.slug}</span>,
                    },
                    { id: "status", header: t("ops.colStatus"), cell: merchantStatus },
                    { id: "actions", header: t("ops.colActions"), cell: openMerchant },
                  ]}
                  card={(m) => (
                    <div className="flex flex-col gap-2">
                      <p className="text-lg font-semibold text-green-900" lang={nameOf(m).lang}>
                        {nameOf(m).text}
                      </p>
                      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                        <dt className="text-muted">{t("ops.colSlug")}</dt>
                        <dd className="font-mono">{m.slug}</dd>
                        <dt className="text-muted">{t("ops.colStatus")}</dt>
                        <dd>{merchantStatus(m)}</dd>
                      </dl>
                      {openMerchant(m)}
                    </div>
                  )}
                />
                <Pagination
                  hasPrevious={merchantPaged.hasPrevious}
                  hasNext={merchantPaged.hasNext}
                  onPrevious={merchantPaged.previous}
                  onNext={merchantPaged.next}
                  from={merchantPaged.from}
                  to={merchantPaged.to}
                  total={merchantPaged.total}
                />
              </>
            )}
          </div>
        ) : null}

        {/* Tab 2: All Users */}
        {activeTab === "users" ? (
          <div className="flex flex-col gap-4">
            {/* Search & Filters */}
            <div className="grid gap-3 sm:grid-cols-[1fr_12rem_12rem]">
              <SearchField
                label={t("ops.searchUsers")}
                placeholder={t("ops.searchUsersPlaceholder")}
                onSearch={(search) => {
                  setUserFilter((f) => ({ ...f, search }));
                  userPaged.reset();
                }}
              />
              <FormField label={t("ops.filterRole")}>
                <Select
                  value={userFilter.role}
                  onChange={(event) => {
                    setUserFilter((f) => ({ ...f, role: event.target.value }));
                    userPaged.reset();
                  }}
                >
                  <option value="">{t("ops.anyRole")}</option>
                  <option value="PLATFORM_ADMIN">{t("ops.rolePlatformAdmin")}</option>
                  <option value="OWNER">{t("ops.roleOwner")}</option>
                  <option value="MANAGER">{t("ops.roleManager")}</option>
                  <option value="STAFF">{t("ops.roleStaff")}</option>
                </Select>
              </FormField>

              <FormField label={t("ops.filterStatus")}>
                <Select
                  value={userFilter.status}
                  onChange={(event) => {
                    setUserFilter((f) => ({ ...f, status: event.target.value }));
                    userPaged.reset();
                  }}
                >
                  <option value="">{t("ops.anyStatus")}</option>
                  <option value="ACTIVE">{t("ops.statusActive")}</option>
                  <option value="INVITED">{t("ops.statusInvited")}</option>
                  <option value="DEACTIVATED">{t("ops.statusDeactivated")}</option>
                </Select>
              </FormField>
            </div>

            {/* User Content */}
            {shownUsers.length === 0 ? (
              <EmptyState title={t("ops.usersNoMatch")} />
            ) : (
              <>
                <ResponsiveTable
                  label={t("ops.usersTableLabel")}
                  items={userPaged.slice}
                  rowKey={(u) => u.id}
                  columns={[
                    {
                      id: "name",
                      header: t("ops.colName"),
                      rowHeader: true,
                      cell: (u) => (
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800 text-sm">
                            {u.displayName.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground truncate">
                              {u.displayName}
                            </p>
                            <p className="text-xs text-muted truncate">{u.email}</p>
                          </div>
                        </div>
                      ),
                    },
                    {
                      id: "role",
                      header: t("ops.colRole"),
                      cell: (u) => <Badge tone={ROLE_TONE[u.role]}>{t(ROLE_LABEL[u.role])}</Badge>,
                    },
                    {
                      id: "organization",
                      header: t("ops.colOrganization"),
                      cell: (u) => (
                        <span className="text-sm font-medium text-charcoal-800">
                          {u.organization}
                        </span>
                      ),
                    },
                    {
                      id: "status",
                      header: t("ops.colStatus"),
                      cell: (u) => (
                        <Badge tone={USER_STATUS_TONE[u.status]}>
                          {t(USER_STATUS_LABEL[u.status])}
                        </Badge>
                      ),
                    },
                    {
                      id: "lastActive",
                      header: t("ops.colLastActive"),
                      cell: (u) => (
                        <span className="text-xs text-muted">
                          {u.lastActive ?? "—"}
                        </span>
                      ),
                    },
                  ]}
                  card={(u) => (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800 text-xs">
                          {u.displayName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{u.displayName}</p>
                          <p className="text-xs text-muted">{u.email}</p>
                        </div>
                      </div>
                      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm mt-1">
                        <dt className="text-muted">{t("ops.colRole")}</dt>
                        <dd>
                          <Badge tone={ROLE_TONE[u.role]}>{t(ROLE_LABEL[u.role])}</Badge>
                        </dd>
                        <dt className="text-muted">{t("ops.colOrganization")}</dt>
                        <dd className="font-medium">{u.organization}</dd>
                        <dt className="text-muted">{t("ops.colStatus")}</dt>
                        <dd>
                          <Badge tone={USER_STATUS_TONE[u.status]}>
                            {t(USER_STATUS_LABEL[u.status])}
                          </Badge>
                        </dd>
                      </dl>
                    </div>
                  )}
                />
                <Pagination
                  hasPrevious={userPaged.hasPrevious}
                  hasNext={userPaged.hasNext}
                  onPrevious={userPaged.previous}
                  onNext={userPaged.next}
                  from={userPaged.from}
                  to={userPaged.to}
                  total={userPaged.total}
                />
              </>
            )}
          </div>
        ) : null}
      </section>

      {/* Background Jobs Section */}
      <section aria-labelledby="jobs-heading" className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div>
            <h2 id="jobs-heading" className="text-lg font-bold text-foreground">
              {t("ops.tileJobs")}
            </h2>
            <p className="text-xs text-muted">{t("ops.walletSubtitle")}</p>
          </div>
          <Link
            className="text-sm font-semibold text-primary hover:underline"
            href={`/${locale}/operations/wallet-health`}
          >
            {t("ops.seeAll")} →
          </Link>
        </div>

        {stats.data ? (
          <div className="flex flex-col gap-5">
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-5">
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
          </div>
        ) : null}
      </section>

      {/* Quick Launch Operations Consoles Navigation Grid */}
      <section aria-labelledby="ops-modules-title" className="flex flex-col gap-4">
        <h2 id="ops-modules-title" className="text-lg font-bold text-foreground">
          {t("areas.operations")}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href={`/${locale}/operations/merchants`}
            className="group flex flex-col justify-between rounded-card border border-border/80 bg-surface p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md no-underline"
          >
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-control bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <TagIcon size={20} />
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {t("nav.merchants")}
              </h3>
              <p className="mt-1 text-xs text-muted line-clamp-2 leading-relaxed">
                {t("ops.merchantsSubtitle")}
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
              {t("ops.seeAll")} <span aria-hidden="true">→</span>
            </span>
          </Link>

          <Link
            href={`/${locale}/operations/wallet-health`}
            className="group flex flex-col justify-between rounded-card border border-border/80 bg-surface p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md no-underline"
          >
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-control bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {t("nav.walletHealth")}
              </h3>
              <p className="mt-1 text-xs text-muted line-clamp-2 leading-relaxed">
                {t("ops.walletSubtitle")}
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
              {t("ops.seeAll")} <span aria-hidden="true">→</span>
            </span>
          </Link>

          <Link
            href={`/${locale}/operations/audit`}
            className="group flex flex-col justify-between rounded-card border border-border/80 bg-surface p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md no-underline"
          >
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-control bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {t("nav.audit")}
              </h3>
              <p className="mt-1 text-xs text-muted line-clamp-2 leading-relaxed">
                {t("ops.auditSubtitle")}
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
              {t("ops.seeAll")} <span aria-hidden="true">→</span>
            </span>
          </Link>

          <Link
            href={`/${locale}/operations/system`}
            className="group flex flex-col justify-between rounded-card border border-border/80 bg-surface p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md no-underline"
          >
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-control bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {t("nav.system")}
              </h3>
              <p className="mt-1 text-xs text-muted line-clamp-2 leading-relaxed">
                {t("ops.systemSubtitle")}
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
              {t("ops.seeAll")} <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
