import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/domain/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryOrgsAddressesRepository } from '@/domain/repositories/in-memory/in-memory-orgs-addresses-repository'
import { OrgsFactory } from 'test/factories/orgs-factory'
import { FindOrgUseCase } from './find-org-use-case'
import { OrgNotFoundError } from '../@errors/orgNotFound'

let orgsRepository: InMemoryOrgsRepository
let orgsAddressRepository: InMemoryOrgsAddressesRepository
let orgsFactory: OrgsFactory
let sut: FindOrgUseCase

describe('Find Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    orgsAddressRepository = new InMemoryOrgsAddressesRepository()
    orgsFactory = new OrgsFactory(orgsRepository, orgsAddressRepository)
    sut = new FindOrgUseCase(orgsRepository)
  })

  it('should to find and org by id', async () => {
    const { id } = await orgsFactory.insert({})

    const { org } = await sut.execute(id)

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register when email already registered', async () => {
    await expect(() => sut.execute('invalid id')).rejects.toBeInstanceOf(
      OrgNotFoundError,
    )
  })
})
