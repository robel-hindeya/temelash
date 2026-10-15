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

const FALLBACK_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCJS2O4ERIrlg3
o2BpX6L9hfOEAwHfi+2YfEX6eu03QfEHyfknac8Kdg+cpNvE6ZTKEXtlZT2IdSxV
m3aiyXv+i2SUGEEUt6B2HBaOPWzDvK3A7kjF4N8AmHN+mWHkU7y1HzL4SACM/Mr1
tDuQddiH6YLh09ZGHwlf0f7IUgmVPNv871JNShqyTfah7zbXmgDXQBvW44mr5S22
ayLYe/ysWWt6PIreW7CyiujL2USn68qg5TqhAjqQ0Vk4dVnroB5yxUUpz6T5468r
cXqSh1wE5kBnW1rMjLYEz3kb86BtnIChnGiPypPg3uShSXnBBqyr6aFBA5PTNh6I
8CuF8QbVAgMBAAECggEABxYES6qz01NJtP4pjq8G6+nvsWnKr7YTvfULONEzx0iI
25frmBysid01RKpfuxgrbhSlRFYloM1mCNnbwqVH+UptKVqZRYBOQwFTcW2cgqho
TxpjXZWPjh4CWSSQBh1oTdQNsDIwkvTHE6C4a9VhSdSkCkoJEBYh6XVorzcPUnsN
yyZWCugONI7e0e50tDWIDT8jakEZAigD7YK84tcOAZNAYwDb+viK/NgPRp6MLFap
QUVAYShwzAZzlSgwfq184J0D2XMmuElG6yOqS+kYz+9+Or9qZVEI/7nF5s2WIJVF
C6Yc0l7FNQM5cVOh5ICxxM1NpOKOABXyyzKwUPbzIQKBgQD54+sc9R9e86uQmAtf
DZQPNnGjxziz+wptIlDURdewEdiOd9X7/v/a5BTt22nvfX0irAbXb3t7P6faMbzB
CA4V4uObUgqXi9HkwmHzlWsfYl8IUf86iwVdoA/xcbsurtnNrX/UaYqEjYZa9OtH
oH5coSEv551sW0OqEmNuSZakXwKBgQDG5FjX4xKkIkPbQB8Q3lUc/xLkpd+RtCtw
XJfo8hzuWwLLN1nS9SKwafX3p+RU21wT1+sNvrWg316fLNiHB78H6Ljx7UgH7MkZ
kCszILT9KqEZ4Ic9t1C6xg6NmLkzcHvjqG3dutemd0JxNobywTgEHAGLqCWhnui6
jDlQG+WBSwKBgGdT2hUoOmeNxEROymzsdWtw7L53EzhAtsf3p4qOsqgISQ5n+OBx
SaReKVVNI9m2fvbGQTH11A5bfPGZHV6IESL1pX3FB8IwO4Mm6U/KWfgpOfh7x1iS
wY48MDt69pZQEJmegzv2xCMZThPwMBV3BKkSq2FemVaDyk/ZuKmS3iprAoGAZhHP
6lMVQPh4vG8mwkBni673ojHiD2NYG5zZNOnzoPtB7spkJZg6CjEG0ubtjgLZOTHI
5k/l5D5dz/By2rFF/ygWqcls+uwwtBbBpMZ3O6mB7cbFgQ2vt3pnA5HKEbT7T3Uj
lPQLMdnoVjN2g+RW+/znaiWL0mq74uiNjSgT2wsCgYEA8rNJfVK0aZibuwH200GW
IO+FmZp2lWs5bt+DFkfdS/2Y/KnHKOCW9Eg1jVM/u49zg4QWbk2kx0KEPFLCc8Nh
yU0ySEz4xSGG0g73l3GD3w/ySKYag69ePDLKw0ati6z/hcSGaObEmlpXgj/bTpCh
4jQiBbF3fAZNvPH8Zp6AoTA=
-----END PRIVATE KEY-----`;

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
  const rawKey = process.env.GOOGLE_WALLET_PRIVATE_KEY || FALLBACK_PRIVATE_KEY;

  if (!rawKey) {
    return null;
  }

  // Normalize private key
  let cleaned = rawKey.trim();
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
