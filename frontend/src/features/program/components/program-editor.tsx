"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  Alert,
  Badge,
  Button,
  Checkbox,
  ConfirmDialog,
  FormField,
  Input,
  Select,
  Textarea,
  useToast,
} from "@/components/ui";
import type { Tone } from "@/components/ui";
import { getBrowserApi } from "@/lib/api/browser";
import type { Program } from "@/lib/api/contract";
import { STAMP_ICONS } from "@/lib/api/contract";
import { toApiError } from "@/lib/errors/api-error";
import { describeApiError } from "@/lib/errors/messages";
import { useHydrated } from "@/hooks/use-hydrated";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes";
import { useFormat, useI18n } from "@/lib/i18n/client";
import type { MessageKey } from "@/lib/i18n/translator";
import {
  BACKEND_CODE_MESSAGE,
  BLANK_PROGRAM,
  FIELD_FOR_PATH,
  createProgramSchema,
  hasChanges,
  memberVisibleFields,
  toCreateInput,
  toFormValues,
  toPatch,
  type ProgramFormValues,
} from "../program-form";
import { ProgramPreviews } from "./program-previews";
import { StampIcon } from "./stamp-icon";

const STATUS_TONE: Record<Program["status"], Tone> = {
  DRAFT: "neutral",
  ACTIVE: "success",
  PAUSED: "warning",
  ARCHIVED: "neutral",
};
const STATUS_LABEL: Record<Program["status"], MessageKey> = {
  DRAFT: "loyalty.statusDraft",
  ACTIVE: "loyalty.statusActive",
  PAUSED: "loyalty.statusPaused",
  ARCHIVED: "loyalty.statusArchived",
};
const STATUS_EXPLAIN: Record<Program["status"], MessageKey> = {
  DRAFT: "program.statusExplainDraft",
  ACTIVE: "program.statusExplainActive",
  PAUSED: "program.statusExplainPaused",
  ARCHIVED: "program.statusExplainArchived",
};
const ICON_LABEL: Record<(typeof STAMP_ICONS)[number], MessageKey> = {
  coffee: "program.iconCoffee",
  star: "program.iconStar",
  heart: "program.iconHeart",
  check: "program.iconCheck",
  gift: "program.iconGift",
};

const PRESET_COLORS = [
  { name: "Forest", value: "#1B5E3A" },
  { name: "Crimson", value: "#E52131" },
  { name: "Amber", value: "#FBA919" },
  { name: "Blue", value: "#2563EB" },
  { name: "Purple", value: "#7C3AED" },
  { name: "Charcoal", value: "#1E293B" },
];

type Action = "publish" | "pause" | "archive";

