# Frontend map

@AGENTS.md

Next.js 16 App Router, plain JavaScript. Route files in `app/` are thin: most render
`<Screen name="X" />` (`components/Screen.jsx`), which loads `components/screens/<area>/X.jsx`.

## Where things are

| Route | Screen (logic) | Notes |
| --- | --- | --- |
| `/p/<joinRef>` (every merchant QR) | `screens/customer/PublicLandingPage.jsx` | join / phone + PIN sign-in; `/join/<ref>`, `/landing/<ref>` redirect here |
| `/card` | `screens/customer/WebCard.jsx` | customer card, install-to-home-screen sheet |
| `/tg` (Telegram Mini App URL) | `screens/customer/TelegramEntry.jsx` | Telegram sign-in, share phone, join; `startapp=staff` opens `/staff` |
| `/join` | `app/join/page.jsx` | "scan the shop's QR" (no shop reference) |
| `/staff`, `/staff/join/<token>` | `screens/staff/StaffApp.jsx`, `screens/staff/StaffJoinFlow.jsx` | scanner; invite acceptance (staff and approved owners) |
| `/business/*` | `screens/merchant/<Name>.jsx` | `Sidebar.jsx`, `MerchantPage.jsx` (layout + `NotAvailableYet`) and `ColorPicker.jsx` are shared |
| `/business/offers` | `screens/merchant/Offers.jsx` | real Telegram promotions (`getPromotions`, `sendPromotion`); segments, scheduling and email are disabled |
| `/business/landing-page` | `screens/merchant/Landing.jsx` | designer saved in this browser only (not published) |
| `/admin/*` | `screens/admin/Admin<Name>.jsx` | `AdminSidebar.jsx`, `AdminPage.jsx` (layout + `NotAvailableYet`); billing, orders, support, announcements and settings are "not available yet" |
| `/` | `screens/marketing/Main.jsx` | home page |
| `/login` | `components/AuthModal.jsx` | sign-in; "Register your business" sends an application (`api.public.applyAsMerchant`) that an admin approves in `/admin/applications` |

All data on these screens comes from the backend. A feature the backend lacks gets a `NotAvailableYet` box,
never sample data or a browser-only save that claims to be live.
| `app/manifest.js` | — | web-app manifest (home-screen install) |

Route guards: `app/{admin,business,staff}/layout.jsx` → `components/AuthGuard.jsx`.

## Screen files

Plain React (one file, edit directly): merchant `Overview`, `Customers`, `Rewards`, `Settings`, `Setup`, `QRStand`
and admin `AdminApplications`, `AdminAnalytics`, `AdminBusinesses` plus the "not available yet" admin pages.
New screens are written this way, on `MerchantPage` / `AdminPage`.

The other screens come in pairs:

- `X.jsx`: state, data loading and handlers. `renderVals()` returns the values (`__v`) the markup uses.
  Change behaviour here.
- `X.view.jsx`: markup only (`render<X>(__v)`). Change text, layout or styling here: `Grep` the visible
  text or the `__v?.key`, then `Read` around the match. Never read a whole view file.
- A new value for the markup = add a key in `renderVals()`, then use `__v?.key` in the view.

## API layer: `lib/api/` (import everything from `@/lib/api`)

| File | What |
| --- | --- |
| `endpoints/{auth,merchant,scanner,public,platform}.js` | backend calls; `client.js` builds `api.*` |
| `customer-session.js` | customer card session, `registerCustomer`, `signInCustomer`, `checkCardPin` |
| `telegram.js` | Telegram detection, script loading, `getTelegramCardLink` (needs `NEXT_PUBLIC_TELEGRAM_*`) |
| `staff-session.js` | merchant/staff/admin tokens and roles, dev-only demo accounts |
| `merchant-code.js` | merchant join reference, `getMerchantJoinUrl()` for every customer QR |
| `http.js`, `browser.js` | fetch wrappers, storage, app origin |

## Checks

`TC_API_BASE_URL=https://api.example.test/api/v1 npx next build`, then `node scripts/check-bundle.mjs`.
There is no working test suite: `tests/` targets an older frontend.
