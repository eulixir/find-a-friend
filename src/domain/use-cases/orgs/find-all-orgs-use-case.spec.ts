import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/domain/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryOrgsAddressesRepository } from '@/domain/repositories/in-memory/in-memory-orgs-addresses-repository'
import { OrgsFactory } from 'test/factories/orgs-factory'
import { FindAllOrgsUseCase } from './find-many-orgs-use-case'

let orgsRepository: InMemoryOrgsRepository
let orgsAddressRepository: InMemoryOrgsAddressesRepository
let orgsFactory: OrgsFactory
let sut: FindAllOrgsUseCase

describe('Find All Orgs Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    orgsAddressRepository = new InMemoryOrgsAddressesRepository()
    orgsFactory = new OrgsFactory(orgsRepository, orgsAddressRepository)
    sut = new FindAllOrgsUseCase(orgsRepository)
  })

  it('should be able to list all orgs', async () => {
    await orgsFactory.insertMany({}, 20)

    const { orgs } = await sut.execute()

    expect(orgs).toHaveLength(20)
  })
})
