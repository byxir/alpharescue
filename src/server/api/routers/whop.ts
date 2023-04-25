import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

interface IValidMembership {
  action: string;
  data: {
    id: string;
    product: {
      id: string;
      name: string;
      visibility: string;
      created_at: number;
      experiences: string[];
      plans: string[];
    };
  };
  user: {
    id: string;
    username: string;
    email: string;
    profile_pic_url: string;
    social_accounts: {
      service: string;
      username: string;
      id: number;
    }[];
    plan: {
      id: string;
      plan_type: string;
      release_method: string;
      visibility: string;
      biling_period: string | null;
      internal_notes: string | null;
    };
  };
}

// export const whopRouter = createTRPCRouter({
//   createSubscription: protectedProcedure
//   .input(z.object({action: z.string(), data: z.object({id: z.string(), product: z.object({
//     id: z.string(), name: z.string(), visibility: z.string(), created_at: z.string(), experiences: z.string(), plans: z.array(z.string())
//   .query(async ({ ctx }) => {
//     const response = await ctx.prisma.account.update({

//     });

//     return {
//       discordId: response?.accounts.at(0)?.providerAccountId,
//       sessionToken: response?.sessions.at(0)?.sessionToken,
//       configurations: response?.configurations,
//       RaffleBotSubscription: response?.RaffleBotSubscription,
//     };
//   }),
// });
