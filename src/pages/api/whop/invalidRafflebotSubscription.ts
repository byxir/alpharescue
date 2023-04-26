/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return res.status(200).end();
  console.log("req -> ", req);

  let id;

  if (req.body.data.user.social_accounts[0].id) {
    id = req.body.data.user.social_accounts[0].id;
  }

  if (!id || typeof id !== "string") {
    return res
      .status(200)
      .json({ error: "connection established", message: id });
  }

  const currentUser = await prisma.account.findFirst({
    where: {
      providerAccountId: id,
    },
    include: {
      user: true,
    },
  });

  const newFlags = await prisma.account.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      user: {
        update: {
          raffleBotUser: false,
        },
      },
    },
  });

  const newSubscription = await prisma.raffleBotSubscription.delete({
    where: {
      userId: currentUser?.id,
    },
  });
  res.status(200).json({
    message: "good",
    currentUser: currentUser,
    newFlags,
    newSubscription,
  });
};

export default userByIdHandler;
