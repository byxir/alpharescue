/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body.user.social_accounts[0].id;

  if (!id || typeof id !== "string") {
    return res.status(200).json({ error: "connection established" });
  }

  const currentUser = await prisma.account.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  const newRoles = await prisma.account.update({
    where: {
      id,
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

  const newSubscription = await prisma.raffleBotSubscription.create({
    data: {
      expires: new Date(),
      rafflesLeft: 5,
      rafflesPerDay: 5,
      maxNumAccounts: 150,
      user: {
        connect: {
          id: currentUser?.user.id,
        },
      },
    },
  });

  res
    .status(200)
    .json({ newSubscription: newSubscription, newRoles: newRoles });
};

export default userByIdHandler;
