import { OrgsRepository } from '@/domain/repositories/orgs-repository'

import { Org, Prisma } from '@prisma/client'
import { prisma } from './prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({ data })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    if (!org) {
      return null
    }

    return org
  }

  findManyByIds(ids: string[]): Promise<Org[] | []> {
    const orgs = prisma.org.findMany({
      where: {
        id: { in: ids },
      },
    })

    return orgs
  }

  async findById(id: string): Promise<Org | null> {
    const org = prisma.org.findUnique({
      where: { id },
    })

    if (!org) {
      return null
    }

    return org
  }
}
