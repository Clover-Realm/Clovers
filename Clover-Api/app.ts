import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Core Express application for the C-Address Onboarding Bridge API.
 *
 * Wires up security/middleware, registers routes, and exposes a `start()`
 * method that binds the HTTP listener. Routes are intentionally minimal in
 * this basic setup — extend `routes()` as the backend grows.
 */
export class App {
  public readonly express: Express;
  private readonly port: number;

  constructor() {
    this.express = express();
    this.port = parseInt(process.env.PORT ?? '4000', 10);
    this.middleware();
    this.routes();
    this.errorHandlers();
  }

  private middleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.get('/health', (_req: Request, res: Response) => {
      res.json({
        status: 'ok',
        service: 'clover-api',
        env: process.env.NODE_ENV ?? 'development',
        timestamp: new Date().toISOString(),
      });
    });

    this.express.get('/', (_req: Request, res: Response) => {
      res.json({
        name: 'C-Address Onboarding Bridge API',
        version: '0.1.0',
        endpoints: ['/health'],
      });
    });
  }

  private errorHandlers(): void {
    this.express.use((_req: Request, res: Response) => {
      res.status(404).json({ error: 'Not Found' });
    });
  }

  public start(): void {
    this.express.listen(this.port, () => {
      console.log(`[clover-api] listening on http://localhost:${this.port}`);
    });
  }
}
