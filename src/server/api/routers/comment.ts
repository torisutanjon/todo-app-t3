import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
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
      const createdComment = await ctx.prisma.comments.create({
        data: {
          body: comment,
          creatorName: ctx.session.user.name,
          creatorID: ctx.session.user.id,
          todoID: todoID,
        },
      });

      await ctx.prisma.todos.update({
        where: {
          id: todoID,
        },
        data: {
          comments: {
            connect: { id: createdComment.id },
          },
        },
      });
    }),

  getCommentByTodo: publicProcedure
    .input(z.object({ todoID: z.string() }))
    .query(async ({ input: { todoID }, ctx: { prisma, session } }) => {
      const comments = await prisma.comments.findMany({
        where: {
          todoID: todoID,
        },

        select: {
          id: true,
          body: true,
          creatorName: true,
          creatorID: true,
        },
      });

      return comments;
    }),
  updateComment: protectedProcedure
    .input(
      z.object({
        commentID: z.string(),
        commentBody: z.string(),
      })
    )
    .mutation(
      async ({ input: { commentID, commentBody }, ctx: { prisma } }) => {
        await prisma.comments.update({
          where: {
            id: commentID,
          },
          data: {
            body: commentBody,
          },
        });
      }
    ),
  deleteComment: protectedProcedure
    .input(
      z.object({
        commentID: z.string(),
      })
    )
    .mutation(async ({ input: { commentID }, ctx: { prisma } }) => {
      await prisma.comments.delete({
        where: {
          id: commentID,
        },
      });
    }),
});
