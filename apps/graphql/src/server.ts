import { ServerResponse, createServer } from 'node:http';

import { createYoga, useReadinessCheck } from 'graphql-yoga';
import { PubSub } from 'graphql-subscriptions';
import { stringPath } from '@pothos/plugin-smart-subscriptions';

import { checkDbAvailable } from './db';
import { User } from './schemas/Auth';
import { schema } from './schema';
import { ContextType } from './types';

export const pubsub = new PubSub();

function getUserFromAuthHeader(authHeader: string): User | null {
  if (authHeader) {
    const [type, token] = authHeader.split(' ');
    let currentUser: User | null = null;

    if (type !== 'Bearer') {
      return null;
    } else {
      if (!token) {
        return null;
      } else if (token === '123456') {
        currentUser = new User('admin', 'admin@email.com', '123456');
      }
    }
    return currentUser;
  } else {
    return null;
  }
}

const yoga = createYoga({
  graphqlEndpoint: '/',
  healthCheckEndpoint: '/live',
  landingPage: false,
  schema,
  context: async ({ req }: ServerResponse) => ({
    currentUser: getUserFromAuthHeader(
      req.headers.authorization?.toString() ?? ''
    ),
    contextType: (): ContextType => ({
      pubsub,
      log: (info) =>
        void console.log(
          `${info.operation.name?.value}: resolving ${stringPath(info.path)}`
        ),
      logSub: (action, name) => void console.log(`${action} ${name}`),
    }),
  }),
  plugins: [
    useReadinessCheck({
      endpoint: '/ready',
      check: async () => {
        const check = await checkDbAvailable();
        return check;
      },
    }),
  ],
});
const server = createServer(yoga);
const port = Number(process.env.PORT ?? 3000);

server.listen(port, () => {
  console.info(`Server is running on http://localhost:${port}`);
});
