"use client";

import { useState } from "react";
import { Alert, Button, RadioGroup } from "@/components/ui";
import type { Program } from "@/lib/api/contract";
import { useI18n } from "@/lib/i18n/client";
import { downloadBlob, downloadSvg, svgToPng } from "../qr-download";
import type { PosterLanguage } from "../qr-links";
import { Poster, type PosterMessages } from "./poster";

export interface JoinCode {
  url: string;
  svg: string;
}

export function JoinMaterials({
  codes,
  merchant,
  program,
  programIsLive,
  posterMessages,
}: {
  /** Null when the backend gave no join reference. */
  codes: Record<PosterLanguage, JoinCode> | null;
  merchant: { nameEn: string; nameAm: string | null };
  /** The program the poster talks about (the live one if there is one). */
  program: Program | null;
  /** Customers can join it right now (it is the active default). */
  programIsLive: boolean;
  posterMessages: PosterMessages;
}) {
  const { t } = useI18n();
  const [language, setLanguage] = useState<PosterLanguage>("both");
  const [problem, setProblem] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!codes) {
    return <Alert tone="warning">{t("program.qrNoReference")}</Alert>;
  }
  const code = codes[language];
  const stem = `join-qr-${language}`;

  async function savePng() {
    setProblem(null);
    try {
      downloadBlob(await svgToPng(code.svg), `${stem}.png`);
    } catch {
      setProblem(t("errors.unexpected"));
    }
  }

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(code.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }

  return (
    <div className="flex flex-col gap-6" data-testid="join-materials">
      <header className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs">
        <h2 className="text-2xl font-bold tracking-tight text-green-950">{t("program.qrTitle")}</h2>
        <p className="mt-1 max-w-prose text-sm text-charcoal-700 leading-relaxed">{t("program.qrIntro")}</p>
      </header>

      {!programIsLive ? <Alert tone="warning">{t("program.qrNeedsActive")}</Alert> : null}
      {problem ? <Alert tone="danger">{problem}</Alert> : null}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        <div className="flex flex-col gap-5 print:hidden">
          {/* QR Code Quick Card */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/80 bg-surface p-6 shadow-xs text-center">
            <div
              className="h-44 w-44 rounded-xl bg-white p-3 border border-border/60 shadow-xs flex items-center justify-center [&_svg]:h-full [&_svg]:w-full"
              dangerouslySetInnerHTML={{ __html: code.svg }}
            />
            <div className="flex flex-col gap-2 w-full">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider">{t("program.qrLink")}</p>
              <div className="flex items-center gap-2 rounded-xl bg-cream-100 p-2 border border-border/70">
                <a
                  href={code.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs break-all text-green-800 hover:text-green-950 flex-1 text-left line-clamp-1"
                  data-testid="join-link"
                >
                  {code.url}
                </a>
                <button
                  type="button"
                  onClick={copyUrl}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-border shadow-2xs hover:bg-cream-200 transition-all shrink-0"
                >
                  {copied ? "Copied! ✓" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Options Card */}
          <div className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-surface p-5 shadow-xs">
            <RadioGroup
              name="poster-language"
              legend={t("program.qrLanguage")}
              value={language}
              onValueChange={(value) => setLanguage(value as PosterLanguage)}
              options={[
                { value: "en", label: t("program.qrEnglish") },
                { value: "am", label: t("program.qrAmharic") },
                {
                  value: "both",
                  label: t("program.qrBilingual"),
                  description: t("program.qrBilingualNote"),
                },
              ]}
            />

            <div className="flex flex-wrap gap-2.5 pt-2 border-t border-border/50">
              <Button variant="secondary" onClick={() => downloadSvg(code.svg, `${stem}.svg`)} className="flex-1">
                {t("program.qrDownloadSvg")}
              </Button>
              <Button variant="secondary" onClick={() => void savePng()} className="flex-1">
                {t("program.qrDownloadPng")}
              </Button>
            </div>

            <div className="pt-2">
              <Button onClick={() => window.print()} className="w-full">
                {t("program.qrPrint")}
              </Button>
              <p className="mt-1.5 text-xs text-muted text-center">{t("program.qrPrintHint")}</p>
            </div>
          </div>

          {/* Branch notice */}
          <section
            aria-labelledby="branch-qr"
            className="rounded-2xl border border-border/80 bg-surface p-5 shadow-xs"
          >
            <h3 id="branch-qr" className="font-bold text-green-950 text-sm">
              {t("program.qrBranchTitle")}
            </h3>
            <p className="mt-1 text-xs text-charcoal-700 leading-relaxed" data-testid="branch-qr-unavailable">
              {t("program.qrBranchUnavailable")}
            </p>
          </section>
          <p className="text-xs text-muted px-1">{t("program.qrLogoNote")}</p>
        </div>

        {/* Live Poster Preview */}
        <div className="min-w-0">
          <div className="flex items-center justify-between mb-3 print:hidden">
            <h3 className="font-bold text-green-950 text-base">
              {t("program.qrPosterPreview")}
            </h3>
            <span className="text-xs text-muted font-medium bg-cream-200/50 px-2 py-0.5 rounded-full">
              {"Printable Poster"}
            </span>
          </div>
          {program ? (
            <div className="rounded-2xl border border-border/80 bg-surface p-4 shadow-sm overflow-hidden flex justify-center">
              <Poster
                language={language}
                qrSvg={code.svg}
                url={code.url}
                merchant={merchant}
                program={program}
                messages={posterMessages}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
