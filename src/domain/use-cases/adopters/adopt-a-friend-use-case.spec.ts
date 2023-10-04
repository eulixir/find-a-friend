import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/domain/repositories/in-memory/in-memory-pets-repository'
import { PetsFactory } from 'test/factories/pets-factory'
import { AdoptersFactory } from 'test/factories/adopters-factory'
import { InMemoryAdoptersRepository } from '@/domain/repositories/in-memory/in-memory-adopters-repository'
import { AdoptAFriendUseCase } from './adopt-a-friend-use-case'
import { randomUUID } from 'crypto'
import { PetIdNotExistsError } from '../@errors/petIdNotExists'

let petsRepository: InMemoryPetsRepository
let petsFactory: PetsFactory
let adoptersRepository: InMemoryAdoptersRepository
let adopterFactory: AdoptersFactory

let sut: AdoptAFriendUseCase

describe(' Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    petsFactory = new PetsFactory(petsRepository)
    adoptersRepository = new InMemoryAdoptersRepository()
    adopterFactory = new AdoptersFactory(adoptersRepository)
    sut = new AdoptAFriendUseCase(petsRepository)
  })

  it('should be able to find a friend when have a match with filters', async () => {
    const { id: adopterId } = await adopterFactory.insert({})

    const { id: petId } = await petsFactory.insert({})
    const { pet } = await sut.execute({ adopterId, petId })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.adopterId).toEqual(adopterId)
  })

  it('should bot be able to find a friend when pet id does not exists', async () => {
    const { id: adopterId } = await adopterFactory.insert({})

    const randomPetId = randomUUID()

    await expect(() =>
      sut.execute({ adopterId, petId: randomPetId }),
    ).rejects.toBeInstanceOf(PetIdNotExistsError)
  })
})
