// Telegram Mini App helpers. The card runs inside Telegram when opened from t.me/<bot>/<app>; elsewhere
// these return null/false and the web card (phone + PIN) is used instead.

// Telegram's official Mini App script; it fills window.Telegram.WebApp.
const TELEGRAM_SCRIPT = 'https://telegram.org/js/telegram-web-app.js?59';

let loading = null;

/** Loads the Telegram script once and resolves with WebApp, or null outside Telegram. */
export function loadTelegramWebApp() {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.Telegram?.WebApp) return Promise.resolve(window.Telegram.WebApp.initData ? window.Telegram.WebApp : null);
  loading ??= new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = TELEGRAM_SCRIPT;
    s.async = true;
    s.onload = () => resolve(window.Telegram?.WebApp?.initData ? window.Telegram.WebApp : null);
    s.onerror = () => resolve(null);
    document.head.appendChild(s);
  });
  return loading;
}

/** The Telegram WebApp object if this page is running inside Telegram right now. */
export function getTelegramWebApp() {
  if (typeof window === 'undefined') return null;
  const tg = window.Telegram?.WebApp;
  return tg?.initData ? tg : null;
}

export function isInTelegram() {
  return Boolean(getTelegramWebApp());
}

/**
 * Link that opens a shop's card in the Telegram Mini App, or null when the bot is not configured.
 * Set NEXT_PUBLIC_TELEGRAM_BOT_USERNAME and NEXT_PUBLIC_TELEGRAM_APP_NAME (from @BotFather /newapp).
 */
export function getTelegramCardLink(joinReference) {
  const bot = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
  const app = process.env.NEXT_PUBLIC_TELEGRAM_APP_NAME;
  if (!bot || !app || !joinReference) return null;
  return `https://t.me/${bot}/${app}?startapp=${encodeURIComponent(joinReference)}`;
}
