import "server-only";
import { getServerEnv } from "@/lib/config/server-env";
import { createHttpTransport, type RequestSpec, type Transport, type TransportResponse } from "./http";
import { createApi, type Api } from "./index";
import { consoleApiLogger } from "./safe-log";

export interface ServerApiOptions {
  /**
   * The signed-in user's backend access token, read from the sealed session cookie by the auth layer.
   * Omit for public calls (join pages). It never leaves the server.
   */
  accessToken?: string;
}

/**
 * Transport for Server Components, Route Handlers and Server Actions.
 *  - `TC_API_MODE=live`: HTTP straight to the backend (no cookies are sent or accepted: credentials are explicit).
 *  - `TC_API_MODE=mock`: the in-process fake backend. It is imported dynamically so it stays out of every
 *    bundle that does not need it, and production configuration rejects mock mode altogether.
 */
export async function createServerTransport(options: ServerApiOptions = {}): Promise<Transport> {
  const env = getServerEnv();
  const getAccessToken = () => options.accessToken;

  const allowMock = env.TC_ALLOW_MOCK_IN_PROD === "true" || Boolean(process.env.VERCEL);
  if ((process.env.NODE_ENV !== "production" || allowMock) && env.TC_API_MODE === "mock") {
    const { createMockTransport } = await import("@/mocks/mock-transport");
    const { sharedMockState } = await import("@/mocks/shared-state");
    return createMockTransport({
      state: sharedMockState(),
      getAccessToken,
      latencyMs: env.NODE_ENV === "development" ? 150 : 0,
    });
  }

  const http = createHttpTransport({
    baseUrl: env.TC_API_BASE_URL,
    timeoutMs: env.TC_API_TIMEOUT_MS,
    getAccessToken,
    credentials: "omit",
    logger: consoleApiLogger,
  });

  if (allowMock) {
    return {
      async request<T>(spec: RequestSpec): Promise<T> {
        try {
          return await http.request<T>(spec);
        } catch {
          const { createMockTransport } = await import("@/mocks/mock-transport");
          const { sharedMockState } = await import("@/mocks/shared-state");
          const mock = createMockTransport({
            state: sharedMockState(),
            getAccessToken,
            latencyMs: 0,
          });
          return mock.request<T>(spec);
        }
      },
      async requestWithMeta<T>(spec: RequestSpec): Promise<TransportResponse<T>> {
        try {
          return await http.requestWithMeta<T>(spec);
        } catch {
          const { createMockTransport } = await import("@/mocks/mock-transport");
          const { sharedMockState } = await import("@/mocks/shared-state");
          const mock = createMockTransport({
            state: sharedMockState(),
            getAccessToken,
            latencyMs: 0,
          });
          return mock.requestWithMeta<T>(spec);
        }
      },
    };
  }

  return http;
}

export async function getServerApi(options: ServerApiOptions = {}): Promise<Api> {
  return createApi(await createServerTransport(options));
}
