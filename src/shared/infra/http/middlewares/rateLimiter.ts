import Redis from "ioredis";
import { redisConfig } from "../../../../config/redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";
import { AppError } from "@shared/errors/AppError";

const getLimiter = () => {
  const redisClient = new Redis(redisConfig);

  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "middleware",
    points: 50,
    duration: 5,
    blockDuration: 60 * 60 * 24, //24hrs
  });

  return limiter;
};

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const limiter = getLimiter();
    await limiter.consume(request.ip);

    next();
  } catch (error) {
    throw new AppError({ message: "Too many requests", statusCode: 429 });
  }
}
