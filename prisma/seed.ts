import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const config1 = await prisma.configuration.create({
    data: {
      firstAccount: 1,
      lastAccount: 350,
      exceptions: "17,34,85,129,126,286",
      user: {
        connect: {
          id: "clg2bdipz0000p7yw5zz25k2l",
        },
      },
    },
    include: {
      user: true,
    },
  });
  console.log("config1 -> ", config1);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
