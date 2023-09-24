import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './register-pet-use-case'
import { Species } from '@prisma/client'
import { InMemoryPetsRepository } from '@/domain/repositories/in-memory/in-memory-pets-repository'
import { FindAPetUseCase } from './find-a-pet-use-case'
import { FindNearbyOrgsUseCase } from '../addresses/find-nearby-orgs-use-case'
import { InMemoryOrgsAddressesRepository } from '@/domain/repositories/in-memory/in-memory-orgs-addresses-repository'
import { InMemoryOrgsRepository } from '@/domain/repositories/in-memory/in-memory-orgs-repository'
import { RegisterOrgUseCase } from '../orgs/register-org-use-case'
import { randomUUID } from 'crypto'

let petsRepository: InMemoryPetsRepository
let registerPet: RegisterPetUseCase
let findNearbyOrgs: FindNearbyOrgsUseCase
let registerOrgUseCase: RegisterOrgUseCase
let orgsRepository: InMemoryOrgsRepository
let orgsAddressRepository: InMemoryOrgsAddressesRepository
let sut: FindAPetUseCase

describe('Find a Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    registerPet = new RegisterPetUseCase(petsRepository)
    orgsRepository = new InMemoryOrgsRepository()
    orgsAddressRepository = new InMemoryOrgsAddressesRepository()
    registerOrgUseCase = new RegisterOrgUseCase(
      orgsRepository,
      orgsAddressRepository,
    )
    findNearbyOrgs = new FindNearbyOrgsUseCase(
      orgsAddressRepository,
      orgsRepository,
    )
    sut = new FindAPetUseCase(petsRepository, findNearbyOrgs)
  })

  it('should be able to find a frind when have a match with filters', async () => {
    const cities = [
      'Brasilia',
      'Sobradinho',
      'Aguas Claras',
      'Taguatinga',
      'Planaltina',
      'Gama',
      'Guara',
    ]

    for (const city of cities) {
      await registerOrgUseCase.execute({
        email: `email@${randomUUID()}.com`,
        name: 'Luiza Honey',
        phoneNumber: '4002-8922',
        address: {
          city,
          country: 'Brazil',
          neighborhood: 'Quadra 3',
          state: 'Federal District',
          street: 'Rua das bananas',
          zipCode: '7300000',
        },
      })
    }

    const orgs = orgsRepository.items

    const { id: orgId } = orgs[0]

    const pets = [
      {
        breed: 'German Shepherd',
        orgId,
        species: Species.DOG,
        name: 'Zinga',
        age: 9,
      },
      {
        breed: 'Bengal',
        orgId,
        species: Species.CAT,
        age: 0,
      },
      {
        breed: 'Japanese Bobtail',
        orgId,
        species: Species.CAT,
        name: 'Zinga',
        age: 1,
      },
      {
        breed: 'Nine tails',
        orgId,
        species: Species.FOX,
        name: 'Kyuubi',
        age: 3,
      },
    ]

    for (const pet of pets) {
      await registerPet.execute(pet)
    }

    const filters = { age: 9, breed: 'German Shepherd', specie: Species.DOG }
    const nearbyPets = await sut.execute({
      city: 'Brasilia',
      filters,
    })

    expect(nearbyPets.pets).toHaveLength(1)
  })

  it('should be able to list pets from two distincts orgs', async () => {
    const cities = [
      'Brasilia',
      'Brasilia',
      'Aguas Claras',
      'Taguatinga',
      'Planaltina',
      'Gama',
      'Guara',
    ]

    for (const city of cities) {
      await registerOrgUseCase.execute({
        email: `email@${randomUUID()}.com`,
        name: 'Luiza Honey',
        phoneNumber: '4002-8922',
        address: {
          city,
          country: 'Brazil',
          neighborhood: 'Quadra 3',
          state: 'Federal District',
          street: 'Rua das bananas',
          zipCode: '7300000',
        },
      })
    }

    const orgs = orgsRepository.items

    const { id: orgId1 } = orgs[0]
    const { id: orgId2 } = orgs[1]

    const pets = [
      {
        breed: 'German Shepherd',
        orgId: orgId1,
        species: Species.DOG,
        name: 'Zinga',
        age: 9,
      },
      {
        breed: 'German Shepherd',
        orgId: orgId2,
        species: Species.DOG,
        name: 'Zinga',
        age: 9,
      },
      {
        breed: 'Japanese Bobtail',
        orgId: orgId1,
        species: Species.CAT,
        name: 'Zinga',
        age: 1,
      },
      {
        breed: 'Nine tails',
        orgId: orgId1,
        species: Species.FOX,
        name: 'Kyuubi',
        age: 3,
      },
    ]

    for (const pet of pets) {
      await registerPet.execute(pet)
    }

    const filters = { age: 9, breed: 'German Shepherd', specie: Species.DOG }
    const nearbyPets = await sut.execute({
      city: 'Brasilia',
      filters,
    })

    expect(nearbyPets.pets).toHaveLength(2)
  })
})
