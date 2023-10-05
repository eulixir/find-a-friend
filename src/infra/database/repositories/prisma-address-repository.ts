import { OrgsAddressesRepository } from '@/domain/repositories/orgs-addressess-repository'
import { OrgAddress, Prisma } from '@prisma/client'
import { prisma } from './prisma'

export class PrismaAddressRepository implements OrgsAddressesRepository {
  async create(data: Prisma.OrgAddressCreateInput): Promise<OrgAddress> {
    const address = prisma.orgAddress.create({ data })

    return address
  }

  async findOrgsIdByCity(city: string): Promise<string[]> {
    const orgs = await prisma.orgAddress.findMany({
      where: { city },
    })

    const ids = orgs.map((org) => org.id)

    return ids
  }
}
