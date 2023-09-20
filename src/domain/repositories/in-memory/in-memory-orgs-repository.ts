import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { Org, Prisma } from '@prisma/client'
import { ObjectId } from 'bson'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: new ObjectId().toString(),
      name: data.name,
      email: data.email,
      addressId: data.addressId,
      phoneNumber: data.phoneNumber,

      createdAt: new Date(),
    }

    this.items.push(org)

    return org
  }
}
