import { Address, Prisma } from '@prisma/client'

export interface AddressesRepository {
  create(data: Prisma.AddressCreateInput): Promise<Address>
  // find(email: string): Promise<Org | null>
}
