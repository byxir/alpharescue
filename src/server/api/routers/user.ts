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
      discordId: response?.accounts.at(0)?.providerAccountId,
      sessionToken: response?.sessions.at(0)?.sessionToken,
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

  addConfiguration: protectedProcedure
    .input(
      z.object({
        firstAccount: z.number(),
        lastAccount: z.number(),
        exceptions: z.array(z.string()).nullish(),
      })
    )
    .mutation(({ input, ctx }) => {
      let exceptionsString = undefined;
      console.log(
        "EXCEPTIONS STRING --------------------------------> ",
        typeof exceptionsString
      );
      if (input.exceptions != null && input.exceptions.length > 0) {
        exceptionsString = input.exceptions.join(",");
      }
      console.log(
        "EXCEPTIONS STRING AFTER --------------------------------> ",
        typeof exceptionsString
      );
      return ctx.prisma.configuration.create({
        data: {
          firstAccount: input.firstAccount,
          lastAccount: input.lastAccount,
          exceptions: exceptionsString,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  updateConfiguration: protectedProcedure
    .input(
      z.object({
        firstAccount: z.number(),
        lastAccount: z.number(),
        exceptions: z.array(z.string()).nullish(),
        configurationId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const exceptionsString = input.exceptions
        ? input.exceptions.join(",")
        : null;
      return ctx.prisma.configuration.update({
        where: {
          id: input.configurationId,
        },
        data: {
          firstAccount: input.firstAccount,
          lastAccount: input.lastAccount,
          exceptions: exceptionsString,
        },
      });
    }),

  deleteConfiguration: protectedProcedure
    .input(
      z.object({
        configurationId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.configuration.delete({
        where: {
          id: input.configurationId,
        },
      });
    }),

  reduceRemainingRaffles: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        RaffleBotSubscription: {
          update: {
            rafflesLeft: {
              decrement: 1,
            },
          },
        },
      },
    });
  }),
});
