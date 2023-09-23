import { expect, describe, it, beforeEach } from 'vitest'
import { InsertAddressUseCase } from './insert-address-use-case'
import { InMemoryOrgsAddressesRepository } from '@/domain/repositories/in-memory/in-memory-orgs-addresses-repository'

let addressRepository: InMemoryOrgsAddressesRepository
let sut: InsertAddressUseCase

describe('Insert Address Use Case', () => {
  beforeEach(() => {
    addressRepository = new InMemoryOrgsAddressesRepository()
    sut = new InsertAddressUseCase(addressRepository)
  })

  it('should to insert a new address', async () => {
    const { address } = await sut.execute({
      city: 'Brasilia',
      country: 'Brazil',
      neighborhood: 'Quadra 3',
      state: 'Federal District',
      street: 'Rua das bananas',
      zipCode: '7300000',
      orgId: 'org-id',
    })

    expect(address.id).toEqual(expect.any(String))
  })
})
