import type { IncomingMessage, ServerResponse } from 'http';

let server: any = null;
let isReady = false;
let bootstrapPromise: Promise<any> | null = null;

async function bootstrap() {
  if (isReady && server) return server;

  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      require('reflect-metadata');
      const express = require('express');
      const { NestFactory } = require('@nestjs/core');
      const { ExpressAdapter } = require('@nestjs/platform-express');

      const appInstance = express();

      let AppModule: any;
      let configureApp: any;

      try {
        const mod = require('../dist/app.module');
        const setup = require('../dist/app.setup');
        AppModule = mod.AppModule;
        configureApp = setup.configureApp;
      } catch (distErr) {
        console.warn('Falling back to src modules:', distErr);
        const mod = require('../src/app.module');
        const setup = require('../src/app.setup');
        AppModule = mod.AppModule;
        configureApp = setup.configureApp;
      }

      const app = await NestFactory.create(AppModule, new ExpressAdapter(appInstance), {
        bufferLogs: true,
      });
      configureApp(app);
      await app.init();

      server = appInstance;
      isReady = true;
      return server;
    })().catch((err: unknown) => {
      bootstrapPromise = null;
      throw err instanceof Error ? err : new Error(String(err));
    });
  }

  return bootstrapPromise;
}

export default async function handler(req: any, res: any) {
  // Always attach CORS headers for serverless callers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-request-id');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  const rawUrl = req.url || '/';
  const matchedPath =
    (req.headers['x-matched-path'] as string) ||
    (req.headers['x-forwarded-uri'] as string) ||
    '';

  const effectivePath = matchedPath || rawUrl;

  const isRoot =
    effectivePath === '/' ||
    effectivePath === '' ||
    effectivePath === '/api' ||
    effectivePath === '/api/';

  // Instant response for root status check
  if (isRoot) {
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
            corsOrigins: process.env.CORS_ORIGINS || 'all (*)',
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

  // Restore matched path for NestJS route matching
  if (matchedPath && !matchedPath.endsWith('index.ts') && !matchedPath.endsWith('/api')) {
    req.url = matchedPath;
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
