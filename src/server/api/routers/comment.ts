import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const commentRouter = createTRPCRouter({
  addComment: protectedProcedure
    .input(
      z.object({
        todoID: z.string(),
        comment: z.string(),
      })
    )
    .mutation(async ({ input: { todoID, comment }, ctx }) => {
      if (ctx.session.user.name === null || ctx.session.user.name === undefined)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error",
        });
      await ctx.prisma.comments.create({
        data: {
          body: comment,
          creatorName: ctx.session.user.name,
          creatorID: ctx.session.user.id,
          todoID: todoID,
        },
      });
    }),
});
