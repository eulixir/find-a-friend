import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterOrgUseCase } from './register-org-use-case'
import { InMemoryOrgsRepository } from '@/domain/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should to register a org', async () => {
    const { org } = await sut.execute({
      addressId: '01',
      email: 'email@email.com',
      name: 'Luiza Honey',
      phoneNumber: '4002-8922',
      pets: [],
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
