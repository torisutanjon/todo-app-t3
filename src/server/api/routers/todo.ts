import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const todoRouter = createTRPCRouter({
  getTodos: publicProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todos.findMany({
      select: {
        id: true,
        creatorID: true,
      },
    });
    return todos;
  }),
  getTodoByID: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input: { id }, ctx }) => {
      const todo = await ctx.prisma.todos.findUnique({
        where: {
          id: id,
        },
      });

      return todo;
    }),
  addTodo: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
      })
    )
    .mutation(async ({ input: { title, body }, ctx }) => {
      if (ctx.session.user.name === null || ctx.session.user.name === undefined)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error",
        });

      await ctx.prisma.todos.create({
        data: {
          title: title,
          body: body,
          creatorName: ctx.session.user.name,
          creatorID: ctx.session.user.id,
        },
      });

      return {
        message: "Todo Created",
      };
    }),
  updateTodo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        body: z.string(),
      })
    )
    .mutation(
      async ({ input: { id, title, body }, ctx: { prisma, session } }) => {
        try {
          await prisma.todos.update({
            where: {
              id: id,
            },
            data: {
              title: title,
              body: body,
            },
          });

          return {
            message: "Todo Updated",
          };
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Internal Server Error",
          });
        }
      }
    ),
});
