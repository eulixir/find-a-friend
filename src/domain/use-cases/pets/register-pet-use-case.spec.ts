import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './register-pet-use-case'
import { InMemoryPetsRepository } from '@/domain/repositories/in-memory/in-memory-pets-repository'
import { PetsFactory } from 'test/factories/pets-factory'

let petsRepository: InMemoryPetsRepository
let petsFactory: PetsFactory
let sut: RegisterPetUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    petsFactory = new PetsFactory()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should to register', async () => {
    const petParms = await petsFactory.getProps({})

    const { pet } = await sut.execute({
      ...petParms,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
