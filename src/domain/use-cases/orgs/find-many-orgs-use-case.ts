import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { Org } from '@prisma/client'

interface FindAllOrgsUseCaseResponse {
  orgs: Org[]
}

export class FindAllOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(): Promise<FindAllOrgsUseCaseResponse> {
    const orgs = await this.orgsRepository.listAll()

    return { orgs }
  }
}
