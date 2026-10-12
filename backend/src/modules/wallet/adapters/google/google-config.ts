import { createPrivateKey } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

export interface GoogleConfig {
  /** demo: classes stay in DRAFT and only Console test users can add passes. production: submitted for review. */
  environment: 'demo' | 'production';
  issuerId: string;
  /** Service-account identity used to sign save links and to authenticate REST calls. */
  clientEmail: string;
  privateKey: string;
  origins: string[];
  defaultLogoUrl: string;
  apiBase: string;
  tokenUrl: string;
}

export interface GoogleConfigInput {
  environment: 'demo' | 'production';
  issuerId: string;
  keyPath?: string;
  privateKey?: string;
  clientEmail?: string;
  origins: string[];
  defaultLogoUrl: string;
  apiBase: string;
  tokenUrl: string;
}

export class GoogleConfigError extends Error {}

/**
 * Normalizes multiline private keys. Handles literal '\n' escape sequences,
 * surrounding quotes from environment variables, and actual newlines.
 */
export function normalizePrivateKey(key: string): string {
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

/**
 * Loads the service-account key at startup (only when Google is enabled). Errors name the setting and
 * never include any part of the key or file path.
 */
export function loadGoogleConfig(input: GoogleConfigInput): GoogleConfig {
  if (!input.issuerId || !/^[0-9]+$/.test(input.issuerId)) {
    throw new GoogleConfigError(
      'GOOGLE_WALLET_ISSUER_ID must be the numeric issuer id from the Google Pay & Wallet Console',
    );
  }
  if (!input.defaultLogoUrl || !input.defaultLogoUrl.startsWith('https://')) {
    throw new GoogleConfigError('GOOGLE_WALLET_DEFAULT_LOGO_URL must be an https URL');
  }

  let clientEmail: string | undefined = input.clientEmail;
  let rawPrivateKey: string | undefined = input.privateKey;

  if (input.keyPath) {
    if (input.keyPath.includes('@')) {
      if (!clientEmail) {
        clientEmail = input.keyPath.trim();
      }
    } else {
      if (!existsSync(input.keyPath)) {
        throw new GoogleConfigError('GOOGLE_WALLET_SERVICE_ACCOUNT_KEY_PATH: file not found');
      }
      let parsed: { client_email?: unknown; private_key?: unknown };
      try {
        parsed = JSON.parse(readFileSync(input.keyPath, 'utf8')) as typeof parsed;
      } catch {
        throw new GoogleConfigError(
          'GOOGLE_WALLET_SERVICE_ACCOUNT_KEY_PATH: not a valid service-account JSON file',
        );
      }
      if (typeof parsed.client_email !== 'string') {
        throw new GoogleConfigError(
          'GOOGLE_WALLET_SERVICE_ACCOUNT_KEY_PATH: missing client_email or private_key',
        );
      }
      clientEmail = parsed.client_email;
      if (typeof parsed.private_key === 'string') {
        rawPrivateKey = input.privateKey ? input.privateKey : parsed.private_key;
      } else if (!rawPrivateKey) {
        throw new GoogleConfigError(
          'GOOGLE_WALLET_SERVICE_ACCOUNT_KEY_PATH: missing client_email or private_key',
        );
      }
    }
  }

  if (!rawPrivateKey) {
    throw new GoogleConfigError(
      'Google Wallet credentials missing: configure GOOGLE_WALLET_SERVICE_ACCOUNT_KEY_PATH or GOOGLE_WALLET_PRIVATE_KEY',
    );
  }
  if (!clientEmail) {
    throw new GoogleConfigError(
      'Google Wallet credentials missing: client_email is required when configuring GOOGLE_WALLET_PRIVATE_KEY without key file',
    );
  }

  const normalizedKey = normalizePrivateKey(rawPrivateKey);
  try {
    createPrivateKey(normalizedKey);
  } catch {
    throw new GoogleConfigError(
      input.keyPath && !input.privateKey
        ? 'GOOGLE_WALLET_SERVICE_ACCOUNT_KEY_PATH: private_key is not a valid key'
        : 'GOOGLE_WALLET_PRIVATE_KEY: private_key is not a valid key',
    );
  }

  return {
    environment: input.environment,
    issuerId: input.issuerId,
    clientEmail,
    privateKey: normalizedKey,
    origins: input.origins,
    defaultLogoUrl: input.defaultLogoUrl,
    apiBase: input.apiBase.replace(/\/$/, ''),
    tokenUrl: input.tokenUrl,
  };
}
