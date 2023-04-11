import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getMe: publicProcedure
    .input(z.object({ userId: z.string().nullish() }))
    .query(({ input, ctx }) => {
      if (input.userId) {
        return ctx.prisma.user.findUnique({
          where: {
            id: input.userId,
          },
          include: {
            configurations: true,
            RaffleBotSubscription: true,
            CommunitySubscription: true,
            accounts: true,
            sessions: true,
            favoriteRaffles: true,
          },
        });
      }
    }),

  addFavorite: protectedProcedure
    .input(z.object({ raffleId: z.string() }))
    .mutation(({ input, ctx }) => {
      const newFavoriteRaffle = ctx.prisma.favoriteRaffle.create({
        data: {
          trueRaffleId: input.raffleId,
          user: {
            connect: { id: ctx.session?.user.id },
          },
        },
      });
      return newFavoriteRaffle;
    }),

  deleteFavorite: protectedProcedure
    .input(z.object({ raffleId: z.string() }))
    .mutation(({ input, ctx }) => {
      const newFavoriteRaffle = ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          favoriteRaffles: {
            deleteMany: {
              trueRaffleId: input.raffleId,
            },
          },
        },
      });
      return newFavoriteRaffle;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
