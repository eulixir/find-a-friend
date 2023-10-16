import { OrgAddress, Prisma } from '@prisma/client'
import { ObjectId } from 'bson'
import { OrgsAddressesRepository } from '../orgs-addressess-repository'

export class InMemoryOrgsAddressesRepository
  implements OrgsAddressesRepository
{
  public items: OrgAddress[] = []

  async create(data: Prisma.OrgAddressCreateInput) {
    const address = {
      id: data.id ?? new ObjectId().toString(),
      city: data.city,
      complement: data.complement ?? '',
      country: data.country,
      orgId: data.orgId,
      neighborhood: data.neighborhood,
      number: data.number ?? '',
      state: data.state,
      street: data.street,
      zipCode: data.zipCode,
    }

    this.items.push(address)

    return address
  }

  async findOrgsIdByCity(city: string): Promise<string[]> {
    const addresses = this.items.filter((address) => address.city === city)

    const orgsId = addresses.map((address) => {
      return address.orgId
    })

    return orgsId
  }
}
