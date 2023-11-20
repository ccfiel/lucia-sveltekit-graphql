// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
import IORedis from 'ioredis';
import { Worker } from 'bullmq';

const connection = new IORedis({
  host: process.env.REDIS_HOST ?? 'localhost',
  port: Number(process.env.REDIS_PORT ?? 6379),
  password: process.env.REDIS_PASSWORD ?? undefined,
  username: process.env.REDIS_USERNAME ?? undefined,
  tls: {},
});

const myWorker = new Worker(
  'email',
  async (job) => {
    console.log(job.data);
    return job.data;
  },
  {
    connection,
  }
);
