import { OrgAddress, Prisma } from '@prisma/client'

export interface OrgsAddressesRepository {
  create(data: Prisma.OrgAddressCreateInput): Promise<OrgAddress>
  findOrgsIdByCity(city: string): Promise<string[]>
}
