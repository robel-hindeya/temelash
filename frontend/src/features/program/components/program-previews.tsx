"use client";

import { useState } from "react";
import { RadioGroup, StampProgress, Tabs } from "@/components/ui";
import { MerchantSummary } from "@/features/enrollment/components/merchant-summary";
import { pickLocalized, readableOn, safeBrandColor } from "@/features/enrollment/localized";
import type { JoinInfo } from "@/lib/api/contract";
import type { Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";
import type { ProgramFormValues } from "../program-form";
import { StampIcon } from "./stamp-icon";

const clampStamps = (text: string) => {
  const n = Number(text);
  return Number.isInteger(n) && n >= 1 && n <= 1000 ? n : 8;
};

/** Turns the form, as it is right now (saved or not), into what the join page would be given. */
export function draftJoinInfo(
  v: ProgramFormValues,
  merchant: { nameEn: string; nameAm: string | null },
  fallback: { program: string; reward: string },
): JoinInfo {
  return {
    merchant: { nameEn: merchant.nameEn, nameAm: merchant.nameAm, defaultLanguage: "EN" },
    program: {
      nameEn: v.nameEn.trim() || fallback.program,
      nameAm: v.nameAm.trim() || null,
      stampsRequired: clampStamps(v.stampsRequired),
      brandColor: v.brandColor || null,
      cardDisplay: {},
      termsEn: v.termsEn.trim() || null,
      termsAm: v.termsAm.trim() || null,
      reward: {
        nameEn: v.rewardNameEn.trim() || fallback.reward,
        nameAm: v.rewardNameAm.trim() || null,
        descriptionEn: v.rewardDescriptionEn.trim() || null,
        descriptionAm: v.rewardDescriptionAm.trim() || null,
      },
    },
    consent: { version: "preview" },
    wallet: [],
  };
}

/**
 * Three live interactive previews of the program as it is in the form, saved or not: the join page, the web card and a
 * wallet-card sketch. Everything shown is sample data (no real customer, no real QR code), and the previews dynamically
 * react to form input in real time.
 */
export function ProgramPreviews({
  values,
  merchant,
  dirty,
}: {
  values: ProgramFormValues;
  merchant: { nameEn: string; nameAm: string | null };
  dirty: boolean;
}) {
  const { t } = useI18n();
  const [language, setLanguage] = useState<Locale>("en");
  const [sample, setSample] = useState<number | null>(null);
  const info = draftJoinInfo(values, merchant, {
    program: t("program.previewNoName"),
    reward: t("program.previewNoReward"),
  });
  const required = info.program.stampsRequired;
  const stamps = Math.min(sample ?? Math.min(3, required - 1), required);

  return (
    <section
      aria-labelledby="preview-title"
      className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-surface p-5 shadow-xs transition-all"
      data-testid="previews"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
        <div>
          <h2 id="preview-title" className="text-base font-bold text-green-950 flex items-center gap-2">
            <span>{t("program.previewTitle")}</span>
          </h2>
          <p className="text-xs text-muted">{t("program.previewNote")}</p>
        </div>
        {dirty ? (
          <span
            className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-2.5 py-0.5 text-xs font-semibold text-gold-text border border-gold-300"
            data-testid="preview-draft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse" />
            {t("program.previewDraft")}
          </span>
        ) : null}
      </div>

      {/* Simulator controls */}
      <div className="flex flex-col gap-3 rounded-xl bg-cream-100/70 p-3.5 border border-border/60">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <RadioGroup
            name="preview-language"
            legend={t("program.previewLanguage")}
            value={language}
            onValueChange={(v) => setLanguage(v as Locale)}
            options={[
              { value: "en", label: t("program.qrEnglish") },
              { value: "am", label: t("program.qrAmharic") },
            ]}
          />
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSample(Math.max(0, stamps - 1))}
              disabled={stamps <= 0}
              aria-label={"Decrease stamp"}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-white border border-border text-sm font-bold text-foreground shadow-2xs hover:bg-cream-100 disabled:opacity-40"
            >
              -
            </button>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-white border border-border tabular-nums">
              {stamps}/{required}
            </span>
            <button
              type="button"
              onClick={() => setSample(Math.min(required, stamps + 1))}
              disabled={stamps >= required}
              aria-label={"Increase stamp"}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-white border border-border text-sm font-bold text-foreground shadow-2xs hover:bg-cream-100 disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>

        <label className="flex flex-col gap-1 text-xs font-medium text-charcoal-700">
          <span>{t("program.previewStamps")}: <strong className="text-foreground">{stamps} of {required}</strong></span>
          <input
            type="range"
            min={0}
            max={required}
            value={stamps}
            onChange={(event) => setSample(Number(event.target.value))}
            className="w-full accent-green-700 cursor-pointer h-1.5 bg-border rounded-lg"
          />
        </label>
      </div>

      <Tabs
        label={t("program.previewTitle")}
        tabs={[
          {
            id: "join",
            label: t("program.previewJoin"),
            content: (
              <div
                className="rounded-2xl border border-border/80 bg-white p-4 shadow-xs"
                data-testid="preview-join"
              >
                <MerchantSummary info={info} locale={language} t={t} />
              </div>
            ),
          },
          {
            id: "web",
            label: t("program.previewWeb"),
            content: <WebCardPreview info={info} stamps={stamps} language={language} />,
          },
          {
            id: "wallet",
            label: t("program.previewWallet"),
            content: (
              <WalletCardPreview info={info} values={values} stamps={stamps} language={language} />
            ),
          },
        ]}
      />
    </section>
  );
}

