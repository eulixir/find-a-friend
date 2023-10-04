import { AdoptersRepository } from '@/domain/repositories/adopters-repository'
import { hash } from 'bcryptjs'
import { AdopterAlreadyExistsError } from '../@errors/adopterAlreadyExists'

interface RegisterAdopterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterAdopterUseCaseResponse {
  adopter: {
    id: string
    name: string
    email: string
    createdAt: Date
  }
}

export class RegisterAdopterUseCase {
  constructor(private adopterRepository: AdoptersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterAdopterUseCaseRequest): Promise<RegisterAdopterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const hasAdopter = await this.adopterRepository.findByEmail(email)

    if (hasAdopter) {
      throw new AdopterAlreadyExistsError()
    }

    const adopter = await this.adopterRepository.create({
      passwordHash,
      email,
      name,
    })

    return { adopter }
  }
}
