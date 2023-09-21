import { expect, describe, it, beforeEach } from 'vitest'
import { InsertAddressUseCase } from './insert-address-use-case'
import { InMemoryAddressesRepository } from '@/domain/repositories/in-memory/in-memory-addresses-reposiory'

let addressRepository: InMemoryAddressesRepository
let sut: InsertAddressUseCase

describe('Insert Address Use Case', () => {
  beforeEach(() => {
    addressRepository = new InMemoryAddressesRepository()
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
    })

    expect(address.id).toEqual(expect.any(String))
  })
})
