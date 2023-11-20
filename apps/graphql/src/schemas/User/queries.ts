import { builder } from '../../builder';
import { db } from '../../db';

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    fullName: t.string({
      resolve: (user) => `${user.firstName} ${user.lastName}`,
    }),
    posts: t.relation('posts'),
    comments: t.relation('comments'),
  }),
});

builder.queryField('User', (t) =>
  t.prismaField({
    type: 'User',
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    authScopes: {
      isAuthenticated: true,
    },
    resolve: (query, root, args) =>
      db.user.findUnique({
        ...query,
        where: { id: Number.parseInt(String(args.id), 10) },
      }),
  })
);
