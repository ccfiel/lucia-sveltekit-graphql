/* eslint-disable no-var */
import type { Processor } from 'bullmq';
import { QueueEvents, Queue, Worker } from 'bullmq';

import { redis } from './db';

type AugmentedQueue<T> = Queue<T> & {
  events: QueueEvents;
};
interface RegisteredQueue {
  queue: Queue;
  queueEvents: QueueEvents;
  worker: Worker;
}
declare global {
  var registeredQueues: Record<string, RegisteredQueue> | undefined;
}
const registeredQueues =
  global.registeredQueues || (global.registeredQueues = {});
/**
 *
 * @param name Unique name of the queue
 * @param processor
 */
export function registerQueue<T>(
  name: string,
  processor: Processor<T>
): AugmentedQueue<T> {
  if (!registeredQueues[name]) {
    const queue = new Queue(name, { connection: redis });
    const queueEvents = new QueueEvents(name, {
      connection: redis,
    });
    const worker = new Worker<T>(name, processor, {
      connection: redis,
      lockDuration: 1000 * 60 * 15,
      concurrency: 8,
    });
    registeredQueues[name] = {
      queue,
      queueEvents,
      worker,
    };
  }
  const queue = registeredQueues[name].queue as AugmentedQueue<T>;
  queue.events = registeredQueues[name].queueEvents;
  return queue;
}
