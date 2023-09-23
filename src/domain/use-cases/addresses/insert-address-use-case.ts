import { OrgAddress } from '@prisma/client'
import { OrgsAddressesRepository } from '@/domain/repositories/orgs-addressess-repository'

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
  orgId: string
}

interface InsertAddressUseCaseResponse {
  address: OrgAddress
}

export class InsertAddressUseCase {
  constructor(private orgsAddressesRepository: OrgsAddressesRepository) {}

  async execute(
    props: InsertAddressUseCaseRequest,
  ): Promise<InsertAddressUseCaseResponse> {
    const address = await this.orgsAddressesRepository.create(props)

    return { address }
  }
}
