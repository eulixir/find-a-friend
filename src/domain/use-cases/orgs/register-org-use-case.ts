import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { Org, Pet } from '@prisma/client'

interface RegisterOrgUseCaseRequest {
  addressId: string
  email: string
  phoneNumber: string
  name: string
  pets: Pet[]
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    props: RegisterOrgUseCaseRequest,
  ): Promise<RegisterOrgUseCaseResponse> {
    const org = await this.orgsRepository.create(props)

    return { org }
  }
}
