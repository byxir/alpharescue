import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import { v4 as uuidv4 } from "uuid";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return res.status(200).json({ success: true });

  let id;
  let username;
  let useremail;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (req.body.data.user.social_accounts[0].id) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    id = req.body.data.user.social_accounts[0].id;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (req.body.data.user.name) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    username = req.body.data.user.name;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (req.body.data.user.email) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    useremail = req.body.data.user.email;
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
          },
        },
      },
    });

    if (currentUser) {
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

        const currentDate = new Date();
        const expiresDate = new Date(
          currentDate.getTime() + 8 * 24 * 60 * 60 * 1000
        );

        const newSubscription = await prisma.raffleBotSubscription.create({
          data: {
            expires: expiresDate,
            rafflesLeft: 5,
            rafflesPerDay: 5,
            maxNumAccounts: 50,
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
      if (typeof username === "string" && typeof useremail === "string") {
        const currentDate = new Date();
        const newSessionExpiresDate = new Date(
          currentDate.getTime() + 28 * 24 * 60 * 60 * 1000
        );
        const newSubscriptionExpiresDate = new Date(
          currentDate.getTime() + 28 * 24 * 60 * 60 * 1000
        );

        const newUser = await prisma.user.create({
          data: {
            name: username,
            email: useremail,
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
                expires: newSessionExpiresDate,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                sessionToken: String(uuidv4()),
              },
            },
            RaffleBotSubscription: {
              create: {
                expires: newSubscriptionExpiresDate,
                rafflesLeft: 5,
                rafflesPerDay: 5,
                maxNumAccounts: 50,
              },
            },
          },
        });
      }
    }
  }
};

export default userByIdHandler;
