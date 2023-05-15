import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return res.status(200).json({ success: true });

  let id;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (req.body.data.user.social_accounts[0].id) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    id = req.body.data.user.social_accounts[0].id;
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

    if (currentUser && currentUser.user.RaffleBotSubscription) {
      const deniedFlags = await prisma.account.update({
        where: {
          id: currentUser?.id,
        },
        data: {
          user: {
            update: {
              raffleBotUser: false,
              communityMember: false,
            },
          },
        },
      });

      const deniedSubscription = await prisma.raffleBotSubscription.delete({
        where: {
          userId: currentUser?.userId,
        },
      });
    }

    return res.status(200).json({
      message: "good",
    });
  }
};

export default userByIdHandler;
