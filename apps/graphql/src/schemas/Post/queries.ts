import { builder } from '../../builder';
import { db } from '../../db';

builder.prismaObject('Post', {
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    content: t.exposeString('content'),
    author: t.relation('author'),
    comments: t.relation('comments'),
  }),
});

builder.prismaObject('Comment', {
  fields: (t) => ({
    id: t.exposeID('id'),
    comment: t.exposeString('comment'),
    author: t.relation('author'),
    post: t.relation('post'),
  }),
});

const DEFAULT_PAGE_SIZE = 10;

builder.queryField('Post', (t) =>
  t.prismaField({
    type: 'Post',
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (query, root, args) =>
      db.post.findUnique({
        ...query,
        where: { id: Number.parseInt(String(args.id), 10) },
      }),
  })
);

builder.queryField('Posts', (t) =>
  t.prismaField({
    type: ['Post'],
    args: {
      take: t.arg.int(),
      skip: t.arg.int(),
    },
    resolve: (query, root, args) =>
      db.post.findMany({
        ...query,
        take: args.take ?? DEFAULT_PAGE_SIZE,
        skip: args.skip ?? 0,
      }),
  })
);
