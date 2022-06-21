import { redisConfig } from "./redis";

const cacheConfig = {
  driver: process.env.CACHE_DRIVER || "redis",

  config: {
    redis: redisConfig,
  },
};

export { cacheConfig };
