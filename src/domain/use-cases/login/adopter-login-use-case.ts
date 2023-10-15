import { Adopter } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../@errors/invalidCredentials'
import { AdoptersRepository } from '@/domain/repositories/adopters-repository'

interface AdopterLoginUseCaseRequest {
  email: string
  password: string
}

interface AdopterLoginUseCaseResponse {
  adopter: Adopter
}

export class AdopterLoginUseCase {
  constructor(private adopterRepository: AdoptersRepository) {}

  async execute({
    email,
    password,
  }: AdopterLoginUseCaseRequest): Promise<AdopterLoginUseCaseResponse> {
    const adopter = await this.adopterRepository.findByEmail(email)

    if (!adopter) {
      throw new InvalidCredentialsError()
    }

    const isPasswordEqual = await compare(password, adopter.passwordHash)

    if (!isPasswordEqual) {
      throw new InvalidCredentialsError()
    }

    return { adopter }
  }
}
