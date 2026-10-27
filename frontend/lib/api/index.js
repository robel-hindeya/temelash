// Public surface of the frontend API layer: import from '@/lib/api'. Each topic lives in its own file:
//   browser.js              storage + app origin
//   http.js                 request / publicRequest (the /api/v1 proxy)
//   staff-session.js        merchant/staff/admin tokens, roles, demo accounts (dev only)
//   endpoints/*.js          backend calls by area; client.js assembles them into `api`
//   merchant-code.js        merchant join reference and the customer QR link
//   merchant-card-local.js  legacy browser-only card settings
//   customer-session.js     customer card session, join, phone + PIN sign-in
export * from './browser';
export * from './staff-session';
export * from './merchant-code';
export * from './merchant-card-local';
export * from './customer-session';
export { api } from './client';
export { default } from './client';
