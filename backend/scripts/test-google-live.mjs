import { readFileSync } from 'node:fs';
import { createSign } from 'node:crypto';

const envText = readFileSync('.env', 'utf8');
const lines = envText.split(/\r?\n/);
const raw = {};
let currentKey = null;
let currentValue = '';

for (const line of lines) {
  if (currentKey) {
    currentValue += '\n' + line;
    if (line.endsWith('"')) {
      raw[currentKey] = currentValue.slice(0, -1);
      currentKey = null;
    }
    continue;
  }
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx > 0) {
    const k = trimmed.slice(0, idx).trim();
    let v = trimmed.slice(idx + 1).trim();
    if (v.startsWith('"') && !v.endsWith('"')) {
      currentKey = k;
      currentValue = v.slice(1);
    } else {
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      raw[k] = v;
    }
  }
}

function normalizePrivateKey(key) {
  let cleaned = key.trim();
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  if (cleaned.includes('\\n')) {
    cleaned = cleaned.replace(/\\n/g, '\n');
  }
  return cleaned.trim();
}

const b64url = (v) => Buffer.from(v).toString('base64url');

function signJwtRs256(claims, privateKeyPem) {
  const input = `${b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64url(JSON.stringify(claims))}`;
  const signature = createSign('RSA-SHA256').update(input).sign(privateKeyPem);
  return `${input}.${b64url(signature)}`;
}

async function test() {
  const clientEmail = raw.GOOGLE_WALLET_CLIENT_EMAIL || raw.GOOGLE_WALLET_SERVICE_ACCOUNT_KEY_PATH;
  const issuerId = raw.GOOGLE_WALLET_ISSUER_ID;
  const rawKey = raw.GOOGLE_WALLET_PRIVATE_KEY;

  console.log('Testing Google Wallet credentials:');
  console.log('- clientEmail:', clientEmail);
  console.log('- issuerId:', issuerId);

  const key = normalizePrivateKey(rawKey);
  console.log('- Key normalized. Starts with:', key.slice(0, 30));

  const now = Math.floor(Date.now() / 1000);
  const assertion = signJwtRs256(
    {
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/wallet_object.issuer',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    },
    key,
  );

  console.log('- Assertion signed successfully!');
  console.log('Requesting OAuth access token from Google...');

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }).toString(),
  });

  const tokenText = await tokenRes.text();
  console.log('Token response status:', tokenRes.status);
  console.log('Token response body:', tokenText);

  if (tokenRes.status === 200) {
    const { access_token } = JSON.parse(tokenText);
    console.log('\nTesting Google Wallet API access with issuerId:', issuerId);
    // Try to get or check permissions for issuer
    const testClassRes = await fetch(
      `https://walletobjects.googleapis.com/walletobjects/v1/loyaltyClass/${issuerId}.test_class`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
    );
    console.log('Loyalty class check status:', testClassRes.status);
    const testClassText = await testClassRes.text();
    console.log('Loyalty class response body:', testClassText);
  }
}

test().catch(console.error);
