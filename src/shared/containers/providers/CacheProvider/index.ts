import { container } from "tsyringe";
import { RedisCacheProvider } from "./implementations/RedisCacheProvider";
import { ICacheProvider } from "./models/ICacheProvider";
import { cacheConfig } from "../../../../config/cache";

interface ICacheProviders {
  [key: string]: any;
}

const cacheProviders = {
  redis: RedisCacheProvider,
} as ICacheProviders;

container.registerSingleton<ICacheProvider>(
  "CacheProvider",
  cacheProviders[cacheConfig.driver]
);
