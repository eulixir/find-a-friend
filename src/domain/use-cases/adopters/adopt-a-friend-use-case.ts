import { PetsRepository } from '@/domain/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetIdNotExistsError } from '../@errors/petIdNotExists'
import { AdoptersRepository } from '@/domain/repositories/adopters-repository'
import { AdopterNotExistsError } from '../@errors/adopterNotExists'
import { PetAlreadyAdoptedError } from '../@errors/petAlreadyAdopted'

interface AdoptAFriendUseCaseRequest {
  adopterId: string
  petId: string
}

interface AdoptAFriendUseCaseResponse {
  pet: Pet
}

export class AdoptAFriendUseCase {
  constructor(
    private adoptersRepository: AdoptersRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    adopterId,
    petId,
  }: AdoptAFriendUseCaseRequest): Promise<AdoptAFriendUseCaseResponse> {
    const adopter = await this.adoptersRepository.findById(adopterId)

    if (!adopter) {
      throw new AdopterNotExistsError()
    }

    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetIdNotExistsError()
    }

    if (pet.adopterId) {
      throw new PetAlreadyAdoptedError()
    }

    const updatedPet = await this.petsRepository.update(petId, {
      adopterId,
    })

    return { pet: updatedPet }
  }
}
