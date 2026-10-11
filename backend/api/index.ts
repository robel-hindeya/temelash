import type { IncomingMessage, ServerResponse } from 'http';

let server: any = null;
let isReady = false;
let initPromise: Promise<void> | null = null;
let initError: Error | null = null;

async function bootstrap() {
  if (isReady && server) return server;
  if (initError) throw initError;

  if (!initPromise) {
    initPromise = (async () => {
      try {
        require('reflect-metadata');
        const express = require('express');
        const { NestFactory } = require('@nestjs/core');
        const { ExpressAdapter } = require('@nestjs/platform-express');

        server = express();

        let AppModule: any;
        let configureApp: any;

        try {
          const mod = require('../dist/app.module');
          const setup = require('../dist/app.setup');
          AppModule = mod.AppModule;
          configureApp = setup.configureApp;
        } catch {
          const mod = require('../src/app.module');
          const setup = require('../src/app.setup');
          AppModule = mod.AppModule;
          configureApp = setup.configureApp;
        }

        const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
          bufferLogs: true,
        });
        configureApp(app);
        await app.init();
        isReady = true;
      } catch (err: unknown) {
        initError = err instanceof Error ? err : new Error(String(err));
        initPromise = null;
        throw initError;
      }
    })();
  }

  await initPromise;
  return server;
}

export default async function handler(req: any, res: any) {
  const url = req.url || '/';

  // Fast-path for root health/status: always works even before database is initialized
  if (url === '/' || url === '') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    return res.end(
      JSON.stringify(
        {
          name: 'TemelashCard Backend API',
          status: 'online',
          version: 'v1',
          runtime: 'Vercel Serverless',
          diagnostics: {
            nodeVersion: process.version,
            databaseConfigured: Boolean(process.env.DATABASE_URL),
            jwtConfigured: Boolean(process.env.JWT_ACCESS_SECRET),
            corsOrigins: process.env.CORS_ORIGINS || 'none',
          },
          endpoints: {
            live: '/api/v1/health',
            ready: '/api/v1/health/ready',
            docs: '/api/docs',
          },
        },
        null,
        2,
      ),
    );
  }

  try {
    const appServer = await bootstrap();
    return appServer(req, res);
  } catch (err: unknown) {
    const error = err as Error;
    const missing: string[] = [];
    if (!process.env.DATABASE_URL) missing.push('DATABASE_URL');
    if (!process.env.JWT_ACCESS_SECRET) missing.push('JWT_ACCESS_SECRET');

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    return res.end(
      JSON.stringify(
        {
          error: 'BACKEND_STARTUP_FAILED',
          message: error?.message || 'NestJS backend initialization failed',
          missingEnvironmentVariables: missing.length > 0 ? missing : undefined,
          hint:
            missing.length > 0
              ? `Please configure ${missing.join(', ')} in your Vercel Project Settings > Environment Variables.`
              : 'Check that your hosted PostgreSQL database is accessible and running.',
          stack: process.env.NODE_ENV !== 'production' ? error?.stack : undefined,
        },
        null,
        2,
      ),
    );
  }
}
