import { Prisma, PrismaClient } from '@prisma/client'
import { EXPENSES_SEED_UPSERT_ARGS, USERS_SEED_UPSERT_ARGS } from './seed-data'
const prisma = new PrismaClient()

async function deleteDatabase() {
  await prisma.party.deleteMany({})
  await prisma.expense.deleteMany({})
  await prisma.user.deleteMany({})
}

async function main() {
  try {
    await deleteDatabase()

    const seededUsers = await Promise.all(
      USERS_SEED_UPSERT_ARGS.map(async (arg) => await prisma.user.create(arg))
    )

    const seededParties = seededUsers.map((user) => {
      return {
        userId: user.id,
        percent: new Prisma.Decimal(Math.random() * 100).toFixed(2),
        amountOwed: new Prisma.Decimal(Math.random() * 100).toFixed(2),
        settled: false,
      }
    })
    await Promise.all(
      seededUsers.map(async (user, i) => {
        console.log(user)
        const arg = {
          data: {
            ...EXPENSES_SEED_UPSERT_ARGS[i].data,
            ownerId: user.id,
            parties: {
              createMany: {
                data: seededParties,
              },
            },
          },
          include: {
            parties: true,
          },
        }
        return await prisma.expense.create(arg)
      })
    )
  } catch (err) {
    console.error(err)
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
