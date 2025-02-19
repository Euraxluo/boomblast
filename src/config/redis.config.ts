import {registerAs} from "@nestjs/config";

export const redisConfig = registerAs("redis", () => {
  const env = process.env;

  return {
    host: env.REDIS_HOST,
    port: parseInt(env.REDIS_PORT, 10),
    password: env.REDIS_PASSWORD,
    username: "default",
    tls: true,
    retryStrategy: (times: number): number | null => {
      // 最多重试 5 次
      if (times > 5) return null;
      // 重试间隔时间，单位毫秒
      return Math.min(times * 1000, 3000);
    }
  };
});
