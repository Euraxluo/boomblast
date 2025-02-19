import {NestFactory} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";
import {Redis} from "ioredis";
import {NestExpressApplication} from "@nestjs/platform-express";
import {Request, Response} from "express";

import {AppModule} from "./modules/app";
import {clusterize} from "./lib/cluster";
import {WebSocketAdapter} from "./lib/ws";
import {REDIS_PROVIDER_TOKEN} from "./lib/redis";
import {session} from "./lib/session";

let app: NestExpressApplication;

async function bootstrap(): Promise<NestExpressApplication> {
  if (app) {
    return app;
  }
  
  app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      credentials: true,
      origin: process.env.CLIENT_ORIGIN,
    },
  });

  const redis = app.get<Redis>(REDIS_PROVIDER_TOKEN);

  app.use(session(redis));
  app.useWebSocketAdapter(new WebSocketAdapter(app, true));
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 8000;
    await app.listen(port);
    console.log(`Application is running on port ${port}`);
  }

  return app;
}

if (process.env.NODE_ENV !== 'production') {
  clusterize(bootstrap);
} else {
  bootstrap();
}

// 为 Vercel 导出 Express 实例
export default async function handler(req: Request, res: Response): Promise<void> {
  const instance = await bootstrap();
  return instance.getHttpAdapter().getInstance()(req, res);
}
