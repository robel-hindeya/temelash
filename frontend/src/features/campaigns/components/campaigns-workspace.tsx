"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  ConfirmDialog,
  Dialog,
  EmptyState,
  ErrorState,
  FormField,
  Input,
  Pagination,
  Select,
  Skeleton,
  SkeletonGroup,
  Textarea,
  useToast,
} from "@/components/ui";
import type { Tone } from "@/components/ui";
import { ResponsiveTable } from "@/features/org/responsive-table";
import { useCursorPages } from "@/features/records/use-cursor-pages";
import { getBrowserApi } from "@/lib/api/browser";
import { newIdempotencyKey } from "@/lib/api/idempotency";
import { CAMPAIGN_AUDIENCES, type Campaign } from "@/lib/api/contract";
import { toApiError } from "@/lib/errors/api-error";
import { describeApiError } from "@/lib/errors/messages";
import { useI18n } from "@/lib/i18n/client";
import type { MessageKey } from "@/lib/i18n/translator";

const PAGE_SIZE = 10;
const MESSAGE_MAX = 300;
const STATUS_TONE: Record<Campaign["status"], Tone> = {
  DRAFT: "warning",
  SENT: "success",
  CANCELLED: "neutral",
};

/**
 * Campaigns: messages to customers who agreed to offers and news. This is a PREVIEW. The backend has no campaign
 * operations, so the screen runs against the mock backend and says so at the top; in a production build the service
 * answers 404 and the screen shows "not available yet" instead of an error. Nothing is ever delivered.
 *
 * What it already gets right: only customers who agreed are included, the audience size is shown before sending,
 * sending needs a confirmation and an idempotency key (a retry after a lost answer cannot send twice), and a sent
 * campaign cannot be changed.
 */
