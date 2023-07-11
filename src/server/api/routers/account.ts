import { TRPCError } from "@trpc/server";
import { z } from "zod";
import argon2 from "argon2";
import jwt, { Secret } from "jsonwebtoken";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const profileRouter = createTRPCRouter({
  createAccount: publicProcedure
    .input(
      z.object({
        email: z.string(),
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, username, password } = input;

      if (email === "" || username === "" || password === "")
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Data was empty`,
        });

      const user = await ctx.prisma.userAccount.findFirst({
        where: {
          OR: [{ email: email }, { username: username }],
        },
      });

      if (user)
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });

      const hash = await argon2.hash(password);

      await ctx.prisma.userAccount.create({
        data: {
          email: email,
          username: username,
          password: hash,
        },
      });
    }),
  loginAccount: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { username, password } = input;

      if (username === "" || password === "")
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Data was empty`,
        });

      const user = await ctx.prisma.userAccount.findFirst({
        where: {
          OR: [{ email: username }, { username: username }],
        },
      });

      if (!user)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No user was found",
        });

      if ((await argon2.verify(user.password, password)) === false)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No user was found",
        });

      if (process.env.SECRET_KEY === undefined)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SECRET_KEY environment variable was not set",
        });

      return {
        id: user.id,
        email: user.email as string,
        username: user.username,
      };
    }),
});