export function ProgramEditor({
  program,
  canManage,
  merchant,
  otherActive,
  onChanged,
}: {
  /** The program to edit, or null to create a new draft. */
  program: Program | null;
  canManage: boolean;
  merchant: { nameEn: string; nameAm: string | null };
  /** Another program is the active default, so publishing this one will be refused. */
  otherActive: boolean;
  onChanged: (program: Program) => void;
}) {
  const { t } = useI18n();
  const format = useFormat();
  const toast = useToast();
  const hydrated = useHydrated();
  const schema = useMemo(() => createProgramSchema(t), [t]);
  const saved = useMemo(() => (program ? toFormValues(program) : BLANK_PROGRAM), [program]);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    getValues,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProgramFormValues>({ resolver: zodResolver(schema), defaultValues: saved });

  const loaded = useRef(program?.id ?? "new");
  useEffect(() => {
    const key = program?.id ?? "new";
    if (loaded.current !== key || !isDirty) reset(saved);
    loaded.current = key;
  }, [program, saved, reset, isDirty]);

  const values = useWatch({ control }) as ProgramFormValues;
  const [problem, setProblem] = useState<string | null>(null);
  const [warnPatch, setWarnPatch] = useState<ReturnType<typeof toPatch> | null>(null);
  const [action, setAction] = useState<Action | null>(null);
  const [busy, setBusy] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);

  useUnsavedChangesWarning(isDirty, t("program.unsavedLeave"));

  const archived = program?.status === "ARCHIVED";
  const readOnly = !canManage || archived;
  const locked = program?.stampsRequiredLocked ?? false;

  function explain(error: unknown, formFields = true): string {
    const e = toApiError(error);
    if (formFields) {
      for (const [path, message] of Object.entries(e.fieldErrors)) {
        const field = FIELD_FOR_PATH[path];
        if (field) setError(field, { message });
      }
    }
    const key = BACKEND_CODE_MESSAGE[e.code];
    if (key) return t(key);
    if (e.kind === "validation") return t("errors.validation");
    return describeApiError(e, t).description;
  }

  async function persist(patch: ReturnType<typeof toPatch>) {
    if (!program) return;
    setProblem(null);
    try {
      const updated = await getBrowserApi().programs.update(program.id, patch);
      onChanged(updated);
      reset(toFormValues(updated));
      toast.show({ tone: "success", title: t("program.saved") });
    } catch (error) {
      setProblem(explain(error));
    }
  }

  const submit = handleSubmit(async (formValues) => {
    setProblem(null);
    if (!program) {
      try {
        const created = await getBrowserApi().programs.create(toCreateInput(formValues));
        onChanged(created);
        toast.show({ tone: "success", title: t("program.created") });
      } catch (error) {
        setProblem(explain(error));
      }
      return;
    }
    const patch = toPatch(formValues, program);
    if (!hasChanges(patch)) return;
    if (program.memberCount > 0 && memberVisibleFields(patch).length > 0) {
      setWarnPatch(patch);
      return;
    }
    await persist(patch);
  });

  async function runAction(kind: Action) {
    if (!program) return;
    setBusy(true);
    setProblem(null);
    try {
      const api = getBrowserApi().programs;
      const updated =
        kind === "publish"
          ? await api.activate(program.id)
          : kind === "pause"
            ? await api.pause(program.id)
            : await api.archive(program.id);
      onChanged(updated);
      setAction(null);
    } catch (error) {
      setAction(null);
      setProblem(explain(error, false));
    } finally {
      setBusy(false);
    }
  }

  const memberText = program
    ? program.memberCount === 0
      ? t("program.membersNone")
      : program.memberCount === 1
        ? t("program.membersOne")
        : t("program.membersCount", { count: format.integer(program.memberCount) })
    : null;

  const field = (name: keyof ProgramFormValues) => errors[name]?.message as string | undefined;
  const publishLabel = program?.status === "PAUSED" ? t("program.resume") : t("program.publish");
  const changedFields = warnPatch ? memberVisibleFields(warnPatch).map((key) => t(key)) : [];

  const stepItems = [
    { num: 1, title: t("program.secNames"), icon: "🏷️" },
    { num: 2, title: t("program.secReward"), icon: "🎁" },
    { num: 3, title: t("program.secStamps"), icon: "🎯" },
    { num: 4, title: t("program.secLook"), icon: "🎨" },
    { num: 5, title: t("program.secTerms"), icon: "📜" },
  ];

  return (
    <div
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)]"
      data-hydrated={hydrated}
    >
      <form
        onSubmit={submit}
        noValidate
        className="flex min-w-0 flex-col gap-6"
        data-testid="program-form"
      >
        {/* Header Hero */}
        <div className="flex flex-col gap-3 rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-green-950">
              {program ? program.nameEn : t("program.createTitle")}
            </h2>
            {program ? (
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={STATUS_TONE[program.status]}>{t(STATUS_LABEL[program.status])}</Badge>
                {program.isDefault ? <Badge tone="info">{t("program.defaultBadge")}</Badge> : null}
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cream-200/70 text-charcoal-700">
                  {memberText}
                </span>
              </div>
            ) : null}
          </div>

          {program ? (
            <p className="text-sm text-charcoal-700 leading-relaxed">
              {t(STATUS_EXPLAIN[program.status])}
            </p>
          ) : null}

          {!canManage ? <Alert tone="info">{t("program.readOnlyNote")}</Alert> : null}
          {canManage && archived ? <Alert tone="info">{t("program.archivedNote")}</Alert> : null}
          {problem ? <Alert tone="danger">{problem}</Alert> : null}
          {isDirty && !readOnly ? (
            <Alert tone="warning" data-testid="unsaved">
              {t("program.unsavedBanner")}
            </Alert>
          ) : null}
        </div>

        {/* ──────── ONE UNIFIED BOX FOR ALL 5 CONFIGURATION SECTIONS ──────── */}
        <fieldset
          disabled={readOnly || isSubmitting}
          className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-7 shadow-xs flex flex-col gap-8"
        >
          {/* Stepper Navigation inside the box */}
          <div className="flex flex-col gap-3 border-b border-border/60 pb-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Step {currentStep + 1} of 5: {stepItems[currentStep]?.title}
              </span>
              <span className="text-xs font-semibold text-green-800 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                {currentStep === 4 ? "Final step" : "Next: " + stepItems[currentStep + 1]?.title}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {stepItems.map((step, idx) => {
                const isActive = currentStep === idx;
                const isPast = currentStep > idx;
                return (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => setCurrentStep(idx)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                      isActive
                        ? "border-primary bg-primary text-white shadow-xs"
                        : isPast
                          ? "border-green-300 bg-green-50/80 text-green-950 hover:bg-green-100"
                          : "border-border/60 bg-cream-50/70 text-charcoal-700 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isActive
                          ? "bg-white text-primary"
                          : isPast
                            ? "bg-green-700 text-white"
                            : "bg-white border border-border text-charcoal-700"
                      }`}
                    >
                      {isPast ? "✓" : step.num}
                    </span>
                    <span className="text-xs font-semibold truncate">
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 1: Name */}
          <div
            onFocusCapture={() => setCurrentStep(0)}
            className={currentStep === 0 ? "flex flex-col gap-4" : "hidden"}
          >
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-sm">
                🏷️
              </span>
              <div>
                <h3 className="text-lg font-bold text-green-950">{t("program.secNames")}</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                label={
                  <span>
                    <span className="sr-only">{t("program.nameEn")}</span>
                    <span aria-hidden="true">English</span>
                  </span>
                }
                error={field("nameEn")}
                required
              >
                <Input
                  {...register("nameEn")}
                  className="bg-white shadow-2xs focus:ring-2 focus:ring-primary/20"
                />
              </FormField>
              <FormField
                label={
                  <span>
                    <span className="sr-only">{t("program.nameAm")}</span>
                    <span aria-hidden="true">Amharic</span>
                  </span>
                }
                error={field("nameAm")}
              >
                <Input
                  lang="am"
                  {...register("nameAm")}
                  className="bg-white shadow-2xs focus:ring-2 focus:ring-primary/20"
                />
              </FormField>
            </div>
            <div className="flex justify-end pt-3">
              <Button type="button" variant="primary" onClick={() => setCurrentStep(1)}>
                Next: {t("program.secReward")} &gt;
              </Button>
            </div>
          </div>

          {/* STEP 2: Reward */}
          <div
            onFocusCapture={() => setCurrentStep(1)}
            className={currentStep === 1 ? "flex flex-col gap-4" : "hidden"}
          >
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-sm">
                🎁
              </span>
              <div>
                <h3 className="text-lg font-bold text-green-950">{t("program.secReward")}</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField label={t("program.rewardNameEn")} error={field("rewardNameEn")} required>
                <Input
                  {...register("rewardNameEn")}
                  className="bg-white shadow-2xs focus:ring-2 focus:ring-primary/20"
                />
              </FormField>
              <FormField label={t("program.rewardNameAm")} error={field("rewardNameAm")}>
                <Input
                  lang="am"
                  {...register("rewardNameAm")}
                  className="bg-white shadow-2xs focus:ring-2 focus:ring-primary/20"
                />
              </FormField>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField label={t("program.rewardDescEn")} error={field("rewardDescriptionEn")}>
                <Textarea
                  rows={2}
                  {...register("rewardDescriptionEn")}
                  className="bg-white shadow-2xs focus:ring-2 focus:ring-primary/20"
                />
              </FormField>
              <FormField label={t("program.rewardDescAm")} error={field("rewardDescriptionAm")}>
                <Textarea
                  rows={2}
                  lang="am"
                  {...register("rewardDescriptionAm")}
                  className="bg-white shadow-2xs focus:ring-2 focus:ring-primary/20"
                />
              </FormField>
            </div>
            <div className="max-w-xs">
              <FormField
                label={t("program.validForDays")}
                hint={t("program.validForDaysHint")}
                error={field("validForDays")}
              >
                <div className="relative flex items-center">
                  <Input
                    inputMode="numeric"
                    className="bg-white shadow-2xs pr-14 focus:ring-2 focus:ring-primary/20"
                    {...register("validForDays")}
                  />
                  <span className="pointer-events-none absolute right-3 text-xs font-semibold text-muted">
                    days
                  </span>
                </div>
              </FormField>
            </div>
            <div className="flex justify-between items-center pt-3">
              <Button type="button" variant="ghost" onClick={() => setCurrentStep(0)}>
                &lt; {t("program.secNames")}
              </Button>
              <Button type="button" variant="primary" onClick={() => setCurrentStep(2)}>
                Next: {t("program.secStamps")} &gt;
              </Button>
            </div>
          </div>

          {/* STEP 3: Stamps */}
          <div
            onFocusCapture={() => setCurrentStep(2)}
            className={currentStep === 2 ? "flex flex-col gap-4" : "hidden"}
          >
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-sm">
                🎯
              </span>
              <div>
                <h3 className="text-lg font-bold text-green-950">{t("program.secStamps")}</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                label={t("program.stampsRequired")}
                error={field("stampsRequired")}
                required
              >
                {locked ? (
                  <span className="sr-only">
                    {t("program.stampsLocked", { count: format.integer(program?.memberCount ?? 0) })}
                  </span>
                ) : null}
                <div className="relative flex items-center">
                  <Input
                    inputMode="numeric"
                    disabled={locked}
                    className="bg-white shadow-2xs pr-16 focus:ring-2 focus:ring-primary/20"
                    {...register("stampsRequired")}
                  />
                  <span className="pointer-events-none absolute right-3 text-xs font-semibold text-muted">
                    stamps
                  </span>
                </div>
              </FormField>
              <FormField
                label={t("program.cooldown")}
                error={field("cooldownMinutes")}
                required
              >
                <div className="relative flex items-center">
                  <Input
                    inputMode="numeric"
                    className="bg-white shadow-2xs pr-14 focus:ring-2 focus:ring-primary/20"
                    {...register("cooldownMinutes")}
                  />
                  <span className="pointer-events-none absolute right-3 text-xs font-semibold text-muted">
                    mins
                  </span>
                </div>
              </FormField>
            </div>
            <div className="flex justify-between items-center pt-3">
              <Button type="button" variant="ghost" onClick={() => setCurrentStep(1)}>
                &lt; {t("program.secReward")}
              </Button>
              <Button type="button" variant="primary" onClick={() => setCurrentStep(3)}>
                Next: {t("program.secLook")} &gt;
              </Button>
            </div>
          </div>

          {/* STEP 4: Look & Feel */}
          <div
            onFocusCapture={() => setCurrentStep(3)}
            className={currentStep === 3 ? "flex flex-col gap-4" : "hidden"}
          >
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-sm">
                🎨
              </span>
              <div>
                <h3 className="text-lg font-bold text-green-950">{t("program.secLook")}</h3>
              </div>
            </div>

            <FormField
              label={t("program.brandColor")}
              error={field("brandColor")}
            >
              <div className="flex flex-col gap-3">
                {/* Preset swatches */}
                <div className="flex flex-wrap items-center gap-2">
                  {PRESET_COLORS.map((preset) => {
                    const active = values.brandColor?.toUpperCase() === preset.value;
                    return (
                      <button
                        key={preset.value}
                        type="button"
                        title={preset.name}
                        aria-label={preset.name}
                        onClick={() =>
                          setValue("brandColor", preset.value, {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                        className={`flex items-center justify-center h-8 w-8 rounded-full border transition-all ${
                          active
                            ? "border-primary ring-2 ring-primary/30 scale-110 shadow-xs"
                            : "border-border bg-white/80 hover:scale-105"
                        }`}
                      >
                        <span
                          className="h-5 w-5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                          style={{ backgroundColor: preset.value }}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    aria-label={t("program.brandColor")}
                    value={
                      /^#[0-9A-Fa-f]{6}$/.test(values.brandColor ?? "")
                        ? values.brandColor
                        : "#1b5e3a"
                    }
                    onChange={(event) =>
                      setValue("brandColor", event.target.value.toUpperCase(), {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                    className="h-11 w-14 cursor-pointer rounded-xl border border-border bg-white p-1 shadow-2xs"
                  />
                  <Input
                    className="max-w-40 font-mono uppercase bg-white shadow-2xs"
                    maxLength={7}
                    {...register("brandColor")}
                  />
                </div>
              </div>
            </FormField>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField label={t("program.cardTitle")} error={field("cardTitle")}>
                <Input {...register("cardTitle")} className="bg-white shadow-2xs" />
              </FormField>
              <FormField label={t("program.cardSubtitle")} error={field("cardSubtitle")}>
                <Input {...register("cardSubtitle")} className="bg-white shadow-2xs" />
              </FormField>
            </div>

            <FormField label={t("program.stampIcon")}>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  {STAMP_ICONS.map((icon) => {
                    const active = values.stampIcon === icon;
                    return (
                      <button
                        key={icon}
                        type="button"
                        onClick={() =>
                          setValue("stampIcon", icon, {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium border transition-all ${
                          active
                            ? "border-primary bg-green-50 text-green-900 shadow-2xs ring-1 ring-primary"
                            : "border-border bg-white text-charcoal-700 hover:bg-cream-100"
                        }`}
                      >
                        <StampIcon icon={icon} size={18} />
                        <span>{t(ICON_LABEL[icon])}</span>
                      </button>
                    );
                  })}
                </div>
                {/* Native select preserved for accessibility & tests */}
                <Select className="sr-only" tabIndex={-1} {...register("stampIcon")}>
                  {STAMP_ICONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {t(ICON_LABEL[icon])}
                    </option>
                  ))}
                </Select>
              </div>
            </FormField>

            <div className="pt-2">
              <Checkbox label={t("program.showProgressText")} {...register("showProgressText")} />
            </div>

            <div className="flex justify-between items-center pt-3">
              <Button type="button" variant="ghost" onClick={() => setCurrentStep(2)}>
                &lt; {t("program.secStamps")}
              </Button>
              <Button type="button" variant="primary" onClick={() => setCurrentStep(4)}>
                Next: {t("program.secTerms")} &gt;
              </Button>
            </div>
          </div>

          {/* STEP 5: Terms */}
          <div
            onFocusCapture={() => setCurrentStep(4)}
            className={currentStep === 4 ? "flex flex-col gap-4" : "hidden"}
          >
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-sm">
                📜
              </span>
              <div>
                <h3 className="text-lg font-bold text-green-950">{t("program.secTerms")}</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField label={t("program.termsEn")} error={field("termsEn")}>
                <Textarea rows={3} {...register("termsEn")} className="bg-white shadow-2xs" />
              </FormField>
              <FormField label={t("program.termsAm")} error={field("termsAm")}>
                <Textarea rows={3} lang="am" {...register("termsAm")} className="bg-white shadow-2xs" />
              </FormField>
            </div>
            <div className="flex justify-between items-center pt-3">
              <Button type="button" variant="ghost" onClick={() => setCurrentStep(3)}>
                &lt; {t("program.secLook")}
              </Button>
              <span className="text-xs font-semibold text-green-800 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                ✓ All sections complete
              </span>
            </div>
          </div>
        </fieldset>

        {/* ──────── UNDER-BOX SAVE BOX ──────── */}
        {!readOnly ? (
          <div className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center font-bold text-lg shadow-2xs ${
                  isDirty
                    ? "bg-gold-100 text-gold-text border border-gold-300"
                    : "bg-green-50 text-green-800 border border-green-200"
                }`}
              >
                {isDirty ? "!" : "✓"}
              </div>
              <div>
                <h3 className="font-bold text-green-950 text-base">
                  {isDirty ? "Ready to save your program" : "Program settings saved"}
                </h3>
                <p className="text-xs text-muted">
                  {isDirty
                    ? "Review your changes in the live preview before saving."
                    : "All changes are saved and synced."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {program && isDirty ? (
                <Button variant="ghost" onClick={() => reset(saved)}>
                  {t("program.discard")}
                </Button>
              ) : null}
              <Button
                type="submit"
                size="lg"
                loading={isSubmitting}
                loadingLabel={t("program.saving")}
                disabled={!hydrated || (Boolean(program) && !isDirty)}
                className="shadow-sm font-semibold px-6"
              >
                {!program
                  ? t("program.createDraft")
                  : program.status === "DRAFT"
                    ? t("program.saveDraft")
                    : t("program.saveChanges")}
              </Button>
            </div>
          </div>
        ) : null}

        {/* Program Lifecycle Card */}
        {program && canManage && program.status !== "ARCHIVED" ? (
          <section
            aria-labelledby="status-title"
            className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream-200/60 text-sm">
                  ⚡
                </span>
                <div>
                  <h3 id="status-title" className="font-bold text-green-950">
                    {t(STATUS_LABEL[program.status])}
                  </h3>
                  <p className="text-xs text-muted">Manage program publication, pause status, or archiving</p>
                </div>
              </div>
            </div>

            {otherActive && program.status !== "ACTIVE" ? (
              <Alert tone="warning">{t("program.otherActive")}</Alert>
            ) : null}
            {isDirty && program.status !== "ACTIVE" ? (
              <p className="text-xs text-muted">{t("program.saveBeforePublish")}</p>
            ) : null}

            <div className="flex flex-wrap gap-3 pt-1">
              {program.status === "DRAFT" || program.status === "PAUSED" ? (
                <Button disabled={isDirty || busy} onClick={() => setAction("publish")}>
                  {publishLabel}
                </Button>
              ) : null}
              {program.status === "ACTIVE" ? (
                <Button variant="secondary" disabled={busy} onClick={() => setAction("pause")}>
                  {t("program.pause")}
                </Button>
              ) : null}
              <Button variant="danger" disabled={busy} onClick={() => setAction("archive")}>
                {t("program.archive")}
              </Button>
            </div>
          </section>
        ) : null}
      </form>

      {/* Sticky Right Preview Column */}
      <aside className="min-w-0 lg:sticky lg:top-4 lg:self-start">
        <ProgramPreviews
          values={values?.nameEn === undefined ? getValues() : values}
          merchant={merchant}
          dirty={isDirty}
        />
      </aside>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        open={warnPatch !== null}
        title={t("program.warnTitle", { count: format.integer(program?.memberCount ?? 0) })}
        description={t("program.warnBody", { fields: format.list(changedFields) })}
        confirmLabel={t("program.warnConfirm")}
        cancelLabel={t("ui.cancel")}
        onCancel={() => setWarnPatch(null)}
        onConfirm={async () => {
          const patch = warnPatch;
          setWarnPatch(null);
          if (patch) await persist(patch);
        }}
      />
      <ConfirmDialog
        open={action === "publish"}
        title={program?.status === "PAUSED" ? t("program.resumeTitle") : t("program.publishTitle")}
        description={
          program?.status === "PAUSED" ? t("program.resumeBody") : t("program.publishBody")
        }
        confirmLabel={publishLabel}
        cancelLabel={t("ui.cancel")}
        onCancel={() => setAction(null)}
        onConfirm={() => runAction("publish")}
      />
      <ConfirmDialog
        open={action === "pause"}
        title={t("program.pauseTitle")}
        description={t("program.pauseBody")}
        confirmLabel={t("program.pause")}
        cancelLabel={t("ui.cancel")}
        onCancel={() => setAction(null)}
        onConfirm={() => runAction("pause")}
      />
      <ConfirmDialog
        open={action === "archive"}
        tone="danger"
        requirePhrase={t("program.archivePhrase")}
        title={t("program.archiveTitle")}
        description={t("program.archiveBody")}
        confirmLabel={t("program.archive")}
        cancelLabel={t("ui.cancel")}
        onCancel={() => setAction(null)}
        onConfirm={() => runAction("archive")}
      />
    </div>
  );
}
