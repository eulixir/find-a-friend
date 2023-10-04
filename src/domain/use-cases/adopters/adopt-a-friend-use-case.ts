import { PetsRepository } from '@/domain/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetIdNotExistsError } from '../@errors/petIdNotExists'

interface AdoptAFriendUseCaseRequest {
  adopterId: string
  petId: string
}

interface AdoptAFriendUseCaseResponse {
  pet: Pet
}

export class AdoptAFriendUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    adopterId,
    petId,
  }: AdoptAFriendUseCaseRequest): Promise<AdoptAFriendUseCaseResponse> {
    const pet = await this.petsRepository.update(petId, {
      adopterId,
    })

    if (!pet) {
      throw new PetIdNotExistsError()
    }

    return { pet }
  }
}
