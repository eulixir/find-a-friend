import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsAddressesRepository } from '@/domain/repositories/in-memory/in-memory-orgs-addresses-repository'
import { FindNearbyOrgsUseCase } from './find-nearby-orgs-use-case'
import { InMemoryOrgsRepository } from '@/domain/repositories/in-memory/in-memory-orgs-repository'
import { RegisterOrgUseCase } from '../orgs/register-org-use-case'

let orgsAddressRepository: InMemoryOrgsAddressesRepository
let orgsRepository: InMemoryOrgsRepository
let registerOrgUseCase: RegisterOrgUseCase
let sut: FindNearbyOrgsUseCase

describe('Find Org Address Use Case', () => {
  beforeEach(() => {
    orgsAddressRepository = new InMemoryOrgsAddressesRepository()
    orgsRepository = new InMemoryOrgsRepository()
    registerOrgUseCase = new RegisterOrgUseCase(
      orgsRepository,
      orgsAddressRepository,
    )
    sut = new FindNearbyOrgsUseCase(orgsAddressRepository, orgsRepository)
  })

  it('should to able to list orgs from a city', async () => {
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
        email: `email@${city}.com`,
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

    const result = await sut.execute({ city: 'Brasilia' })

    expect(result.orgs).toHaveLength(1)
  })

  it('should not to able to return orgs when does not have city for this city', async () => {
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
        email: `email@${city}.com`,
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

    const result = await sut.execute({ city: 'Rua das bananas' })

    expect(result.orgs).toHaveLength(0)
  })
})
