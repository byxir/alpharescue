import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createSampleConfiguration() {
  const config1 = await prisma.configuration.create({
    data: {
      firstAccount: 1,
      lastAccount: 350,
      exceptions: "17,34,85,129,126,286",
      user: {
        connect: {
          id: "clfwpqldx0000p7nc11l9002x",
        },
      },
    },
    include: {
      user: true,
    },
  });
}

async function createSampleRaffleBotSubscription() {
  const currentDate = new Date();
  const expiresDate = new Date(
    currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
  ); // 1 month from current date
  const raffleBotSubscription = await prisma.raffleBotSubscription.create({
    data: {
      expires: expiresDate,
      rafflesLeft: 5,
      rafflesPerDay: 5,
      maxNumAccounts: 150,
      user: {
        connect: {
          id: "clfwpqldx0000p7nc11l9002x",
        },
      },
    },
  });
}

async function main() {
  // await createSampleConfiguration();
  await createSampleRaffleBotSubscription();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