export function CampaignsWorkspace() {
  const { t, format } = useI18n();
  const client = useQueryClient();
  const toast = useToast();
  const paging = useCursorPages(PAGE_SIZE);
  const [creating, setCreating] = useState(false);
  const [sending, setSending] = useState<Campaign | null>(null);
  const [cancelling, setCancelling] = useState<Campaign | null>(null);
  const attempt = useRef<{ id: string; key: string } | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"ALL" | Campaign["status"]>("ALL");

  const list = useQuery({
    queryKey: ["campaigns", paging.cursor ?? null],
    queryFn: ({ signal }) =>
      getBrowserApi().campaigns.list({ cursor: paging.cursor, limit: PAGE_SIZE }, signal),
    placeholderData: keepPreviousData,
  });
  const refresh = () => void client.invalidateQueries({ queryKey: ["campaigns"] });
  const explain = (failure: unknown) => {
    const e = toApiError(failure);
    return e.kind === "forbidden"
      ? t("campaigns.errForbidden")
      : e.kind === "conflict"
        ? t("campaigns.errConflict")
        : describeApiError(e, t).description;
  };

  const send = useMutation({
    mutationFn: (campaign: Campaign) => {
      if (attempt.current?.id !== campaign.id)
        attempt.current = { id: campaign.id, key: newIdempotencyKey() };
      return getBrowserApi().campaigns.send(campaign.id, attempt.current.key);
    },
  });
  async function confirmSend() {
    if (!sending) return;
    setProblem(null);
    try {
      const result = await send.mutateAsync(sending);
      toast.show({
        tone: "success",
        title: result.replayed ? t("campaigns.sentReplayed") : t("campaigns.sent"),
      });
      attempt.current = null;
      setSending(null);
      refresh();
    } catch (failure) {
      setProblem(explain(failure));
    }
  }
  async function confirmCancel() {
    if (!cancelling) return;
    setProblem(null);
    try {
      await getBrowserApi().campaigns.cancel(cancelling.id);
      toast.show({ tone: "success", title: t("campaigns.cancelled") });
      setCancelling(null);
      refresh();
    } catch (failure) {
      setProblem(explain(failure));
    }
  }

  const preview = (
    <Alert tone="warning" title={t("campaigns.previewTitle")} className="shadow-xs">
      <div className="flex flex-col gap-1 text-sm">
        <p>{t("campaigns.previewBody")}</p>
        <p className="font-medium text-amber-900">{t("campaigns.consentNote")}</p>
      </div>
    </Alert>
  );

  if (list.isPending) {
    return (
      <div className="flex flex-col gap-6">
        {preview}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
        <SkeletonGroup>
          <Skeleton className="h-64 w-full rounded-2xl" />
        </SkeletonGroup>
      </div>
    );
  }
  if (list.isError) {
    const failure = toApiError(list.error);
    return (
      <div className="flex flex-col gap-6">
        {preview}
        {failure.kind === "not_found" ? (
          <EmptyState
            title={t("campaigns.unavailableTitle")}
            description={t("campaigns.unavailableBody")}
          />
        ) : (
          <ErrorState
            title={t("campaigns.loadError")}
            description={describeApiError(failure, t).description}
            requestId={failure.requestId}
            onRetry={() => void list.refetch()}
            retrying={list.isFetching}
          />
        )}
      </div>
    );
  }

  const items = list.data.items;
  const filteredItems =
    statusFilter === "ALL" ? items : items.filter((c) => c.status === statusFilter);

  const totalCampaigns = items.length;
  const draftCount = items.filter((c) => c.status === "DRAFT").length;
  const sentCount = items.filter((c) => c.status === "SENT").length;
  const totalAudienceReach = items.reduce((acc, c) => acc + (c.audienceSize ?? 0), 0);

  const audience = (c: Campaign) => t(`campaigns.audience${c.audience}` as MessageKey);
  const status = (c: Campaign) => (
    <div className="inline-flex items-center gap-1.5">
      <span
        className={`h-2 w-2 rounded-full ${
          c.status === "SENT"
            ? "bg-emerald-500 animate-pulse"
            : c.status === "DRAFT"
              ? "bg-amber-500"
              : "bg-charcoal-400"
        }`}
      />
      <Badge tone={STATUS_TONE[c.status]}>{t(`campaigns.status${c.status}` as MessageKey)}</Badge>
    </div>
  );
  const reach = (c: Campaign) => (
    <span className="inline-flex items-center gap-1 font-semibold text-charcoal-900 bg-cream-100 px-2.5 py-1 rounded-full text-xs">
      <span>👥</span>
      {t("campaigns.reach", { count: format.integer(c.audienceSize) })}
    </span>
  );
  const actions = (c: Campaign) =>
    c.status === "DRAFT" ? (
      <span className="flex flex-wrap items-center gap-2">
        <Button onClick={() => setSending(c)} className="shadow-2xs font-medium text-sm px-3.5 py-1.5 min-h-9">
          {t("campaigns.send")}
          <span className="sr-only"> — {c.name}</span>
        </Button>
        <Button variant="secondary" onClick={() => setCancelling(c)} className="text-sm px-3.5 py-1.5 min-h-9">
          {t("campaigns.cancel")}
          <span className="sr-only"> — {c.name}</span>
        </Button>
      </span>
    ) : c.sentAt ? (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
        <span>✓</span>
        {t("campaigns.sentOn", { date: format.date(c.sentAt) })}
      </span>
    ) : null;

  return (
    <div className="flex flex-col gap-6">
      {preview}

      {/* Metric Highlights */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col justify-between rounded-2xl border border-border/70 bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              {"Total Campaigns"}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-base">
              📢
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-foreground">{totalCampaigns}</span>
            <p className="mt-0.5 text-xs text-muted">{"Created campaigns"}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-border/70 bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              {"Drafts in Progress"}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-base">
              📝
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-amber-700">{draftCount}</span>
            <p className="mt-0.5 text-xs text-muted">{"Ready for review"}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-border/70 bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              {"Sent Campaigns"}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-base">
              🚀
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-emerald-700">{sentCount}</span>
            <p className="mt-0.5 text-xs text-muted">{"Successfully delivered"}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-border/70 bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              {"Opt-in Audience"}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-base">
              🛡️
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-foreground">
              {format.integer(totalAudienceReach)}
            </span>
            <p className="mt-0.5 text-xs text-muted">{"Consent-verified members"}</p>
          </div>
        </div>
      </div>

      {/* Action Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-surface p-4 rounded-2xl border border-border/70 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 bg-cream-100/70 p-1 rounded-xl">
          {(
            [
              { id: "ALL", label: `All (${items.length})` },
              { id: "DRAFT", label: `Drafts (${draftCount})` },
              { id: "SENT", label: `Sent (${sentCount})` },
              { id: "CANCELLED", label: `Cancelled` },
            ] as const
          ).map((filter) => {
            const active = statusFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setStatusFilter(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? "bg-white text-primary shadow-xs"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <Button
          onClick={() => setCreating(true)}
          className="shadow-sm font-semibold flex items-center justify-center gap-2"
        >
          <span>＋</span>
          <span>{t("campaigns.newCampaign")}</span>
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center shadow-xs">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-3xl shadow-2xs">
            📢
          </div>
          <h3 className="mt-4 text-xl font-bold text-green-950">{t("campaigns.empty")}</h3>
          <p className="mt-2 text-sm text-muted max-w-md mx-auto">{t("campaigns.emptyHint")}</p>
          <div className="mt-6">
            <Button onClick={() => setCreating(true)} className="shadow-sm">
              {t("campaigns.newCampaign")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <ResponsiveTable
            label={t("campaigns.listLabel")}
            items={filteredItems}
            rowKey={(c) => c.id}
            columns={[
              {
                id: "name",
                header: t("campaigns.colName"),
                rowHeader: true,
                cell: (c) => (
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground">{c.name}</span>
                    {c.messageEn ? (
                      <span className="text-xs text-muted truncate max-w-xs">{c.messageEn}</span>
                    ) : null}
                  </div>
                ),
              },
              { id: "audience", header: t("campaigns.colAudience"), cell: audience },
              { id: "reach", header: t("campaigns.colReach"), cell: reach },
              { id: "status", header: t("campaigns.colStatus"), cell: status },
              {
                id: "created",
                header: t("campaigns.colCreated"),
                cell: (c) => format.date(c.createdAt),
              },
              { id: "actions", header: t("campaigns.colActions"), cell: actions },
            ]}
            card={(c) => (
              <div className="flex flex-col gap-3 p-4 rounded-xl border border-border/70 bg-surface shadow-2xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-green-950">{c.name}</p>
                    {c.messageEn ? (
                      <p className="text-xs text-muted mt-0.5 line-clamp-2">{c.messageEn}</p>
                    ) : null}
                  </div>
                  {status(c)}
                </div>
                <dl className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border/50">
                  <div>
                    <dt className="text-muted">{t("campaigns.colAudience")}</dt>
                    <dd className="font-medium mt-0.5">{audience(c)}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">{t("campaigns.colReach")}</dt>
                    <dd className="mt-0.5">{reach(c)}</dd>
                  </div>
                </dl>
                <div className="pt-2 border-t border-border/50 flex justify-end">
                  {actions(c)}
                </div>
              </div>
            )}
          />
          <Pagination
            hasPrevious={paging.hasPrevious}
            hasNext={Boolean(list.data.nextCursor)}
            onPrevious={paging.previous}
            onNext={() => list.data.nextCursor && paging.next(list.data.nextCursor)}
            from={paging.from}
            to={paging.from + filteredItems.length - 1}
            loading={list.isFetching}
          />
        </div>
      )}

      {creating ? (
        <CampaignForm
          onClose={() => setCreating(false)}
          onCreated={() => {
            setCreating(false);
            toast.show({ tone: "success", title: t("campaigns.created") });
            paging.reset();
            refresh();
          }}
        />
      ) : null}

      <ConfirmDialog
        open={sending !== null}
        onCancel={() => {
          setSending(null);
          setProblem(null);
        }}
        onConfirm={confirmSend}
        title={t("campaigns.sendTitle")}
        description={
          sending
            ? t("campaigns.sendBody", { count: format.integer(sending.audienceSize) })
            : undefined
        }
        confirmLabel={t("campaigns.sendConfirm")}
      >
        {problem ? <Alert tone="danger">{problem}</Alert> : null}
      </ConfirmDialog>

      <ConfirmDialog
        open={cancelling !== null}
        onCancel={() => {
          setCancelling(null);
          setProblem(null);
        }}
        onConfirm={confirmCancel}
        title={t("campaigns.cancelTitle")}
        description={t("campaigns.cancelBody")}
        confirmLabel={t("campaigns.cancelConfirm")}
        tone="danger"
      >
        {problem ? <Alert tone="danger">{problem}</Alert> : null}
      </ConfirmDialog>
    </div>
  );
}

function CampaignForm({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [messageEn, setMessageEn] = useState("");
  const [messageAm, setMessageAm] = useState("");
  const [audience, setAudience] = useState<Campaign["audience"]>("ALL_OPTED_IN");
  const [previewTab, setPreviewTab] = useState<"en" | "am">("en");
  const [touched, setTouched] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: () =>
      getBrowserApi().campaigns.create({
        name: name.trim(),
        messageEn: messageEn.trim(),
        messageAm: messageAm.trim() || undefined,
        audience,
      }),
  });

  const errors = {
    name: !name.trim()
      ? t("campaigns.nameRequired")
      : name.length > 80
        ? t("campaigns.tooLong")
        : undefined,
    messageEn: !messageEn.trim()
      ? t("campaigns.messageRequired")
      : messageEn.length > MESSAGE_MAX
        ? t("campaigns.tooLong")
        : undefined,
    messageAm: messageAm.length > MESSAGE_MAX ? t("campaigns.tooLong") : undefined,
  };
  const invalid = Boolean(errors.name || errors.messageEn || errors.messageAm);

  async function submit() {
    setTouched(true);
    setProblem(null);
    if (invalid) return;
    try {
      await create.mutateAsync();
      onCreated();
    } catch (failure) {
      const e = toApiError(failure);
      setProblem(
        e.kind === "validation"
          ? t("campaigns.errInvalid")
          : e.kind === "forbidden"
            ? t("campaigns.errForbidden")
            : describeApiError(e, t).description,
      );
    }
  }

  const activeMessage = previewTab === "en" ? messageEn : messageAm || messageEn;

  return (
    <Dialog
      open
      onClose={onClose}
      dismissible={!create.isPending}
      title={t("campaigns.formTitle")}
      description={t("campaigns.consentNote")}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={create.isPending}>
            {t("ui.cancel")}
          </Button>
          <Button onClick={() => void submit()} loading={create.isPending} className="font-semibold shadow-xs">
            {t("campaigns.create")}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        {problem ? <Alert tone="danger">{problem}</Alert> : null}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <FormField
              label={t("campaigns.fieldName")}
              error={touched ? errors.name : undefined}
              required
            >
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={"e.g. Weekend Double Stamp"}
                className="bg-white shadow-2xs"
              />
            </FormField>

            <FormField
              label={t("campaigns.fieldMessageEn")}
              hint={t("campaigns.countHint", { count: messageEn.length })}
              error={touched ? errors.messageEn : undefined}
              required
            >
              <Textarea
                rows={3}
                value={messageEn}
                onChange={(e) => setMessageEn(e.target.value)}
                placeholder={"Come in this weekend to earn double stamps on any purchase!"}
                className="bg-white shadow-2xs"
              />
            </FormField>

            <FormField
              label={t("campaigns.fieldMessageAm")}
              hint={t("campaigns.countHint", { count: messageAm.length })}
              error={touched ? errors.messageAm : undefined}
              optional
            >
              <Textarea
                lang="am"
                rows={3}
                value={messageAm}
                onChange={(e) => setMessageAm(e.target.value)}
                placeholder={"በዚህ ቅዳሜና እሑድ ይምጡና ድርብ ስታምፖችን ያግኙ!"}
                className="bg-white shadow-2xs"
              />
            </FormField>

            <FormField label={t("campaigns.fieldAudience")}>
              <Select
                value={audience}
                onChange={(e) => setAudience(e.target.value as Campaign["audience"])}
                className="bg-white shadow-2xs cursor-pointer"
              >
                {CAMPAIGN_AUDIENCES.map((a) => (
                  <option key={a} value={a}>
                    {t(`campaigns.audience${a}` as MessageKey)}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>

          {/* Live Mobile Simulator Preview Column */}
          <div className="lg:col-span-5 flex flex-col gap-2.5 bg-cream-50/70 p-4 rounded-2xl border border-border/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">
                {"Live Customer Preview"}
              </span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-border/60">
                <button
                  type="button"
                  onClick={() => setPreviewTab("en")}
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    previewTab === "en" ? "bg-primary text-white" : "text-muted"
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab("am")}
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    previewTab === "am" ? "bg-primary text-white" : "text-muted"
                  }`}
                >
                  AM
                </button>
              </div>
            </div>

            {/* Smartphone Card Simulator */}
            <div className="rounded-xl border border-charcoal-800 bg-charcoal-900 p-4 text-white shadow-md flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-charcoal-700/60 pb-2 text-[10px] text-charcoal-400">
                <span className="font-semibold text-charcoal-200">{"9:41"}</span>
                <span>{"Temelash Card"}</span>
              </div>
              <div className="flex items-start gap-2.5 bg-charcoal-800/80 p-3 rounded-lg border border-charcoal-700">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-700 text-base shadow-xs">
                  ☕
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-white truncate">
                      {name.trim() || "Loyalty Campaign"}
                    </p>
                    <span className="text-[10px] text-charcoal-400">{"now"}</span>
                  </div>
                  <p className="mt-1 text-xs text-charcoal-200 break-words leading-relaxed font-sans">
                    {activeMessage.trim() || "Your promotional message will appear here for customers on their phone wallets and messages."}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-charcoal-400 pt-1">
                <span>{"Audience: "}{t(`campaigns.audience${audience}` as MessageKey)}</span>
                <span className="text-emerald-400 font-semibold">{"100% Opt-in"}</span>
              </div>
            </div>

            <p className="text-[11px] text-muted text-center leading-tight">
              {"Customers will see this notification and pass update in their wallet."}
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
