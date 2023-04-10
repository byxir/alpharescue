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
          },
        });
      }
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
