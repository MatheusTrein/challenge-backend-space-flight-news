import { RedisOptions } from "ioredis";

const redisConfig = {
  port: Number(process.env.REDIS_PORT),
  host: "redis_space-flight-news_cache",
  password: process.env.REDIS_PASSWORD,
} as RedisOptions;

export { redisConfig };
