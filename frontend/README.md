# Temelash Card — frontend

Next.js (App Router) frontend for Temelash Card: the home page, the business dashboard, the customer flow and the Temelash admin back office. Frontend only: there is no backend yet, so every number is sample data and changes are kept in the browser (localStorage) or in memory.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000/screens for a list of every screen.

`npm run build` then `npm start` runs the production build. Needs Node.js 20.9 or newer.

## Routes

| Area | Route |
| --- | --- |
| Home page | `/` |
| Setup wizard | `/business/setup` |
| Dashboard overview | `/business` |
| Card design | `/business/card-design` |
| Stamps & rewards | `/business/rewards` |
| Customers | `/business/customers` |
| Offers & reminders | `/business/offers` |
| Analytics | `/business/analytics` |
| Shop | `/business/shop` |
| QR landing page | `/business/landing-page` |
| Staff & settings | `/business/settings` |
| Staff app | `/staff` |
| Customer flow (scan to reward) | `/join` |
| Web card | `/card` |
| Admin overview | `/admin` |
| Admin businesses | `/admin/businesses` |
| Admin applications | `/admin/applications` |
| Admin billing | `/admin/billing` |
| Admin shop orders | `/admin/orders` |
| Admin support inbox | `/admin/support` |
| Admin analytics | `/admin/analytics` |
| Admin announcements | `/admin/announcements` |
| Admin settings | `/admin/settings` |

## How the code is laid out

```
app/                      one folder per route; each page.jsx renders <Screen name="..." />
components/Screen.jsx     loads screens in the browser only (they use localStorage and window size)
components/screens/       one file per screen, plus the shared Sidebar, AdminSidebar and ColorPicker
lib/DCLogic.js            base class for the screens
lib/dc-runtime.jsx        small helpers: truthiness, text output, links, per-screen CSS
```

Each screen file has three parts:

1. `__CSS`: the screen's own CSS (hover states, mobile breakpoints). It is added to the page while the screen is shown.
2. A class with `state` and `renderVals()`. `renderVals()` returns everything the screen shows plus the click and input handlers. This is where to change data and behaviour.
3. `__template`: the JSX markup, reading values from `__v`.

Design tokens: navy `#101827`, red `#e42330` (one red primary per screen), amber `#fba919` (rewards only, navy text on it), blue `#4661ad` (links, secondary). Fonts: Source Sans 3 and Noto Sans Ethiopic from Google Fonts.

## Shared state between screens (browser only)

| Key | Written by | Read by |
| --- | --- | --- |
| `tm-card` | Card design | Customer flow (sign-up form) |
| `tm-rewards` | Stamps & rewards | Customer flow |
| `tm-owner-name` | Staff & settings (My profile) | Sidebar |
| `tm-plan` | Staff & settings (Billing) | Sidebar |

Clear site data in the browser to reset.

## Placeholders to fill in

`[ETB PRICE]`, `[ETB TOTAL]`, `[MRR]`, `[Admin name]`, `[admin email]`, `[Owner name]`, `[Partner café]`, `[Confirm payment options]`, and the payment account numbers.

## Not built yet

Real sign-in, a database and API, Apple / Google Wallet pass generation, Telebirr and bank payments, email and SMS sending, and a real map (the location picker is a drawn map; Google Maps needs an API key).
