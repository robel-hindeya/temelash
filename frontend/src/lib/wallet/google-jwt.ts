import { createSign } from 'node:crypto';

const b64url = (v: string | Buffer) => Buffer.from(v).toString('base64url');

function signJwtRs256(
  claims: Record<string, unknown>,
  privateKeyPem: string,
): string {
  const input = `${b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64url(JSON.stringify(claims))}`;
  const signature = createSign('RSA-SHA256').update(input).sign(privateKeyPem);
  return `${input}.${b64url(signature)}`;
}

export function generateGoogleWalletSaveUrl(params: {
  cardToken: string;
  firstName?: string | null;
  stamps?: number;
  stampsRequired?: number;
}): string | null {
  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID || '3388000000023214766';
  const clientEmail =
    process.env.GOOGLE_WALLET_CLIENT_EMAIL ||
    'cardtemelash-wallet@card-temelash.iam.gserviceaccount.com';
  let privateKey = process.env.GOOGLE_WALLET_PRIVATE_KEY;

  if (!privateKey) {
    return null;
  }

  // Normalize private key from env
  let cleaned = privateKey.trim();
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  if (cleaned.includes('\\n')) {
    cleaned = cleaned.replace(/\\n/g, '\n');
  }

  const tokenSafe = params.cardToken.replace(/[^a-zA-Z0-9_]/g, '_');
  const classId = `${issuerId}.program_sample_cafe`;
  const objectId = `${issuerId}.pass_${tokenSafe}`;

  const currentStamps = params.stamps ?? 0;
  const stampsRequired = params.stampsRequired ?? 8;

  const loyaltyClass = {
    id: classId,
    issuerName: 'Sample Cafe',
    localizedIssuerName: {
      defaultValue: { language: 'en', value: 'Sample Cafe' },
      translatedValues: [{ language: 'am', value: 'ናሙና ቡና ቤት' }],
    },
    programName: 'Loyalty Rewards',
    localizedProgramName: {
      defaultValue: { language: 'en', value: 'Loyalty Rewards' },
    },
    programLogo: {
      sourceUri: { uri: 'https://walletobjects.googleapis.com/static/img/wallet_logo.png' },
      contentDescription: { defaultValue: { language: 'en', value: 'Sample Cafe' } },
    },
    hexBackgroundColor: '#10b981',
    reviewStatus: 'UNDER_REVIEW',
    multipleDevicesAndHoldersAllowedStatus: 'ONE_USER_ALL_DEVICES',
  };

  const loyaltyObject = {
    id: objectId,
    classId: classId,
    accountId: tokenSafe,
    accountName: params.firstName || 'Valued Customer',
    state: 'ACTIVE',
    loyaltyPoints: {
      label: 'Stamps',
      localizedLabel: {
        defaultValue: { language: 'en', value: 'Stamps' },
        translatedValues: [{ language: 'am', value: 'ስታምፕ' }],
      },
      balance: { string: `${currentStamps} / ${stampsRequired}` },
    },
    textModulesData: [
      {
        id: 'ready',
        header: 'Rewards ready',
        body: '0',
        localizedHeader: {
          defaultValue: { language: 'en', value: 'Rewards ready' },
          translatedValues: [{ language: 'am', value: 'ዝግጁ ሽልማቶች' }],
        },
      },
    ],
    barcode: {
      type: 'QR_CODE',
      value: params.cardToken,
    },
  };

  const now = Math.floor(Date.now() / 1000);
  const jwt = signJwtRs256(
    {
      iss: clientEmail,
      aud: 'google',
      typ: 'savetowallet',
      iat: now,
      payload: {
        loyaltyClasses: [loyaltyClass],
        loyaltyObjects: [loyaltyObject],
      },
    },
    cleaned,
  );

  return `https://pay.google.com/gp/v/save/${jwt}`;
}
