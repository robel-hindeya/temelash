import "server-only";
import { assertNoPublicSecrets, parseServerEnv, type ServerEnv } from "./env";

let cached: ServerEnv | undefined;

/** Validated server-only configuration. Throws once, at first use, with a readable list of problems. */
export function getServerEnv(): ServerEnv {
  if (!cached) {
    assertNoPublicSecrets(process.env);
    const envObj: Record<string, unknown> = { ...process.env };
    if (process.env.VERCEL) {
      if (!envObj.TC_SESSION_SECRET) {
        envObj.TC_SESSION_SECRET = "temelashcard-fallback-production-session-secret-min-32chars";
      }
      if (!envObj.TC_API_MODE) {
        envObj.TC_API_MODE = "mock";
      }
      if (!envObj.TC_API_BASE_URL) {
        envObj.TC_API_BASE_URL = "https://backend-six-wine.vercel.app/api/v1";
      }
    }
    cached = parseServerEnv(envObj);
  }
  return cached;
}
