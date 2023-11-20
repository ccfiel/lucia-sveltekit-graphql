import { PrismaClient } from '@prisma/client';
import IORedis from 'ioredis';

export const db = new PrismaClient();

const host = process.env.REDIS_HOST ?? 'localhost';

let config = {};
if (host === 'localhost' || host === '127.0.0.1') {
  config = {
    host: host,
    port: Number(process.env.REDIS_PORT ?? 6379),
    password: process.env.REDIS_PASSWORD ?? undefined,
    username: process.env.REDIS_USERNAME ?? undefined,
  };
} else {
  config = {
    host: host,
    port: Number(process.env.REDIS_PORT ?? 6379),
    password: process.env.REDIS_PASSWORD ?? undefined,
    username: process.env.REDIS_USERNAME ?? undefined,
    tls: {},
  };
}

export const redis = new IORedis(config);

export async function checkDbAvailable(): Promise<boolean> {
  try {
    await db.$connect();
    await redis.ping();
    return true;
  } catch (error) {
    return false;
  }
}
