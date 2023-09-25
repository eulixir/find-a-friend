import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsAddressesRepository } from '@/domain/repositories/in-memory/in-memory-orgs-addresses-repository'
import { FindNearbyOrgsUseCase } from './find-nearby-orgs-use-case'
import { InMemoryOrgsRepository } from '@/domain/repositories/in-memory/in-memory-orgs-repository'
import { OrgsFactory } from 'test/factories/orgs-factory'

let orgsAddressRepository: InMemoryOrgsAddressesRepository
let orgsRepository: InMemoryOrgsRepository
let orgsFactory: OrgsFactory
let sut: FindNearbyOrgsUseCase

describe('Find Org Address Use Case', () => {
  beforeEach(() => {
    orgsAddressRepository = new InMemoryOrgsAddressesRepository()
    orgsRepository = new InMemoryOrgsRepository()
    orgsFactory = new OrgsFactory(orgsRepository, orgsAddressRepository)
    sut = new FindNearbyOrgsUseCase(orgsAddressRepository, orgsRepository)
  })

  it('should to able to list orgs from a city', async () => {
    await orgsFactory.insertMany({}, 19)

    await orgsFactory.insert({ address: { city: 'Brasilia' } })
    await orgsFactory.insert({ address: { city: 'Brasilia' } })
    await orgsFactory.insert({ address: { city: 'Brasilia' } })

    const result = await sut.execute({ city: 'Brasilia' })

    expect(result.orgs).toHaveLength(3)
  })

  it('should not to able to return orgs when does not have city for this city', async () => {
    await orgsFactory.insertMany({}, 20)

    const result = await sut.execute({ city: 'Rua das bananas' })

    expect(result.orgs).toHaveLength(0)
  })
})
