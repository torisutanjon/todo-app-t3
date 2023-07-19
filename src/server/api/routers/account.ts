import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const profileRouter = createTRPCRouter({
  getAccountByID: protectedProcedure.query(async ({ ctx }) => {
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
});
