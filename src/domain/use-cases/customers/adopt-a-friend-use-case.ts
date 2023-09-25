import { PetsRepository } from '@/domain/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetIdNotExistError } from '../@errors/petIdNotExist'

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
      throw new PetIdNotExistError()
    }

    return { pet }
  }
}
