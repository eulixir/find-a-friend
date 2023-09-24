import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './register-pet-use-case'
import { InMemoryPetsRepository } from '@/domain/repositories/in-memory/in-memory-pets-repository'
import { PetFactory } from 'test/factories/pet-factory'

let petsRepository: InMemoryPetsRepository
let petFactory: PetFactory
let sut: RegisterPetUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    petFactory = new PetFactory()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should to register', async () => {
    const petParms = await petFactory.getProps({})

    const { pet } = await sut.execute({
      ...petParms,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
