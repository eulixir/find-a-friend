import { OrgsAddressesRepository } from '@/domain/repositories/orgs-addressess-repository'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { Org } from '@prisma/client'

interface FindNearbyOrgsUseCaseRequest {
  city: string
}

interface FindNearbyOrgsUseCaseResponse {
  orgs: Org[]
}

export class FindNearbyOrgsUseCase {
  constructor(
    private addressesRepository: OrgsAddressesRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    city,
  }: FindNearbyOrgsUseCaseRequest): Promise<FindNearbyOrgsUseCaseResponse> {
    const orgsIds = await this.addressesRepository.findOrgsIdByCity(city)

    const orgs = await this.orgsRepository.findManyByAddressIds(orgsIds)

    return { orgs }
  }
}
