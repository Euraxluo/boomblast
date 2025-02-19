import {OnGatewayInit, WebSocketGateway} from "@nestjs/websockets";
import {Request, Response} from "express";
import {Server} from "socket.io";
import {Redis} from "ioredis";

import {InjectRedis} from "../../lib/redis";
import {session} from "../../lib/session";

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
  }
})
export class AppGateway implements OnGatewayInit {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  afterInit(server: Server): void {
    server.use(async (socket, next) => {
      try {
        const middleware = session(this.redis);
        await new Promise<void>((resolve, reject) => {
          middleware(socket.request as Request, {} as Response, (err?: any) => {
            if (err) reject(err);
            else resolve();
          });
        });
        next();
      } catch (error) {
        next(error instanceof Error ? error : new Error(String(error)));
      }
    });
  }
}
