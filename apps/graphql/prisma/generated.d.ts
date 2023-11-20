/* eslint-disable */
import type { Prisma, User, Post, Comment } from "/Users/chrisianfiel/Projects/youstamp-server/node_modules/@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: Prisma.UserCreateInput;
        Update: Prisma.UserUpdateInput;
        RelationName: "posts" | "comments";
        ListRelations: "posts" | "comments";
        Relations: {
            posts: {
                Shape: Post[];
                Name: "Post";
            };
            comments: {
                Shape: Comment[];
                Name: "Comment";
            };
        };
    };
    Post: {
        Name: "Post";
        Shape: Post;
        Include: Prisma.PostInclude;
        Select: Prisma.PostSelect;
        OrderBy: Prisma.PostOrderByWithRelationInput;
        WhereUnique: Prisma.PostWhereUniqueInput;
        Where: Prisma.PostWhereInput;
        Create: Prisma.PostCreateInput;
        Update: Prisma.PostUpdateInput;
        RelationName: "author" | "comments";
        ListRelations: "comments";
        Relations: {
            author: {
                Shape: User;
                Name: "User";
            };
            comments: {
                Shape: Comment[];
                Name: "Comment";
            };
        };
    };
    Comment: {
        Name: "Comment";
        Shape: Comment;
        Include: Prisma.CommentInclude;
        Select: Prisma.CommentSelect;
        OrderBy: Prisma.CommentOrderByWithRelationInput;
        WhereUnique: Prisma.CommentWhereUniqueInput;
        Where: Prisma.CommentWhereInput;
        Create: Prisma.CommentCreateInput;
        Update: Prisma.CommentUpdateInput;
        RelationName: "author" | "post";
        ListRelations: never;
        Relations: {
            author: {
                Shape: User;
                Name: "User";
            };
            post: {
                Shape: Post;
                Name: "Post";
            };
        };
    };
}