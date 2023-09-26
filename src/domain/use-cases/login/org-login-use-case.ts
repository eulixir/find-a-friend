import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../@errors/invalidCredentials'

interface OrgLoginUseCaseRequest {
  email: string
  password: string
}

interface OrgLoginUseCaseResponse {
  org: Org
}

export class OrgLoginUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: OrgLoginUseCaseRequest): Promise<OrgLoginUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const isPasswordEqual = await compare(password, org.passwordHash)

    if (!isPasswordEqual) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
