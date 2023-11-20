import { PrismaClient } from '@prisma/client';
import { prisma } from "@lucia-auth/adapter-prisma";
import { lucia } from "lucia";
import { node } from "lucia/middleware";

export const db = new PrismaClient();
const auth = lucia({
	adapter: prisma(db, {
		user: "user", // model User {}
		key: "key", // model Key {}
		session: "session" // model Session {}
	}),
  middleware: node(),
  env: "DEV",

});

