import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/domain/repositories/in-memory/in-memory-pets-repository'
import { PetsFactory } from 'test/factories/pets-factory'
import { AdoptersFactory } from 'test/factories/adopters-factory'
import { InMemoryAdoptersRepository } from '@/domain/repositories/in-memory/in-memory-adopters-repository'
import { AdoptAFriendUseCase } from './adopt-a-friend-use-case'
import { randomUUID } from 'crypto'
import { PetIdNotExistsError } from '../@errors/petIdNotExists'
import { PetAlreadyAdoptedError } from '../@errors/petAlreadyAdopted'
import { AdopterNotExistsError } from '../@errors/adopterNotExists'

let petsRepository: InMemoryPetsRepository
let petsFactory: PetsFactory
let adoptersRepository: InMemoryAdoptersRepository
let adopterFactory: AdoptersFactory

let sut: AdoptAFriendUseCase

describe('Adopt a friend Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    petsFactory = new PetsFactory(petsRepository)
    adoptersRepository = new InMemoryAdoptersRepository()
    adopterFactory = new AdoptersFactory(adoptersRepository)
    sut = new AdoptAFriendUseCase(adoptersRepository, petsRepository)
  })

  it('should be able to adopt a friend', async () => {
    const { id: adopterId } = await adopterFactory.insert({})

    const { id: petId } = await petsFactory.insert({})
    const { pet } = await sut.execute({ adopterId, petId })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.adopterId).toEqual(adopterId)
  })

  it('should not be able to adopt a friend when pet id does not exists', async () => {
    const { id: adopterId } = await adopterFactory.insert({})

    const randomPetId = randomUUID()

    await expect(() =>
      sut.execute({ adopterId, petId: randomPetId }),
    ).rejects.toBeInstanceOf(PetIdNotExistsError)
  })

  it('should not be able to adopt a friend when pet already adopted', async () => {
    const { id: adopterId } = await adopterFactory.insert({})

    const { id: petId } = await petsFactory.insert({})
    await sut.execute({ adopterId, petId })

    await expect(() =>
      sut.execute({ adopterId, petId }),
    ).rejects.toBeInstanceOf(PetAlreadyAdoptedError)
  })

  it('should not be able to adopt a friend when adopter id does not exist', async () => {
    const adopterId = randomUUID()

    const petId = randomUUID()

    await expect(() =>
      sut.execute({ adopterId, petId }),
    ).rejects.toBeInstanceOf(AdopterNotExistsError)
  })
})
