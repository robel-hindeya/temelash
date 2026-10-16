"use client";

import { useState } from "react";

interface StampSimulatorProps {
  title: string;
  subtitle: string;
  rewardText: string;
  tapHint: string;
  completeBadge: string;
  stampsRemainingText: string;
}

export function StampSimulator({
  title,
  subtitle,
  rewardText,
  tapHint,
  completeBadge,
  stampsRemainingText,
}: StampSimulatorProps) {
  const [stamps, setStamps] = useState(5);
  const total = 8;
  const isComplete = stamps >= total;
  const remaining = Math.max(0, total - stamps);
  const remainingLabel = isComplete
    ? completeBadge
    : stampsRemainingText.replace("{count}", String(remaining));

  const handleStamp = () => {
    setStamps((current) => (current >= total ? 1 : current + 1));
  };

  return (
    <div className="relative mx-auto w-full max-w-sm select-none">
      {/* Decorative phone / card shadow and subtle glow */}
      <div
        className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-green-600/20 via-emerald-500/20 to-gold-500/20 blur-xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-2xl transition-all duration-300">
        {/* Card Header with Cafe Branding */}
        <div className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 px-5 pt-5 pb-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 font-bold text-lg text-gold-400 backdrop-blur-xs border border-white/15 shadow-inner"
                aria-hidden="true"
              >
                ☕
              </div>
              <div>
                <h3 className="font-bold text-base leading-snug tracking-tight text-white">{title}</h3>
                <p className="text-xs text-white/70">{subtitle}</p>
              </div>
            </div>

            <span
              className={
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors " +
                (isComplete
                  ? "bg-gold-500 text-charcoal-900 shadow-xs animate-bounce"
                  : "bg-white/15 text-white/90 backdrop-blur-xs")
              }
            >
              {isComplete ? completeBadge : `${stamps}/${total}`}
            </span>
          </div>

          {/* Reward Goal Pill */}
          <div className="mt-3.5 flex items-center gap-2 rounded-lg bg-black/20 px-3 py-1.5 text-xs text-gold-300 border border-gold-500/20">
            <span aria-hidden="true">🎁</span>
            <span className="font-medium truncate">{rewardText}</span>
          </div>
        </div>

        {/* Card Body with Stamp Grid */}
        <div className="p-5">
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: total }, (_, i) => {
              const index = i + 1;
              const stamped = index <= stamps;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={handleStamp}
                  aria-label={`${index}`}
                  className={
                    "group relative aspect-square rounded-xl border flex flex-col items-center justify-center transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-green-600 " +
                    (stamped
                      ? "border-green-600/30 bg-green-50 text-green-700 shadow-xs scale-100 dark:bg-green-950/40 dark:border-green-500/40 dark:text-green-300"
                      : "border-dashed border-border bg-neutral-50/50 text-neutral-400 hover:border-border-focus hover:bg-neutral-100/50 dark:bg-neutral-900/30")
                  }
                >
                  {stamped ? (
                    <div className="flex flex-col items-center">
                      <span className="text-xl transition-transform group-hover:scale-110" aria-hidden="true">
                        ☕
                      </span>
                      <span className="text-[10px] font-bold text-green-700 dark:text-green-300">
                        {index}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm font-semibold text-neutral-400 group-hover:text-neutral-600 dark:text-neutral-500">
                      {index}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted mb-1.5 font-medium">
              <span>{remainingLabel}</span>
              <span>{Math.round((stamps / total) * 100)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
              <div
                className="h-full bg-gradient-to-r from-green-600 to-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${(stamps / total) * 100}%` }}
              />
            </div>
          </div>

          {/* Interactive Tap Hint Button */}
          <div className="mt-4 pt-3 border-t border-border/60">
            <button
              type="button"
              onClick={handleStamp}
              className="touch-target w-full rounded-xl bg-green-50 px-3 py-2 text-xs font-semibold text-green-800 transition-all hover:bg-green-100 active:scale-[0.98] dark:bg-green-950/50 dark:text-green-200 dark:hover:bg-green-900/60 flex items-center justify-center gap-2"
            >
              <span aria-hidden="true">✨</span>
              <span>{tapHint}</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
