import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const run = async () => {
  try {
    await prisma.$connect()
  } catch (err) {
    await prisma.$disconnect()
  }
}

export default {
  run,
}
