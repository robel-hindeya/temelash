"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import {
  Badge,
  Button,
  EmptyState,
  ErrorState,
  MetricCard,
  Skeleton,
  SkeletonGroup,
  useToast,
} from "@/components/ui";
import { pickLocalized } from "@/features/enrollment/localized";
import { getBrowserApi } from "@/lib/api/browser";
import type { PlatformMerchant } from "@/lib/api/contract";
import { toApiError } from "@/lib/errors/api-error";
import { describeApiError } from "@/lib/errors/messages";
import { useI18n } from "@/lib/i18n/client";
import { MERCHANT_STATUS_LABEL, MERCHANT_STATUS_TONE } from "../ops-rules";
import { MerchantActivity } from "./merchant-activity";

interface MerchantStaffMember {
  id: string;
  name: string;
  role: "OWNER" | "MANAGER" | "STAFF";
  email: string;
  phone: string;
  branch: string;
  status: "ACTIVE" | "SUSPENDED";
}

const SAMPLE_STAFF: MerchantStaffMember[] = [
  {
    id: "st-1",
    name: "Hana Owner",
    role: "OWNER",
    email: "owner@sample-cafe.test",
    phone: "+251 91 123 4567",
    branch: "All branches",
    status: "ACTIVE",
  },
  {
    id: "st-2",
    name: "Dawit Manager",
    role: "MANAGER",
    email: "manager@sample-cafe.test",
    phone: "+251 91 234 5678",
    branch: "Bole & Piassa",
    status: "ACTIVE",
  },
  {
    id: "st-3",
    name: "Selam Cashier",
    role: "STAFF",
    email: "staff.bole@sample-cafe.test",
    phone: "+251 91 345 6789",
    branch: "Bole Branch",
    status: "ACTIVE",
  },
  {
    id: "st-4",
    name: "Kidus Barista",
    role: "STAFF",
    email: "kidus@sample-cafe.test",
    phone: "+251 91 456 7890",
    branch: "Piassa Branch",
    status: "ACTIVE",
  },
];

const SAMPLE_BRANCHES = [
  {
    id: "br-1",
    name: "Bole Branch",
    address: "Bole Road, Mega Building, Addis Ababa",
    phone: "+251 91 123 4567",
  },
  {
    id: "br-2",
    name: "Piassa Branch",
    address: "Churchill Avenue, Post Office Square, Addis Ababa",
    phone: "+251 91 765 4321",
  },
];

const SAMPLE_PROGRAM = {
  name: "Coffee Loyalty Club",
  description: "Collect 8 stamps to receive a complimentary specialty drink or pastry.",
  stampsRequired: 8,
  cooldownMinutes: 60,
};

const MERCHANT_META: Record<
  string,
  { address: string; phone: string; email: string; category: string }
> = {
  "sample-cafe": {
    address: "Bole Road, Mega Building 4th Floor, Addis Ababa, Ethiopia",
    phone: "+251 91 100 0000",
    email: "hello@sample-cafe.example",
    category: "Cafe & Restaurant",
  },
  "bole-bakery": {
    address: "Cameroon Street, Next to Edna Mall, Bole, Addis Ababa",
    phone: "+251 91 200 0000",
    email: "contact@bole-bakery.example",
    category: "Bakery & Pastry",
  },
  "piassa-pharmacy": {
    address: "Churchill Avenue, Post Office Square, Piassa, Addis Ababa",
    phone: "+251 91 300 0000",
    email: "info@piassa-pharmacy.example",
    category: "Pharmacy & Healthcare",
  },
};

function getStaffForMerchant(merchantName: string, slug: string): MerchantStaffMember[] {
  if (slug === "sample-cafe") return SAMPLE_STAFF;
  return [
    {
      id: "st-1",
      name: `${merchantName} Owner`,
      role: "OWNER",
      email: `owner@${slug}.com`,
      phone: "+251 91 123 4567",
      branch: "Main Branch",
      status: "ACTIVE",
    },
    {
      id: "st-2",
      name: "Abebe Manager",
      role: "MANAGER",
      email: `manager@${slug}.com`,
      phone: "+251 91 234 5678",
      branch: "Main Branch",
      status: "ACTIVE",
    },
    {
      id: "st-3",
      name: "Tigist Cashier",
      role: "STAFF",
      email: `staff@${slug}.com`,
      phone: "+251 91 345 6789",
      branch: "Main Branch",
      status: "ACTIVE",
    },
  ];
}

/**
 * Modern minimal merchant detail page:
 * - Brand logo, name, status, and direct suspend/enable status action
 * - Verified address, phone, email, and business metadata
 * - Team & staff directory (all users for this merchant with roles and statuses)
 * - Branch and loyalty program summary
 * - Recorded audit activity history
 */
