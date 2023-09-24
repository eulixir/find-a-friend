import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterOrgUseCase } from './register-org-use-case'
import { InMemoryOrgsRepository } from '@/domain/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlredyExistsError } from '@/domain/use-cases/errors/orgAlreadyExists'
import { InMemoryOrgsAddressesRepository } from '@/domain/repositories/in-memory/in-memory-orgs-addresses-repository'
import { OrgFactory } from 'test/factories/org-factory'

let orgsRepository: InMemoryOrgsRepository
let orgsAddressRepository: InMemoryOrgsAddressesRepository
let orgFactory: OrgFactory
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    orgsAddressRepository = new InMemoryOrgsAddressesRepository()
    orgFactory = new OrgFactory(orgsRepository, orgsAddressRepository, sut)
    sut = new RegisterOrgUseCase(orgsRepository, orgsAddressRepository)
  })

  it('should to register a org', async () => {
    const orgParams = await orgFactory.getProps({})

    const { org } = await sut.execute(orgParams)

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register when email already registered', async () => {
    const orgParams = await orgFactory.getProps({ email: 'email@email.com' })

    await sut.execute(orgParams)

    await expect(() => sut.execute(orgParams)).rejects.toBeInstanceOf(
      OrgAlredyExistsError,
    )
  })
})
