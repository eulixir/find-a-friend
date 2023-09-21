import { Address, Prisma } from '@prisma/client'
import { ObjectId } from 'bson'
import { AddressesRepository } from '../addressess-repository'

export class InMemoryAddressesRepository implements AddressesRepository {
  public items: Address[] = []

  async create(data: Prisma.AddressCreateInput) {
    const address = {
      id: new ObjectId().toString(),
      city: data.city,
      complement: data.complement ?? null,
      country: data.country,
      customerId: data.customerId ?? null,
      orgId: data.orgId ?? null,
      neighborhood: data.neighborhood,
      number: data.number ?? null,
      state: data.state,
      street: data.street,
      zipCode: data.zipCode,
    }

    this.items.push(address)

    return address
  }
}
