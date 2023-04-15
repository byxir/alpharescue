import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAllMyData: publicProcedure.query(async ({ ctx }) => {
    const response = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session?.user.id,
      },
      include: {
        configurations: true,
        RaffleBotSubscription: true,
        accounts: true,
        sessions: true,
      },
    });

    return {
      discordId: response?.accounts.at(1)?.providerAccountId,
      sessionToken: response?.sessions.at(1)?.sessionToken,
      configurations: response?.configurations,
      RaffleBotSubscription: response?.RaffleBotSubscription,
    };
  }),

  getMyProtectionData: protectedProcedure.query(async ({ ctx }) => {
    const response = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session?.user.id,
      },
      include: {
        accounts: true,
        sessions: true,
      },
    });
    return {
      discordId: response?.accounts.at(0)?.providerAccountId,
      sessionToken: response?.sessions.at(0)?.sessionToken,
    };
  }),

  getMeWithFavoriteRaffles: protectedProcedure.query(async ({ ctx }) => {
    const response = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session?.user.id,
      },
      include: {
        favoriteRaffles: true,
      },
    });

    return {
      favoriteRaffles: response?.favoriteRaffles,
    };
  }),

  addFavorite: protectedProcedure
    .input(z.object({ raffleId: z.string() }))
    .mutation(({ input, ctx }) => {
      if (ctx.session.user.raffleBotUser) {
        return ctx.prisma.favoriteRaffle.create({
          data: {
            trueRaffleId: input.raffleId,
            user: {
              connect: { id: ctx.session?.user.id },
            },
          },
        });
      }
    }),

  deleteFavorite: protectedProcedure
    .input(z.object({ raffleId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
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
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
