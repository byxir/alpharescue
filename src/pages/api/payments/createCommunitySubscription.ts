import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import { v4 as uuidv4 } from "uuid";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return res.status(200).json({ success: true });

  let id;
  let expiresDate;

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
            CommunitySubscription: true,
          },
        },
      },
    });

    if (currentUser && typeof expiresDate === "string") {
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
      } else {
        const formattedExpiresDate = new Date(expiresDate);

        const newSubscription = await prisma.communitySubscription.update({
          where: {
            userId: currentUser.user.id,
          },
          data: {
            expires: formattedExpiresDate,
          },
        });
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          communityMember: true,
        },
      });

      return res.status(200).json({
        message: "good",
      });
    } else {
      if (typeof expiresDate === "string") {
        const formattedExpiresDate = new Date(expiresDate);

        const newUser = await prisma.user.create({
          data: {
            communityMember: true,
            raffleBotUser: false,
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
