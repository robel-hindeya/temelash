"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Badge,
  Button,
  EmptyState,
  ErrorState,
  FormField,
  Select,
  Skeleton,
  SkeletonGroup,
  Tabs,
} from "@/components/ui";
import type { Tone } from "@/components/ui";
import { getBrowserApi } from "@/lib/api/browser";
import type { Program } from "@/lib/api/contract";
import { toApiError } from "@/lib/errors/api-error";
import { describeApiError } from "@/lib/errors/messages";
import { useI18n } from "@/lib/i18n/client";
import { pickLocalized } from "@/features/enrollment/localized";
import type { PosterLanguage } from "../qr-links";
import { JoinMaterials, type JoinCode } from "./join-materials";
import type { PosterMessages } from "./poster";
import { ProgramEditor } from "./program-editor";

const NEW = "new";
const STATUS_LABEL = {
  DRAFT: "loyalty.statusDraft",
  ACTIVE: "loyalty.statusActive",
  PAUSED: "loyalty.statusPaused",
  ARCHIVED: "loyalty.statusArchived",
} as const;
const STATUS_TONE: Record<Program["status"], Tone> = {
  DRAFT: "neutral",
  ACTIVE: "success",
  PAUSED: "warning",
  ARCHIVED: "neutral",
};

/**
 * The modern program builder: pick a program (or start a new one), edit it with live previews, and print the join
 * materials. The list comes from the backend, and every change is saved there before it is shown as saved.
 */
export function ProgramWorkspace({
  canManage,
  merchant,
  codes,
  posterMessages,
}: {
  canManage: boolean;
  merchant: { nameEn: string; nameAm: string | null };
  codes: Record<PosterLanguage, JoinCode> | null;
  posterMessages: PosterMessages;
}) {
  const { t, locale } = useI18n();
  const client = useQueryClient();
  const query = useQuery({
    queryKey: ["programs"],
    queryFn: ({ signal }) => getBrowserApi().programs.list(signal),
  });
  const [choice, setChoice] = useState<string | null>(null);

  if (query.isPending) {
    return (
      <SkeletonGroup className="flex flex-col gap-6">
        <Skeleton className="h-16 w-full rounded-2xl" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
          <Skeleton className="h-96 w-full rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </SkeletonGroup>
    );
  }
  if (query.isError) {
    const failure = toApiError(query.error);
    return (
      <ErrorState
        title={t("program.loadErrorTitle")}
        description={describeApiError(failure, t).description}
        requestId={failure.requestId}
        onRetry={() => void query.refetch()}
        retrying={query.isFetching}
      />
    );
  }

  const programs = query.data;
  const live = programs.find((p) => p.isDefault && p.status === "ACTIVE") ?? null;
  const fallback = live ?? programs.find((p) => p.status !== "ARCHIVED") ?? programs[0] ?? null;
  const selectedId = choice ?? fallback?.id ?? (canManage ? NEW : null);
  const selected =
    selectedId === NEW ? null : (programs.find((p) => p.id === selectedId) ?? fallback);

  if (programs.length === 0 && !canManage) {
    return <EmptyState title={t("program.noPrograms")} />;
  }

  function changed(program: Program) {
    client.setQueryData<Program[]>(["programs"], (current = []) =>
      current.some((p) => p.id === program.id)
        ? current.map((p) => (p.id === program.id ? program : p))
        : [...current, program],
    );
    setChoice(program.id);
    void client.invalidateQueries({ queryKey: ["programs"] });
  }

  const posterProgram = live ?? selected;
  const label = (p: Program) => {
    const name = pickLocalized(locale, p.nameEn, p.nameAm).text;
    return `${name} (${t(STATUS_LABEL[p.status])})`;
  };

  return (
    <div className="flex flex-col gap-6">
      {programs.length > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-surface p-4 shadow-xs">
          <div className="flex flex-wrap items-center gap-3 min-w-0 flex-1">
            <div className="w-full sm:max-w-xs min-w-0">
              <FormField label={t("program.listLabel")}>
                <Select
                  value={selectedId ?? ""}
                  onChange={(event) => setChoice(event.target.value)}
                  className="font-medium text-foreground bg-white shadow-xs focus:ring-2 focus:ring-primary/20"
                >
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {label(p)}
                    </option>
                  ))}
                  {selectedId === NEW ? (
                    <option value={NEW}>{t("program.createTitle")}</option>
                  ) : null}
                </Select>
              </FormField>
            </div>
            {selected ? (
              <div className="flex items-center gap-2 pt-5">
                <Badge tone={STATUS_TONE[selected.status]}>
                  {t(STATUS_LABEL[selected.status])}
                </Badge>
              </div>
            ) : null}
          </div>

          {canManage && selectedId !== NEW ? (
            <Button
              variant="secondary"
              onClick={() => setChoice(NEW)}
              className="shadow-xs hover:border-primary/50 transition-all"
            >
              <span className="mr-1.5 font-bold text-base leading-none">+</span>
              {t("program.newProgram")}
            </Button>
          ) : null}
        </div>
      ) : (
        <EmptyState title={t("program.noPrograms")} description={t("program.noProgramsBody")} />
      )}

      <Tabs
        label={t("nav.program")}
        tabs={[
          {
            id: "program",
            label: t("program.tabProgram"),
            content: (
              <ProgramEditor
                key={selected?.id ?? NEW}
                program={selected}
                canManage={canManage}
                merchant={merchant}
                otherActive={Boolean(live && live.id !== selected?.id)}
                onChanged={changed}
              />
            ),
          },
          {
            id: "qr",
            label: t("program.tabQr"),
            content: (
              <JoinMaterials
                codes={codes}
                merchant={merchant}
                program={posterProgram}
                programIsLive={Boolean(live)}
                posterMessages={posterMessages}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
