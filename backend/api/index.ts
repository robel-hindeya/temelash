import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/app.setup';

const server = express();
let isReady = false;
let initPromise: Promise<void> | null = null;
let initError: Error | null = null;

server.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'TemelashCard Backend API',
    status: 'ok',
    version: 'v1',
    endpoints: {
      health: '/api/v1/health',
      ready: '/api/v1/health/ready',
      docs: '/api/docs',
    },
    documentation: 'https://github.com/robel-hindeya/temelash',
  });
});

async function bootstrap() {
  if (isReady) return;
  if (initError) throw initError;

  if (!initPromise) {
    initPromise = (async () => {
      try {
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
}

export default async function handler(req: Request, res: Response) {
  try {
    await bootstrap();
    server(req, res);
  } catch (err: unknown) {
    const error = err as Error;
    const missing: string[] = [];
    if (!process.env.DATABASE_URL) missing.push('DATABASE_URL');
    if (!process.env.JWT_ACCESS_SECRET) missing.push('JWT_ACCESS_SECRET');

    res.status(500).json({
      error: 'BACKEND_STARTUP_FAILED',
      message: error?.message || 'NestJS backend initialization failed',
      missingEnvironmentVariables: missing.length > 0 ? missing : undefined,
      hint:
        missing.length > 0
          ? `Please configure ${missing.join(', ')} in your Vercel Project Settings > Environment Variables.`
          : 'Check your database connection string and Vercel environment variables.',
    });
  }
}
