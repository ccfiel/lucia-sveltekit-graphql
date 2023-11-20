import { builder } from '../../builder';

export class User {
  userId: string;

  email: string;

  token: string;

  constructor(userId: string, email: string, token: string) {
    this.userId = userId;
    this.email = email;
    this.token = token;
  }
}

const AuthPayload = builder.simpleObject('AuthPayload', {
  fields: (t) => ({
    token: t.string({
      nullable: false,
    }),
  }),
});

async function sampleSignInWithEmailAndPassword(
  email: string,
  password: string
): Promise<User | null> {
  if (email == 'admin' && password == 'admin') {
    return new User('admin', email, '123456');
  } else {
    return null;
  }
}

builder.mutationField('login', (t) =>
  t.field({
    type: AuthPayload,
    args: {
      email: t.arg.string({}),
      password: t.arg.string({}),
    },
    resolve: async (_, args) => {
      const { email, password } = args;
      try {
        const user = await sampleSignInWithEmailAndPassword(email!, password!);
        if (!user) {
          throw new Error('Authentication failed');
        }
        const token = user.token;
        if (!token) {
          throw new Error('Token not found');
        }
        return {
          token,
        };
      } catch (error) {
        console.error(error);
        throw new Error('Authentication failed');
      }
    },
  })
);
