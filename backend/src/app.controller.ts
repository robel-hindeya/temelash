import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { Public } from './common/decorators/access.decorators';
import { SkipThrottle } from '@nestjs/throttler';

@Public()
@SkipThrottle()
@Controller()
export class AppController {
  @Version(VERSION_NEUTRAL)
  @Get()
  root() {
    return {
      name: 'TemelashCard Backend API',
      status: 'online',
      version: 'v1',
      runtime: process.env.VERCEL ? 'Vercel Serverless' : 'Node.js',
      diagnostics: {
        databaseConfigured: Boolean(process.env.DATABASE_URL),
        jwtConfigured: Boolean(process.env.JWT_ACCESS_SECRET),
      },
      endpoints: {
        live: '/api/v1/health',
        ready: '/api/v1/health/ready',
        docs: '/api/docs',
      },
    };
  }
}