function WebCardPreview({
  info,
  stamps,
  language,
}: {
  info: JoinInfo;
  stamps: number;
  language: Locale;
}) {
  const { t } = useI18n();
  const business = pickLocalized(language, info.merchant.nameEn, info.merchant.nameAm);
  const program = pickLocalized(language, info.program.nameEn, info.program.nameAm);
  const reward = info.program.reward
    ? pickLocalized(language, info.program.reward.nameEn, info.program.reward.nameAm)
    : null;
  const color = safeBrandColor(info.program.brandColor);
  return (
    <article
      data-testid="preview-web"
      aria-label={t("program.previewWeb")}
      className="w-full max-w-sm rounded-2xl overflow-hidden shadow-sm border border-border/80 bg-white mx-auto"
    >
      <header
        className="p-4 transition-colors"
        style={{ backgroundColor: color, color: readableOn(color) }}
      >
        <p className="text-xs uppercase tracking-wider opacity-85 font-semibold" lang={business.lang}>
          {business.text}
        </p>
        <p className="text-xl font-bold break-words mt-0.5" lang={program.lang}>
          {program.text}
        </p>
        <p className="mt-2 text-sm font-medium opacity-90">
          {t("card.greeting", { name: t("program.previewSampleName") })}
        </p>
      </header>
      <div className="flex flex-col gap-3 p-4 bg-surface">
        <StampProgress
          current={stamps}
          required={info.program.stampsRequired}
          rewardReady={stamps >= info.program.stampsRequired}
        />
        {reward ? (
          <p className="break-words text-sm text-charcoal-700 bg-cream-50 p-2.5 rounded-xl border border-border/60" lang={reward.lang}>
            🎁 {t("card.rewardTarget", { count: info.program.stampsRequired, reward: reward.text })}
          </p>
        ) : null}
        <div className="flex h-28 items-center justify-center rounded-xl border-2 border-dashed border-border bg-white text-xs font-mono text-muted">
          {t("program.previewQr")}
        </div>
      </div>
    </article>
  );
}

function WalletCardPreview({
  info,
  values,
  stamps,
  language,
}: {
  info: JoinInfo;
  values: ProgramFormValues;
  stamps: number;
  language: Locale;
}) {
  const { t } = useI18n();
  const program = pickLocalized(language, info.program.nameEn, info.program.nameAm);
  const color = safeBrandColor(info.program.brandColor);
  const ink = readableOn(color);
  const title = values.cardTitle.trim() || program.text;
  const total = Math.min(info.program.stampsRequired, 20);
  return (
    <article
      data-testid="preview-wallet"
      aria-label={t("program.previewWallet")}
      className="w-full max-w-sm rounded-3xl p-5 shadow-md border border-white/20 mx-auto transition-all"
      style={{
        backgroundColor: color,
        color: ink,
        backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.08) 100%)",
      }}
    >
      <div className="flex items-center justify-between opacity-80 text-xs tracking-wider uppercase font-semibold">
        <span>{"LOYALTY PASS"}</span>
        <span className="flex h-2 w-2 rounded-full bg-current opacity-75" />
      </div>
      <p className="text-xl font-bold break-words mt-1" lang={program.lang}>
        {title}
      </p>
      {values.cardSubtitle.trim() ? (
        <p className="break-words text-sm opacity-90">{values.cardSubtitle}</p>
      ) : null}

      <div
        className="mt-4 flex flex-wrap gap-2.5"
        role="img"
        aria-label={t("ui.stampProgress", {
          current: Math.min(stamps, total),
          required: info.program.stampsRequired,
        })}
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 transition-transform"
            style={{
              borderColor: ink,
              backgroundColor: i < stamps ? ink : "transparent",
              color: i < stamps ? color : ink,
              opacity: i < stamps ? 1 : 0.45,
            }}
          >
            <StampIcon icon={values.stampIcon} size={18} />
          </span>
        ))}
      </div>
      {values.showProgressText ? (
        <p className="mt-4 text-xs font-semibold tracking-wide uppercase opacity-90" data-testid="wallet-progress-text">
          {t("ui.stampProgress", {
            current: Math.min(stamps, info.program.stampsRequired),
            required: info.program.stampsRequired,
          })}
        </p>
      ) : null}
    </article>
  );
}
