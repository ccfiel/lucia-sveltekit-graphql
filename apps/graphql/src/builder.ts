import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import { DateTimeResolver } from 'graphql-scalars';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import PrismaUtils from '@pothos/plugin-prisma-utils';
import RelayPlugin from '@pothos/plugin-relay';
import SmartSubscriptionsPlugin, {
  subscribeOptionsFromIterator,
} from '@pothos/plugin-smart-subscriptions';

import type PrismaTypes from '../prisma/generated';

import { db } from './db';
import { User } from './schemas/Auth';
import {
  stringToFloatJson,
  intToString,
  toObject,
} from './utils/stringToFloatJson';
import { ContextType } from './types';

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: {
    currentUser: User;
    contextType: ContextType;
  };
  SmartSubscriptions: string;
  Scalars: {
    Json: {
      Input: number;
      Output: unknown;
    };
    ToString: {
      Input: number;
      Output: unknown;
    };
    ToObject: {
      Input: unknown;
      Output: unknown;
    };
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
  AuthScopes: {
    isAuthenticated: boolean;
  };
}>({
  plugins: [
    PrismaPlugin,
    RelayPlugin,
    SimpleObjectsPlugin,
    ScopeAuthPlugin,
    PrismaUtils,
    SmartSubscriptionsPlugin,
  ],
  smartSubscriptions: {
    ...subscribeOptionsFromIterator((name, { contextType }) =>
      contextType.pubsub.asyncIterator(name)
    ),
  },
  prisma: {
    client: db,
  },
  relayOptions: {},
  authScopes: async (context): Promise<{ isAuthenticated: boolean }> => ({
    isAuthenticated: context.currentUser !== null,
  }),
});

builder.queryType();
builder.mutationType();

builder.addScalarType('DateTime', DateTimeResolver, {});
builder.scalarType('Json', {
  serialize: (n) => {
    return stringToFloatJson(n as string);
  },
});
builder.scalarType('ToString', {
  serialize: (n) => {
    return intToString(n as string);
  },
});
builder.scalarType('ToObject', {
  serialize: (n) => {
    return toObject(n as string);
  },
});
