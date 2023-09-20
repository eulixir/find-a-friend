import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './register-pet-use-case'
import { Species } from '@prisma/client'
import { InMemoryPetsRepository } from '@/domain/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should to register', async () => {
    const { pet } = await sut.execute({
      breed: 'German Shepherd',
      orgId: 'org-01',
      species: Species.DOG,
      name: 'Zinga',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
