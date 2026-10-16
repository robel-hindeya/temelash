import Link from "next/link";
import type { ReactNode } from "react";
import { AccountMenu } from "@/features/auth/components/account-menu";
import { SessionWatcher } from "@/features/auth/components/session-watcher";
import { SessionProvider } from "@/lib/auth/session-context";
import type { ShellData } from "@/lib/auth/shell-data";
import type { Locale } from "@/lib/i18n/config";
import { getTranslator } from "@/lib/i18n/server";
import { AreaNav } from "./area-nav";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";

/**
 * Page shells, one per product surface, so route groups are visibly and structurally separate:
 *  - PublicShell      customers (join, card): minimal, light, single column
 *  - AuthShell        sign-in and session pages: centred card
 *  - StaffShell       phone-first scanner chrome
 *  - MerchantShell    business dashboard (sidebar on wide screens)
 *  - OperationsShell  TemelashCard staff console, deliberately different colours so it is never mistaken for a merchant view
 * The three signed-in shells receive ShellData from the server (who, where, which navigation): they render
 * what they are given and decide nothing about access.
 */

interface ShellProps {
  locale: Locale;
  children: ReactNode;
}

interface AuthedShellProps extends ShellProps {
  data: ShellData;
}

async function SkipLink({ locale }: { locale: Locale }) {
  const t = await getTranslator(locale);
  return (
    <a
      href="#main"
      className="sr-only-focusable absolute top-2 left-2 z-50 rounded-lg bg-white px-4 py-3 text-green-800 shadow-lg"
    >
      {t("common.skipToContent")}
    </a>
  );
}

function Brand({ locale, light = false }: { locale: Locale; light?: boolean }) {
  return (
    <Link
      href={`/${locale}`}
      className={
        "touch-target inline-flex items-center gap-2.5 font-semibold no-underline group " +
        (light ? "text-white" : "text-green-800")
      }
    >
      <div
        className={
          light
            ? "flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1 shadow-2xs transition-transform group-hover:scale-105"
            : "flex h-8 w-8 items-center justify-center transition-transform group-hover:scale-105"
        }
      >
        <Logo className={light ? "h-6 w-6" : "h-8 w-8"} />
      </div>
      <span className="text-base font-bold tracking-tight">TemelashCard</span>
    </Link>
  );
}

export async function PublicShell({ locale, children }: ShellProps) {
  const t = await getTranslator(locale);
  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <SkipLink locale={locale} />
      <div className="tc-border-pattern h-1.5" aria-hidden="true" />
      <header className="sticky top-0 z-30 border-b border-border/60 bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Brand locale={locale} />
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={`/${locale}/login`}
              className="touch-target inline-flex items-center rounded-control border border-green-800/20 bg-green-50/60 px-3 py-1.5 text-xs sm:text-sm font-semibold text-green-900 transition-colors hover:bg-green-100 dark:bg-green-950/40 dark:text-green-200 dark:border-green-800/40"
            >
              {t("home.heroCtaMerchant")}
            </Link>
            <LanguageSwitcher current={locale} />
          </div>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 pb-12">
        {children}
      </main>
    </div>
  );
}

export async function AuthShell({ locale, children }: ShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink locale={locale} />
      <header className="mx-auto flex w-full max-w-md items-center justify-between gap-3 px-4 py-4">
        <Brand locale={locale} />
        <LanguageSwitcher current={locale} />
      </header>
      <main
        id="main"
        className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 pb-16"
      >
        <div className="rounded-card border border-border bg-surface p-6 shadow-sm">{children}</div>
      </main>
    </div>
  );
}

/** "Sample Cafe · Bole" and the role, so people always see where they are working and as whom. */
function WhoAndWhere({ data, light }: { data: ShellData; light?: boolean }) {
  const text = light ? "text-white/90" : "text-muted";
  return (
    <p className={`min-w-0 text-sm ${text}`} data-testid="shell-context">
      <span className="font-semibold">{data.roleLabel}</span>
      {data.context.map((part) => (
        <span key={part}> · {part}</span>
      ))}
    </p>
  );
}

function HeaderTools({ locale, data, dark }: { locale: Locale; data: ShellData; dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <LanguageSwitcher current={locale} tone={dark ? "dark" : "light"} />
      <AccountMenu
        displayName={data.session.displayName}
        switchBranchHref={data.switchBranchHref}
      />
    </div>
  );
}

