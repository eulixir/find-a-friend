import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { Org, Prisma } from '@prisma/client'
import { ObjectId } from 'bson'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? new ObjectId().toString(),
      name: data.name,
      email: data.email,
      orgAddressId: data.orgAddressId,
      phoneNumber: data.phoneNumber,
      passwordHash: data.passwordHash,

      createdAt: new Date(),
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findManyByIds(ids: string[]) {
    const orgs = this.items.filter((org) => ids.includes(org.id))

    return orgs
  }
}
