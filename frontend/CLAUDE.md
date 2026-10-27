# Frontend map

@AGENTS.md

Next.js 16 App Router, plain JavaScript. Route files in `app/` are thin: most render
`<Screen name="X" />` (`components/Screen.jsx`), which loads `components/screens/<area>/X.jsx`.

## Where things are

| Route | Screen (logic) | Notes |
| --- | --- | --- |
| `/p/<joinRef>` (every merchant QR) | `screens/customer/PublicLandingPage.jsx` | join / phone + PIN sign-in; `/join/<ref>`, `/landing/<ref>` redirect here |
| `/card` | `screens/customer/WebCard.jsx` | customer card, install-to-home-screen sheet |
| `/join` | `screens/customer/CustomerFlow.jsx` | old design demo flow |
| `/staff`, `/staff/join/<token>` | `screens/staff/StaffApp.jsx`, `screens/staff/StaffJoinFlow.jsx` | scanner; invite acceptance |
| `/business/*` | `screens/merchant/<Name>.jsx` | `Sidebar.jsx` and `ColorPicker.jsx` are shared here |
| `/admin/*` | `screens/admin/Admin<Name>.jsx` | `AdminSidebar.jsx` shared; most screens are static mock-ups |
| `/` | `screens/marketing/Main.jsx` | home page |
| `/login` | `components/AuthModal.jsx` | sign-in and merchant sign-up |
| `app/manifest.js` | — | web-app manifest (home-screen install) |

Route guards: `app/{admin,business,staff}/layout.jsx` → `components/AuthGuard.jsx`.

## Screen files come in pairs

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
| `staff-session.js` | merchant/staff/admin tokens and roles, dev-only demo accounts |
| `merchant-code.js` | merchant join reference, `getMerchantJoinUrl()` for every customer QR |
| `merchant-card-local.js` | legacy browser-only card settings (customers never see them) |
| `http.js`, `browser.js` | fetch wrappers, storage, app origin |

## Checks

`TC_API_BASE_URL=https://api.example.test/api/v1 npx next build`, then `node scripts/check-bundle.mjs`.
There is no working test suite: `tests/` targets an older frontend.
