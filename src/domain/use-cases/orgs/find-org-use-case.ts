import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { OrgNotFoundError } from '../@errors/orgNotFound'

interface FindOrgUseCaseResponse {
  org: Org
}

export class FindOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(id: string): Promise<FindOrgUseCaseResponse> {
    const org = await this.orgsRepository.findById(id)

    if (!org) {
      throw new OrgNotFoundError()
    }

    return { org }
  }
}
