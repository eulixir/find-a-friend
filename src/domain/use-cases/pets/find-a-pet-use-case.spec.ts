import { expect, describe, it, beforeEach } from 'vitest'
import { Species } from '@prisma/client'
import { InMemoryPetsRepository } from '@/domain/repositories/in-memory/in-memory-pets-repository'
import { FindAPetUseCase } from './find-a-pet-use-case'
import { FindNearbyOrgsUseCase } from '../addresses/find-nearby-orgs-use-case'
import { InMemoryOrgsAddressesRepository } from '@/domain/repositories/in-memory/in-memory-orgs-addresses-repository'
import { InMemoryOrgsRepository } from '@/domain/repositories/in-memory/in-memory-orgs-repository'
import { OrgsFactory } from 'test/factories/orgs-factory'
import { PetsFactory } from 'test/factories/pets-factory'

let petsRepository: InMemoryPetsRepository
let findNearbyOrgs: FindNearbyOrgsUseCase
let orgsRepository: InMemoryOrgsRepository
let petsFactory: PetsFactory
let orgsAddressRepository: InMemoryOrgsAddressesRepository
let orgsFactory: OrgsFactory

let sut: FindAPetUseCase

describe('Find a Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    orgsAddressRepository = new InMemoryOrgsAddressesRepository()
    orgsFactory = new OrgsFactory(orgsRepository, orgsAddressRepository)
    petsFactory = new PetsFactory(petsRepository)
    findNearbyOrgs = new FindNearbyOrgsUseCase(
      orgsAddressRepository,
      orgsRepository,
    )
    sut = new FindAPetUseCase(petsRepository, findNearbyOrgs)
  })

  it('should be able to find a frind when have a match with filters', async () => {
    await orgsFactory.insertMany({}, 20)

    const { id: orgId } = await orgsFactory.insert({
      address: { city: 'Brasilia' },
    })

    await petsFactory.insertMany({ orgId }, 20)

    await petsFactory.insert({
      age: 9,
      orgId,
      breed: 'German Shepherd',
      species: Species.DOG,
    })

    const filters = { age: 9, breed: 'German Shepherd', specie: Species.DOG }
    const nearbyPets = await sut.execute({
      city: 'Brasilia',
      filters,
    })

    expect(nearbyPets.pets).toHaveLength(1)
  })

  it('should be able to list pets from two distincts orgs', async () => {
    await orgsFactory.insertMany({}, 20)

    const { id: orgId } = await orgsFactory.insert({
      address: { city: 'Brasilia' },
    })

    const { id: orgId2 } = await orgsFactory.insert({
      address: { city: 'Brasilia' },
    })

    await petsFactory.insertMany({ orgId }, 20)

    await petsFactory.insert({
      age: 9,
      orgId,
      breed: 'German Shepherd',
      species: Species.DOG,
    })

    await petsFactory.insert({
      age: 9,
      orgId: orgId2,
      breed: 'German Shepherd',
      species: Species.DOG,
    })

    const filters = { age: 9, breed: 'German Shepherd', specie: Species.DOG }
    const nearbyPets = await sut.execute({
      city: 'Brasilia',
      filters,
    })

    expect(nearbyPets.pets).toHaveLength(2)
  })

  it('should not be able to list pets when in not close', async () => {
    await orgsFactory.insertMany({}, 20)

    await petsFactory.insertMany({}, 20)

    const filters = { age: 9, breed: 'German Shepherd', specie: Species.DOG }
    const nearbyPets = await sut.execute({
      city: 'Brasilia',
      filters,
    })

    expect(nearbyPets.pets).toHaveLength(0)
  })

  it('should not be able to list pets when filter does not match', async () => {
    await orgsFactory.insertMany({ address: { city: 'Brasilia' } }, 20)

    await orgsFactory.insert({ address: { city: 'Brasilia' } })

    const filters = { age: 10, breed: 'German Shepherd', specie: Species.DOG }
    const nearbyPets = await sut.execute({
      city: 'Brasilia',
      filters,
    })

    expect(nearbyPets.pets).toHaveLength(0)
  })
})
