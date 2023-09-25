import { expect, describe, it, beforeEach } from 'vitest'
import { InsertAddressUseCase } from './insert-address-use-case'
import { InMemoryOrgsAddressesRepository } from '@/domain/repositories/in-memory/in-memory-orgs-addresses-repository'
import { OrgsAddressFactory } from 'test/factories/orgs-address-factory'
import { randomUUID } from 'crypto'

let addressRepository: InMemoryOrgsAddressesRepository
let orgsAddressFactory: OrgsAddressFactory
let sut: InsertAddressUseCase

describe('Insert Address Use Case', () => {
  beforeEach(() => {
    addressRepository = new InMemoryOrgsAddressesRepository()
    orgsAddressFactory = new OrgsAddressFactory()
    sut = new InsertAddressUseCase(addressRepository)
  })

  it('should can insert a new address', async () => {
    const addressProps = await orgsAddressFactory.getProps({})

    const { address } = await sut.execute({
      orgId: randomUUID(),
      ...addressProps,
    })

    expect(address.id).toEqual(expect.any(String))
  })
})
