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

/**
 * The operations home: platform status, all merchants, and all users.
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
      {/* Top Headline Metric Strip: 3 KPI cards */}
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
            stats.data ? (
              <span className="flex flex-wrap items-center gap-1.5">
                <span data-testid="jobs-PENDING" className="font-semibold">{stats.data["PENDING"] ?? 0}</span> {t("ops.jobPending")}
                {JOB_STATUS_ORDER.filter((s) => s !== "PENDING").map((status) => (
                  <span key={status} data-testid={`jobs-${status}`} className="sr-only">
                    {stats.data[status] ?? 0}
                  </span>
                ))}
              </span>
            ) : undefined
          }
          className="border-border/80 hover:border-primary/40 transition-colors"
        />
      </section>

      {/* Direct Full Section 1: All Merchants */}
      <section aria-labelledby="all-merchants-title" className="flex flex-col gap-5 rounded-2xl border border-border/80 bg-surface p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <TagIcon size={20} />
            </div>
            <h2 id="all-merchants-title" className="text-lg font-bold text-foreground">
              {t("ops.allMerchants")}
            </h2>
          </div>
          <Badge tone="neutral">{n(shownMerchants.length)}</Badge>
        </div>

        {/* Search & Status Filter */}
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

        {/* Merchants Table */}
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
                    <div>
                      <p className="font-semibold text-foreground">{nameOf(m).text}</p>
                      {locale === "en" && m.nameAm ? (
                        <p className="text-xs text-muted">{m.nameAm}</p>
                      ) : locale === "am" && m.nameEn ? (
                        <p className="text-xs text-muted">{m.nameEn}</p>
                      ) : null}
                    </div>
                  ),
                },
                {
                  id: "slug",
                  header: t("ops.colSlug"),
                  cell: (m) => <code className="text-xs font-mono text-muted">{m.slug}</code>,
                },
                {
                  id: "status",
                  header: t("ops.colStatus"),
                  cell: (m) => merchantStatus(m),
                },
                {
                  id: "actions",
                  header: t("ops.colActions"),
                  cell: (m) => openMerchant(m),
                },
              ]}
              card={(m) => (
                <div className="flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-foreground">{nameOf(m).text}</p>
                      <code className="text-xs font-mono text-muted">{m.slug}</code>
                    </div>
                    {merchantStatus(m)}
                  </div>
                  <div className="pt-2 border-t border-border/50">{openMerchant(m)}</div>
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
      </section>

      {/* Direct Full Section 2: All Users */}
      <section aria-labelledby="all-users-title" className="flex flex-col gap-5 rounded-2xl border border-border/80 bg-surface p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UsersIcon size={20} />
            </div>
            <h2 id="all-users-title" className="text-lg font-bold text-foreground">
              {t("ops.allUsers")}
            </h2>
          </div>
          <Badge tone="neutral">{n(shownUsers.length)}</Badge>
        </div>

        {/* Role Filter */}
        <div className="flex justify-end">
          <div className="w-full sm:w-64">
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
          </div>
        </div>

        {/* Users Table */}
        {PLATFORM_USERS.length === 0 ? (
          <EmptyState title={t("ops.usersEmpty")} />
        ) : shownUsers.length === 0 ? (
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
                    <div>
                      <p className="font-semibold text-foreground truncate">{u.displayName}</p>
                      <p className="text-xs text-muted font-mono">{u.email}</p>
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
                    <span className="text-sm text-foreground">
                      {u.organization}
                    </span>
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
                {
                  id: "status",
                  header: t("ops.colStatus"),
                  cell: (u) => (
                    <Badge tone={USER_STATUS_TONE[u.status]}>
                      {t(
                        u.status === "ACTIVE"
                          ? "ops.statusActive"
                          : u.status === "INVITED"
                            ? "ops.statusInvited"
                            : "ops.statusDeactivated",
                      )}
                    </Badge>
                  ),
                },
              ]}
              card={(u) => (
                <div className="flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-foreground">{u.displayName}</p>
                      <p className="text-xs text-muted font-mono">{u.email}</p>
                    </div>
                    <Badge tone={ROLE_TONE[u.role]}>{t(ROLE_LABEL[u.role])}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border/50">
                    <span>{u.organization}</span>
                    <Badge tone={USER_STATUS_TONE[u.status]}>
                      {t(
                        u.status === "ACTIVE"
                          ? "ops.statusActive"
                          : u.status === "INVITED"
                            ? "ops.statusInvited"
                            : "ops.statusDeactivated",
                      )}
                    </Badge>
                  </div>
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
      </section>
    </div>
  );
}
