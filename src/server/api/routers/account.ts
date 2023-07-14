import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getAccountByID: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      const profile = await ctx.prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      if (profile === null)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error Fetching User Info ",
        });

      return {
        id: profile.id,
        profilename: profile.name?.toUpperCase(),
        name: profile.name,
      };
    }),
});
