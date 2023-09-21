import { Address } from '@prisma/client'
import { AddressesRepository } from '@/domain/repositories/addressess-repository'

interface InsertAddressUseCaseRequest {
  id?: string
  country: string
  zipCode: string
  state: string
  city: string
  neighborhood: string
  street: string
  number?: string
  complement?: string
  orgId?: string
  customerId?: string
}

interface InsertAddressUseCaseResponse {
  address: Address
}

export class InsertAddressUseCase {
  constructor(private addressesRepository: AddressesRepository) {}

  async execute(
    props: InsertAddressUseCaseRequest,
  ): Promise<InsertAddressUseCaseResponse> {
    const address = await this.addressesRepository.create(props)

    return { address }
  }
}