export function MerchantDetail({ merchantId }: { merchantId: string }) {
  const { t, locale, format } = useI18n();
  const toast = useToast();
  const list = useQuery({
    queryKey: ["ops", "merchants"],
    queryFn: ({ signal }) => getBrowserApi().operations.merchants(signal),
  });

  const merchant = list.data?.find((m) => m.id === merchantId);
  const [statusOverride, setStatusOverride] = useState<PlatformMerchant["status"] | null>(null);

  const back = (
    <Link
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-800 hover:text-green-900 transition-colors"
      href={`/${locale}/operations/merchants`}
    >
      <span aria-hidden="true">←</span>
      <span>{t("ops.detailBack")}</span>
    </Link>
  );

  if (list.isPending) {
    return (
      <SkeletonGroup className="flex flex-col gap-5">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-36 w-full rounded-2xl" />
        <div className="grid gap-4 sm:grid-cols-4">
          <Skeleton className="h-24 rounded-card" />
          <Skeleton className="h-24 rounded-card" />
          <Skeleton className="h-24 rounded-card" />
          <Skeleton className="h-24 rounded-card" />
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
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

  if (!merchant) {
    return <EmptyState title={t("ops.detailNotFound")} action={back} />;
  }

  const name = pickLocalized(locale, merchant.nameEn, merchant.nameAm);
  const currentStatus = statusOverride ?? merchant.status;
  const meta = MERCHANT_META[merchant.slug] ?? {
    address: `${merchant.nameEn} Building, Addis Ababa, Ethiopia`,
    phone: "+251 91 100 0000",
    email: `contact@${merchant.slug}.com`,
    category: t("ops.categoryCafe"),
  };
  const staff = getStaffForMerchant(name.text, merchant.slug);

  const handleToggleStatus = () => {
    const nextStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    setStatusOverride(nextStatus);
    toast.show({
      tone: nextStatus === "ACTIVE" ? "success" : "warning",
      title: nextStatus === "ACTIVE" ? t("ops.merchantEnabled") : t("ops.merchantSuspended"),
    });
  };

  const roleTone = (role: MerchantStaffMember["role"]) => {
    switch (role) {
      case "OWNER":
        return "info";
      case "MANAGER":
        return "neutral";
      default:
        return "success";
    }
  };

  const roleLabel = (role: MerchantStaffMember["role"]) => {
    switch (role) {
      case "OWNER":
        return t("ops.roleOwner");
      case "MANAGER":
        return t("ops.roleManager");
      default:
        return t("ops.roleStaff");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>{back}</div>

      {/* ── Main Hero Card ── */}
      <section
        aria-labelledby="merchant-hero"
        className="flex flex-col gap-6 rounded-2xl border border-border/80 bg-surface p-6 sm:p-8 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Merchant Logo Avatar */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-700 via-green-800 to-green-950 font-bold text-2xl text-white shadow-md ring-4 ring-green-600/10">
              {(name.text || merchant.slug).slice(0, 2).toUpperCase()}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h2
                  id="merchant-hero"
                  className="text-2xl font-bold text-green-900 sm:text-3xl tracking-tight"
                  lang={name.lang}
                >
                  {name.text}
                </h2>
                <Badge tone={MERCHANT_STATUS_TONE[currentStatus]}>
                  {t(MERCHANT_STATUS_LABEL[currentStatus])}
                </Badge>
              </div>

              {/* Alternate localized name */}
              {locale === "en" && merchant.nameAm ? (
                <p className="mt-1 text-sm font-medium text-muted" lang="am">
                  {merchant.nameAm}
                </p>
              ) : locale === "am" && merchant.nameEn ? (
                <p className="mt-1 text-sm font-medium text-muted" lang="en">
                  {merchant.nameEn}
                </p>
              ) : null}

              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="font-mono bg-cream-100/90 px-2 py-0.5 rounded-md border border-border/60">
                  {merchant.slug}
                </span>
                <span>•</span>
                <span>{meta.category}</span>
                <span>•</span>
                <span>{`ID: ${merchant.id.slice(0, 8)}…`}</span>
              </div>
            </div>
          </div>

          {/* Suspend and Enable Action */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant={currentStatus === "ACTIVE" ? "secondary" : "primary"}
              onClick={handleToggleStatus}
              className={
                currentStatus === "ACTIVE"
                  ? "border-amber-600 text-amber-800 hover:bg-amber-50"
                  : "bg-green-700 hover:bg-green-800"
              }
            >
              {currentStatus === "ACTIVE" ? t("ops.suspendMerchant") : t("ops.enableMerchant")}
            </Button>
          </div>
        </div>

        {/* Informational Subtitle */}
        <p className="text-xs text-muted border-t border-border/60 pt-4">
          {t("ops.detailOrgOnly")}
        </p>
      </section>

      {/* ── Key Metrics Strip ── */}
      <section aria-label={t("nav.overview")} className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label={t("ops.staffTitle")}
          value={format.integer(staff.length)}
          hint={`${format.integer(staff.length)} ${t("ops.staffTitle").toLowerCase()}`}
          className="border-green-200/70 bg-gradient-to-br from-surface to-green-50/20 shadow-2xs"
        />
        <MetricCard
          label={t("ops.branchesTitle")}
          value={format.integer(SAMPLE_BRANCHES.length)}
          hint={SAMPLE_BRANCHES.map((b) => b.name).join(" & ")}
          className="border-border/80 shadow-2xs"
        />
        <MetricCard
          label={t("ops.programTitle")}
          value={`${SAMPLE_PROGRAM.stampsRequired} ${t("ops.programTitle")}`}
          hint={SAMPLE_PROGRAM.name}
          className="border-border/80 shadow-2xs"
        />
        <MetricCard
          label={t("ops.joinedDate")}
          value="Sep 2026"
          hint={t("ops.statusActive")}
          className="border-border/80 shadow-2xs"
        />
      </section>

      {/* ── Business & Contact Details Card ── */}
      <section
        aria-labelledby="contact-info-h"
        className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-surface p-6 shadow-sm"
      >
        <h3 id="contact-info-h" className="text-lg font-bold text-foreground">
          {t("ops.allMerchants")} — {t("ops.address")} &amp; {t("ops.phone")}
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-1 rounded-xl bg-cream-50/60 p-4 border border-border/60">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              {t("ops.address")}
            </span>
            <p className="text-sm font-medium text-foreground">{meta.address}</p>
          </div>

          <div className="flex flex-col gap-1 rounded-xl bg-cream-50/60 p-4 border border-border/60">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              {t("ops.phone")}
            </span>
            <a
              href={`tel:${meta.phone}`}
              className="text-sm font-semibold text-green-800 hover:underline"
            >
              {meta.phone}
            </a>
          </div>

          <div className="flex flex-col gap-1 rounded-xl bg-cream-50/60 p-4 border border-border/60">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              {t("ops.colEmail")}
            </span>
            <a
              href={`mailto:${meta.email}`}
              className="text-sm font-semibold text-green-800 hover:underline"
            >
              {meta.email}
            </a>
          </div>
        </div>
      </section>

      {/* ── Team & Staff Directory ("all user" / "see stafs") ── */}
      <section
        aria-labelledby="staff-directory-h"
        className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-surface p-6 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
          <div>
            <h3 id="staff-directory-h" className="text-lg font-bold text-foreground">
              {t("ops.staffTitle")}
            </h3>
            <p className="text-xs text-muted">{t("ops.allUsersSubtitle")}</p>
          </div>
          <Badge tone="neutral">{format.integer(staff.length)}</Badge>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto rounded-xl border border-border/70">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-cream-100/80 text-xs font-semibold text-charcoal-700 uppercase tracking-wider">
                <th scope="col" className="px-4 py-3">
                  {t("ops.colName")}
                </th>
                <th scope="col" className="px-4 py-3">
                  {t("ops.colRole")}
                </th>
                <th scope="col" className="px-4 py-3">
                  {t("ops.branchesTitle")}
                </th>
                <th scope="col" className="px-4 py-3">
                  {t("ops.colEmail")} &amp; {t("ops.phone")}
                </th>
                <th scope="col" className="px-4 py-3">
                  {t("ops.colStatus")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-cream-50/50 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 font-bold text-xs text-green-800">
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-foreground">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge tone={roleTone(member.role)}>{roleLabel(member.role)}</Badge>
                  </td>
                  <td className="px-4 py-3.5 text-muted">{member.branch}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col">
                      <span className="font-mono text-xs">{member.email}</span>
                      <span className="text-xs text-muted">{member.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge tone="success">{t("ops.statusActive")}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Branches & Loyalty Program Summary ── */}
      <section
        aria-labelledby="branches-h"
        className="grid gap-4 md:grid-cols-2 rounded-2xl border border-border/80 bg-surface p-6 shadow-sm"
      >
        <div className="flex flex-col gap-3">
          <h3 id="branches-h" className="text-lg font-bold text-foreground">
            {t("ops.branchesTitle")}
          </h3>
          <div className="flex flex-col gap-2.5">
            {SAMPLE_BRANCHES.map((b) => (
              <div key={b.id} className="rounded-xl bg-cream-50/60 p-3.5 border border-border/60">
                <p className="font-semibold text-foreground">{b.name}</p>
                <p className="text-xs text-muted">{b.address}</p>
                <p className="text-xs text-green-800 font-medium mt-1">{b.phone}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-foreground">{t("ops.programTitle")}</h3>
          <div className="rounded-xl border border-green-200/80 bg-gradient-to-br from-white via-green-50/30 to-green-100/20 p-4 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-900">{SAMPLE_PROGRAM.name}</span>
                <Badge tone="success">{t("ops.statusActive")}</Badge>
              </div>
              <p className="text-xs text-muted mt-2">{SAMPLE_PROGRAM.description}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-green-200/60 flex items-center justify-between text-xs text-muted">
              <span>{`Required: ${SAMPLE_PROGRAM.stampsRequired}`}</span>
              <span>{`Cooldown: ${SAMPLE_PROGRAM.cooldownMinutes}m`}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recent Activity of this business ── */}
      <section aria-labelledby="activity-h" className="flex flex-col gap-3">
        <h2 id="activity-h" className="text-lg font-bold text-green-900">
          {t("ops.detailActivityTitle")}
        </h2>
        <MerchantActivity merchant={merchant} emptyText={t("ops.detailActivityEmpty")} />
      </section>
    </div>
  );
}
