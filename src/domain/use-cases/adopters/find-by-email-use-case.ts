import { Adopter } from '@prisma/client'
import { AdoptersRepository } from '@/domain/repositories/adopters-repository'
import { AdopterNotExistsError } from '../@errors/adopterNotExists'

interface FindAdopterByEmailUseCaseResponse {
  adopter: Adopter
}

export class FindAdopterByEmailUseCase {
  constructor(private adoptersRepository: AdoptersRepository) {}

  async execute(email: string): Promise<FindAdopterByEmailUseCaseResponse> {
    const adopter = await this.adoptersRepository.findByEmail(email)

    if (!adopter) {
      throw new AdopterNotExistsError()
    }

    return { adopter }
  }
}
