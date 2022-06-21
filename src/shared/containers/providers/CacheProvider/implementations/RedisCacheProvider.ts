import { ICacheProvider } from "../models/ICacheProvider";
import { cacheConfig } from "../../../../../config/cache";
import Redis, { Redis as RedisType } from "ioredis";

class RedisCacheProvider implements ICacheProvider {
  private redisCacheProvider: RedisType;

  constructor() {
    this.redisCacheProvider = new Redis(cacheConfig.config.redis);
  }

  async save(key: string, value: any): Promise<void> {
    await this.redisCacheProvider.set(key, JSON.stringify(value));
  }
  async recover<T>(key: string): Promise<T | null> {
    let parsedValue: T | null = null;

    const value = await this.redisCacheProvider.get(key);

    if (value) {
      parsedValue = JSON.parse(value);
    }

    return parsedValue;
  }
  async invalidate(key: string): Promise<void> {
    await this.redisCacheProvider.del(key);
  }
  async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.redisCacheProvider.keys(`${prefix}:*`);

    const pipeline = this.redisCacheProvider.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}

export { RedisCacheProvider };
