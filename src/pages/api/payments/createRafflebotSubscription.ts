import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import { v4 as uuidv4 } from "uuid";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return res.status(200).json({ success: true });

  let id;
  let expiresDate;
  let accountsQuantity;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (req.body.data.user.social_account.id) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    id = req.body.data.user.social_account.id;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (req.body.data.user.social_account.expiresDate) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    expiresDate = req.body.data.user.social_account.expiresDate;
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
      typeof expiresDate === "string" &&
      typeof accountsQuantity === "number"
    ) {
      console.log("made it into currentUser if");
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

        const formattedExpiresDate = new Date(expiresDate);

        const newSubscription = await prisma.raffleBotSubscription.create({
          data: {
            expires: formattedExpiresDate,
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
      }

      if (!currentUser.user.CommunitySubscription) {
        const formattedExpiresDate = new Date(expiresDate);

        const newSubscription = await prisma.communitySubscription.create({
          data: {
            expires: formattedExpiresDate,
            user: {
              connect: {
                id: currentUser?.userId,
              },
            },
          },
        });
      }

      return res.status(200).json({
        message: "good",
      });
    } else {
      console.log(
        "typeof expiresDate: ",
        typeof expiresDate,
        "typeof accountsQuantity",
        typeof accountsQuantity
      );
      if (
        typeof expiresDate === "string" &&
        typeof accountsQuantity === "number"
      ) {
        const formattedExpiresDate = new Date(expiresDate);

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
                expires: formattedExpiresDate,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                sessionToken: String(uuidv4()),
              },
            },
            RaffleBotSubscription: {
              create: {
                expires: formattedExpiresDate,
                rafflesLeft: 5,
                rafflesPerDay: 5,
                maxNumAccounts: accountsQuantity,
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        expiresDate: expiresDate,
      });
    }
  }
};

export default userByIdHandler;
