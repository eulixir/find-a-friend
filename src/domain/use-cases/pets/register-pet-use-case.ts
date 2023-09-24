import { PetsRepository } from '@/domain/repositories/pets-repository'
import { Pet, Species } from '@prisma/client'

interface RegisterPetUseCaseRequest {
  name?: string
  species: Species
  breed: string
  orgId: string
  age: number
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    props: RegisterPetUseCaseRequest,
  ): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create(props)
    return { pet }
  }
}
