/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import { v4 as uuidv4 } from "uuid";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return res.status(200).json({ success: true });

  let id;
  let communityExpiresDate;
  let rafflebotExpiresDate;
  let accountsQuantity;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (req.body.data.user.social_account.id) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    id = req.body.data.user.social_account.id;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (req.body.data.user.social_account.communityExpiresDate) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    communityExpiresDate =
      req.body.data.user.social_account.communityExpiresDate;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (req.body.data.user.social_account.rafflebotExpiresDate) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    rafflebotExpiresDate =
      req.body.data.user.social_account.rafflebotExpiresDate;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (req.body.data.user.social_account.accountsQuantity) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    accountsQuantity = req.body.data.user.social_account.accountsQuantity;
  }

  if (!id || typeof id != "string") {
    return res.status(200).json({ error: "connection established" });
  } else {
    const currentUser = await prisma.account.findFirst({
      where: {
        providerAccountId: id,
      },
      include: {
        user: {
          include: {
            RaffleBotSubscription: true,
            CommunitySubscription: true,
          },
        },
      },
    });

    if (
      currentUser &&
      typeof communityExpiresDate === "string" &&
      typeof rafflebotExpiresDate === "string" &&
      typeof accountsQuantity === "number"
    ) {
      if (!currentUser.user.RaffleBotSubscription) {
        const newFlags = await prisma.account.update({
          where: {
            id: currentUser?.id,
          },
          data: {
            user: {
              update: {
                raffleBotUser: true,
                communityMember: true,
              },
            },
          },
        });

        const formattedRafflebotExpiresDate = new Date(rafflebotExpiresDate);

        const newSubscription = await prisma.raffleBotSubscription.create({
          data: {
            expires: formattedRafflebotExpiresDate,
            rafflesLeft: 5,
            rafflesPerDay: 5,
            maxNumAccounts: accountsQuantity,
            user: {
              connect: {
                id: currentUser?.userId,
              },
            },
          },
        });
      } else {
        const formattedRafflebotExpiresDate = new Date(rafflebotExpiresDate);

        const newFlags = await prisma.raffleBotSubscription.update({
          where: {
            userId: currentUser?.id,
          },
          data: {
            expires: formattedRafflebotExpiresDate,
          },
        });
      }

      if (!currentUser.user.CommunitySubscription) {
        const formattedCommunityExpiresDate = new Date(communityExpiresDate);

        const newSubscription = await prisma.communitySubscription.create({
          data: {
            expires: formattedCommunityExpiresDate,
            user: {
              connect: {
                id: currentUser?.userId,
              },
            },
          },
        });
      } else {
        const formattedCommunityExpiresDate = new Date(communityExpiresDate);

        const newFlags = await prisma.communitySubscription.update({
          where: {
            userId: currentUser?.id,
          },
          data: {
            expires: formattedCommunityExpiresDate,
          },
        });
      }

      return res.status(200).json({
        message: "good",
      });
    } else {
      if (
        typeof communityExpiresDate === "string" &&
        typeof rafflebotExpiresDate === "string" &&
        typeof accountsQuantity === "number"
      ) {
        const formattedRafflebotExpiresDate = new Date(rafflebotExpiresDate);
        const formattedCommunityExpiresDate = new Date(communityExpiresDate);

        const newUser = await prisma.user.create({
          data: {
            communityMember: true,
            raffleBotUser: true,
            accounts: {
              create: {
                type: "oauth",
                provider: "discord",
                providerAccountId: id,
              },
            },
            sessions: {
              create: {
                expires: formattedRafflebotExpiresDate,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                sessionToken: String(uuidv4()),
              },
            },
            RaffleBotSubscription: {
              create: {
                expires: formattedRafflebotExpiresDate,
                rafflesLeft: 5,
                rafflesPerDay: 5,
                maxNumAccounts: accountsQuantity,
              },
            },
            CommunitySubscription: {
              create: {
                expires: formattedCommunityExpiresDate,
              },
            },
          },
        });
        return res.status(200).json({
          message: "good",
        });
      }
      return res.status(500).json({
        message: "bad request",
      });
    }
  }
};

export default userByIdHandler;
