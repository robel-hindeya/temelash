"use client";

import type { PlatformMerchant } from "@/lib/api/contract";

export const OPS_SYNC_EVENT = "tc:ops-sync";

const MERCHANT_STATUS_KEY = "tc:ops:merchant_status";
const STAFF_STATUS_KEY = "tc:ops:staff_status";
const BRANCH_STATUS_KEY = "tc:ops:branch_status";
const PROGRAM_STATUS_KEY = "tc:ops:program_status";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(OPS_SYNC_EVENT));
  } catch {
    // Ignore storage write issues
  }
}

export function getAllStoredMerchantStatuses(): Record<string, PlatformMerchant["status"]> {
  return readStorage<Record<string, PlatformMerchant["status"]>>(MERCHANT_STATUS_KEY, {});
}

export function getStoredMerchantStatus(id: string): PlatformMerchant["status"] | null {
  const all = getAllStoredMerchantStatuses();
  return all[id] ?? null;
}

export function setStoredMerchantStatus(id: string, status: PlatformMerchant["status"]): void {
  const all = getAllStoredMerchantStatuses();
  all[id] = status;
  writeStorage(MERCHANT_STATUS_KEY, all);
}

export function getStoredStaffStatuses(merchantSlug: string): Record<string, "ACTIVE" | "SUSPENDED"> {
  const all = readStorage<Record<string, Record<string, "ACTIVE" | "SUSPENDED">>>(STAFF_STATUS_KEY, {});
  return all[merchantSlug] ?? {};
}

export function setStoredStaffStatus(
  merchantSlug: string,
  staffId: string,
  status: "ACTIVE" | "SUSPENDED",
): void {
  const all = readStorage<Record<string, Record<string, "ACTIVE" | "SUSPENDED">>>(STAFF_STATUS_KEY, {});
  all[merchantSlug] ??= {};
  all[merchantSlug][staffId] = status;
  writeStorage(STAFF_STATUS_KEY, all);
}

export function getStoredBranchStatuses(merchantSlug: string): Record<string, "ACTIVE" | "SUSPENDED"> {
  const all = readStorage<Record<string, Record<string, "ACTIVE" | "SUSPENDED">>>(BRANCH_STATUS_KEY, {});
  return all[merchantSlug] ?? {};
}

export function setStoredBranchStatus(
  merchantSlug: string,
  branchId: string,
  status: "ACTIVE" | "SUSPENDED",
): void {
  const all = readStorage<Record<string, Record<string, "ACTIVE" | "SUSPENDED">>>(BRANCH_STATUS_KEY, {});
  all[merchantSlug] ??= {};
  all[merchantSlug][branchId] = status;
  writeStorage(BRANCH_STATUS_KEY, all);
}

export function getStoredProgramStatus(merchantSlug: string): "ACTIVE" | "PAUSED" | null {
  const all = readStorage<Record<string, "ACTIVE" | "PAUSED">>(PROGRAM_STATUS_KEY, {});
  return all[merchantSlug] ?? null;
}

export function setStoredProgramStatus(merchantSlug: string, status: "ACTIVE" | "PAUSED"): void {
  const all = readStorage<Record<string, "ACTIVE" | "PAUSED">>(PROGRAM_STATUS_KEY, {});
  all[merchantSlug] = status;
  writeStorage(PROGRAM_STATUS_KEY, all);
}
