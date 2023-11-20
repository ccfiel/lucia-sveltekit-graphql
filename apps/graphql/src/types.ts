import { GraphQLResolveInfo } from 'graphql';
import { PubSub } from 'graphql-subscriptions';

export interface ContextType {
  pubsub: PubSub;
  log: (info: GraphQLResolveInfo) => void;
  logSub: (action: string, name: string) => void;
}
