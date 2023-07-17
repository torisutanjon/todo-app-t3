import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const profileRouter = createTRPCRouter({
  getAccountByID: protectedProcedure.query(async ({ ctx }) => {
    // if (ctx.session === null || ctx.session === undefined)
    //   return {
    //     redirect: {
    //       destination: "/",
    //     },
    //   };

    const user = await prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!user)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No User found",
      });

    return {
      id: user.id,
      profilename: user.name?.toUpperCase(),
      name: user.name,
    };
  }),
  //   if (profile === null)
  //     throw new TRPCError({
  //       code: "INTERNAL_SERVER_ERROR",
  //       message: "Error Fetching User Info ",
  //     });

  //   return {
  //     id: profile.id,
  //     profilename: profile.name?.toUpperCase(),
  //     name: profile.name,
  //   };
  // }),
});
