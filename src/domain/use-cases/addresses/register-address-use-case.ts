import { Address } from '@prisma/client'
import { AddressesRepository } from '@/domain/repositories/addressess-repository'

interface RegisterAddressUseCaseRequest {
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

interface RegisterAddressUseCaseResponse {
  address: Address
}

export class RegisterAddressUseCase {
  constructor(private addressesRepository: AddressesRepository) {}

  async execute(
    props: RegisterAddressUseCaseRequest,
  ): Promise<RegisterAddressUseCaseResponse> {
    const address = await this.addressesRepository.create(props)

    return { address }
  }
}