export async function StaffShell({ locale, data, children }: AuthedShellProps) {
  return (
    <SessionProvider value={data.session}>
      <SessionWatcher />
      <div className="flex min-h-dvh flex-col bg-cream-100">
        <SkipLink locale={locale} />
        <header className="sticky top-0 z-10 bg-green-800 px-3 py-2 text-white">
          <div className="mx-auto flex w-full max-w-xl flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <Brand locale={locale} light />
            <HeaderTools locale={locale} data={data} dark />
          </div>
          <div className="mx-auto mt-1 w-full max-w-xl">
            <WhoAndWhere data={data} light />
          </div>
        </header>
        <div className="mx-auto w-full max-w-xl px-3 pt-3">
          <AreaNav items={data.nav} label={data.navLabel} />
        </div>
        <main id="main" className="mx-auto w-full max-w-xl flex-1 px-3 py-4">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}

export async function MerchantShell({ locale, data, children }: AuthedShellProps) {
  return (
    <SessionProvider value={data.session}>
      <SessionWatcher />
      <div className="flex min-h-dvh flex-col md:flex-row bg-cream-50/40">
        <SkipLink locale={locale} />

        {/* ──────── DESKTOP SIDEBAR PINNED TO LEFT CORNER ──────── */}
        <aside className="hidden md:flex md:w-64 md:shrink-0 md:flex-col md:border-r md:border-border/80 md:bg-surface md:sticky md:top-0 md:h-dvh md:overflow-y-auto z-30 shadow-2xs">
          {/* Top Corner Brand Block */}
          <div className="flex flex-col gap-1 p-5 border-b border-border/60 bg-surface">
            <Brand locale={locale} />
            <div className="mt-1">
              <WhoAndWhere data={data} />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4">
            <AreaNav items={data.nav} label={data.navLabel} orientation="vertical" />
          </div>
        </aside>

        {/* ──────── MOBILE HEADER (when screen < md) ──────── */}
        <header className="sticky top-0 z-30 border-b border-border/80 bg-surface/95 backdrop-blur-md md:hidden shadow-2xs">
          <div className="flex items-center justify-between gap-2 px-3.5 py-2">
            <div className="flex flex-col min-w-0">
              <Brand locale={locale} />
              <div className="mt-0.5">
                <WhoAndWhere data={data} />
              </div>
            </div>
            <HeaderTools locale={locale} data={data} />
          </div>
          <div className="px-3 pb-2 border-t border-border/50 pt-1.5 bg-surface/60">
            <AreaNav items={data.nav} label={data.navLabel} orientation="horizontal" />
          </div>
        </header>

        {/* ──────── MAIN CONTENT COLUMN ──────── */}
        <div className="flex flex-1 min-w-0 flex-col">
          {/* Desktop Top Bar (User / Language / Actions) */}
          <header className="hidden md:flex h-16 items-center justify-end border-b border-border/80 bg-surface/90 px-6 backdrop-blur-xs sticky top-0 z-20 shadow-2xs">
            <HeaderTools locale={locale} data={data} />
          </header>

          {/* Main Content Area */}
          <main id="main" className="min-w-0 flex-1 p-3.5 sm:p-6 md:p-8">
            <div className="mx-auto w-full max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}

export async function OperationsShell({ locale, data, children }: AuthedShellProps) {
  const t = await getTranslator(locale);
  return (
    <SessionProvider value={data.session}>
      <SessionWatcher />
      <div className="flex min-h-dvh flex-col">
        <SkipLink locale={locale} />
        <header className="bg-charcoal-900 text-white">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 py-2">
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <Brand locale={locale} light />
              <span className="rounded-md bg-gold-500 px-2 py-0.5 text-xs font-bold tracking-wide text-charcoal-900 uppercase">
                {t("areas.operations")}
              </span>
            </div>
            <HeaderTools locale={locale} data={data} dark />
          </div>
          <div className="mx-auto w-full max-w-6xl px-4 pb-2">
            <WhoAndWhere data={data} light />
          </div>
        </header>
        <div className="border-b border-border bg-surface">
          <div className="mx-auto w-full max-w-6xl px-4 py-2">
            <AreaNav items={data.nav} label={data.navLabel} />
          </div>
        </div>
        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
