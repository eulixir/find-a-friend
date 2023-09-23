import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterOrgUseCase } from './register-org-use-case'
import { InMemoryOrgsRepository } from '@/domain/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlredyExistsError } from '@/domain/use-cases/errors/orgAlreadyExists'
import { InMemoryOrgsAddressesRepository } from '@/domain/repositories/in-memory/in-memory-orgs-addresses-repository'

let orgsRepository: InMemoryOrgsRepository
let orgsAddressRepository: InMemoryOrgsAddressesRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    orgsAddressRepository = new InMemoryOrgsAddressesRepository()
    sut = new RegisterOrgUseCase(orgsRepository, orgsAddressRepository)
  })

  it('should to register a org', async () => {
    const address = {
      city: 'Brasilia',
      country: 'Brazil',
      neighborhood: 'Quadra 3',
      state: 'Federal District',
      street: 'Rua das bananas',
      zipCode: '7300000',
      orgId: 'org-01',
    }

    const { org } = await sut.execute({
      address,
      email: 'email@email.com',
      name: 'Luiza Honey',
      phoneNumber: '4002-8922',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register when email already registered', async () => {
    const address = {
      city: 'Brasilia',
      country: 'Brazil',
      neighborhood: 'Quadra 3',
      state: 'Federal District',
      street: 'Rua das bananas',
      zipCode: '7300000',
    }

    const data = {
      email: 'email@email.com',
      name: 'Luiza Honey',
      phoneNumber: '4002-8922',

      address,
    }

    await sut.execute(data)

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      OrgAlredyExistsError,
    )
  })
})
