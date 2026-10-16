import type { Metadata } from "next";
import Link from "next/link";
import { StampSimulator } from "@/features/home/components/stamp-simulator";
import { assertLocale, getTranslator } from "@/lib/i18n/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslator(locale);
  return {
    title: `${t("common.appName")} — ${t("home.heroTitle")}`,
    description: t("home.heroSubtitle"),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", am: "/am" },
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = assertLocale((await params).locale);
  const t = await getTranslator(locale);

  const features = [
    {
      title: t("home.feature1Title"),
      desc: t("home.feature1Desc"),
      icon: (
        <svg
          className="h-6 w-6 text-green-700 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: t("home.feature2Title"),
      desc: t("home.feature2Desc"),
      icon: (
        <svg
          className="h-6 w-6 text-green-700 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: t("home.feature3Title"),
      desc: t("home.feature3Desc"),
      icon: (
        <svg
          className="h-6 w-6 text-green-700 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      ),
    },
    {
      title: t("home.feature4Title"),
      desc: t("home.feature4Desc"),
      icon: (
        <svg
          className="h-6 w-6 text-green-700 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: t("home.feature5Title"),
      desc: t("home.feature5Desc"),
      icon: (
        <svg
          className="h-6 w-6 text-green-700 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: t("home.feature6Title"),
      desc: t("home.feature6Desc"),
      icon: (
        <svg
          className="h-6 w-6 text-green-700 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ];

  const industries = [
    { name: t("home.industryCafe"), icon: "☕" },
    { name: t("home.industryBakery"), icon: "🥐" },
    { name: t("home.industryRestaurant"), icon: "🍽️" },
    { name: t("home.industryPharmacy"), icon: "💊" },
    { name: t("home.industryRetail"), icon: "🛍️" },
    { name: t("home.industrySalon"), icon: "✂️" },
  ];

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pt-6 sm:pt-10">
      {/* 1. Hero Section */}
      <section aria-labelledby="hero-title" className="relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Hero Copy */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-green-700/20 bg-green-50/80 px-3.5 py-1 text-xs font-semibold text-green-900 shadow-2xs backdrop-blur-xs dark:border-green-600/30 dark:bg-green-950/60 dark:text-green-200">
              <span className="flex h-2 w-2 rounded-full bg-green-600 animate-pulse" aria-hidden="true" />
              <span>{t("home.heroBadge")}</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-title"
              className="mt-5 text-3xl font-extrabold tracking-tight text-charcoal-900 sm:text-5xl lg:text-5xl/tight dark:text-white"
            >
              {t("home.heroTitle")}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-charcoal-600 leading-relaxed dark:text-charcoal-300">
              {t("home.heroSubtitle")}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/${locale}/login`}
                className="touch-target inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-green-800 px-6 py-3.5 font-bold text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg active:scale-[0.98] dark:bg-green-700 dark:hover:bg-green-600"
              >
                <span>{t("home.heroCtaMerchant")}</span>
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href={`/${locale}/card`}
                className="touch-target inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3.5 font-semibold text-charcoal-800 transition-all hover:bg-neutral-100 active:scale-[0.98] dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <span aria-hidden="true">💳</span>
                <span>{t("home.heroCtaCard")}</span>
              </Link>

              <Link
                href={`/${locale}/staff/scanner`}
                className="touch-target inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border/80 bg-neutral-50 px-4 py-3.5 text-xs sm:text-sm font-semibold text-charcoal-700 transition-all hover:bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-300"
              >
                <span aria-hidden="true">📷</span>
                <span>{t("home.heroCtaScanner")}</span>
              </Link>
            </div>

            {/* Ethiopian Local Context Attribution */}
            <div className="mt-6 flex items-center gap-2 text-xs text-muted">
              <span aria-hidden="true">📍</span>
              <span>{t("home.heroLocationNote")}</span>
            </div>
          </div>

          {/* Hero Interactive Stamp Card Preview */}
          <div className="flex justify-center lg:col-span-5">
            <StampSimulator
              title={t("home.cardSampleTitle")}
              subtitle={t("home.cardSampleSubtitle")}
              rewardText={t("home.cardSampleReward")}
              tapHint={t("home.cardTapHint")}
              completeBadge={t("home.cardCompleteBadge")}
              stampsRemainingText={t("home.cardStampsRemaining")}
            />
          </div>
        </div>
      </section>

      {/* 2. How It Works (3 Steps) */}
      <section aria-labelledby="how-it-works-title" className="relative">
        <div className="text-center max-w-2xl mx-auto">
          <h2
            id="how-it-works-title"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal-900 dark:text-white"
          >
            {t("home.howItWorksTitle")}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted">
            {t("home.howItWorksSubtitle")}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Step 1 */}
          <div className="relative rounded-2xl border border-border bg-surface p-6 shadow-xs transition-transform hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-800 font-bold text-lg dark:bg-green-950 dark:text-green-300">
              <span aria-hidden="true">📱</span>
            </div>
            <h3 className="mt-4 font-bold text-lg text-charcoal-900 dark:text-white">
              {t("home.step1Title")}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {t("home.step1Desc")}
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative rounded-2xl border border-border bg-surface p-6 shadow-xs transition-transform hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-800 font-bold text-lg dark:bg-amber-950/60 dark:text-gold-300">
              <span aria-hidden="true">⚡</span>
            </div>
            <h3 className="mt-4 font-bold text-lg text-charcoal-900 dark:text-white">
              {t("home.step2Title")}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {t("home.step2Desc")}
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative rounded-2xl border border-border bg-surface p-6 shadow-xs transition-transform hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 font-bold text-lg dark:bg-emerald-950 dark:text-emerald-300">
              <span aria-hidden="true">🎉</span>
            </div>
            <h3 className="mt-4 font-bold text-lg text-charcoal-900 dark:text-white">
              {t("home.step3Title")}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {t("home.step3Desc")}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Key Features Grid */}
      <section aria-labelledby="features-title" className="relative">
        <div className="text-center max-w-2xl mx-auto">
          <h2
            id="features-title"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal-900 dark:text-white"
          >
            {t("home.featuresTitle")}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted">
            {t("home.featuresSubtitle")}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-surface p-6 shadow-2xs transition-all hover:border-green-600/40 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 dark:bg-green-950/60 border border-green-600/20">
                {feat.icon}
              </div>
              <h3 className="mt-4 font-bold text-base text-charcoal-900 dark:text-white">
                {feat.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Target Industries */}
      <section aria-labelledby="industries-title" className="relative rounded-3xl border border-border bg-neutral-50/70 p-6 sm:p-10 dark:bg-neutral-900/40">
        <div className="text-center max-w-xl mx-auto">
          <h2
            id="industries-title"
            className="text-xl sm:text-2xl font-bold tracking-tight text-charcoal-900 dark:text-white"
          >
            {t("home.industriesTitle")}
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border/80 bg-surface p-4 text-center shadow-2xs transition-transform hover:scale-105"
            >
              <span className="text-2xl" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-xs font-semibold text-charcoal-800 dark:text-neutral-200">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-900 via-green-800 to-emerald-950 p-8 sm:p-12 text-white shadow-xl">
        <div
          className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-gold-500/10 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t("home.heroTitle")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
            {t("home.heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/login`}
              className="touch-target inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-green-950 shadow-md transition-all hover:bg-neutral-100 active:scale-[0.98]"
            >
              <span>{t("home.heroCtaMerchant")}</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={`/${locale}/staff/scanner`}
              className="touch-target inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-xs transition-all hover:bg-white/20"
            >
              <span aria-hidden="true">📷</span>
              <span>{t("home.heroCtaScanner")}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="border-t border-border/80 pt-8 pb-4 text-xs text-muted">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="font-semibold text-charcoal-800 dark:text-neutral-200">
              {t("home.footerTagline")}
            </p>
            <p className="text-muted">{t("home.footerCity")}</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/login`}
              className="touch-target text-muted hover:text-green-800 dark:hover:text-green-400"
            >
              {t("home.heroCtaMerchant")}
            </Link>
            <span aria-hidden="true">•</span>
            <Link
              href={`/${locale}/card`}
              className="touch-target text-muted hover:text-green-800 dark:hover:text-green-400"
            >
              {t("home.heroCtaCard")}
            </Link>
            <span aria-hidden="true">•</span>
            <Link
              href={`/${locale}/operations`}
              className="touch-target text-muted hover:text-green-800 dark:hover:text-green-400"
            >
              {t("home.heroCtaOps")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
