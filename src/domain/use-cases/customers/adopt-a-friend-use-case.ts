import { PetsRepository } from '@/domain/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetIdNotExistsError } from '../@errors/petIdNotExists'

interface AdoptAFriendUseCaseRequest {
  customerId: string
  petId: string
}

interface AdoptAFriendUseCaseResponse {
  pet: Pet
}

export class AdoptAFriendUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    customerId,
    petId,
  }: AdoptAFriendUseCaseRequest): Promise<AdoptAFriendUseCaseResponse> {
    const pet = await this.petsRepository.update(petId, {
      customerId,
    })

    if (!pet) {
      throw new PetIdNotExistsError()
    }

    return { pet }
  }
}
