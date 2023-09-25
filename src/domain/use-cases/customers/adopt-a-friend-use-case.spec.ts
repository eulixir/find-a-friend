import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/domain/repositories/in-memory/in-memory-pets-repository'
import { PetsFactory } from 'test/factories/pets-factory'
import { CustomersFactory } from 'test/factories/customers-factory'
import { InMemoryCustomersRepository } from '@/domain/repositories/in-memory/in-memory-customers-repository'
import { AdoptAFriendUseCase } from './adopt-a-friend-use-case'
import { randomUUID } from 'crypto'
import { PetIdNotExistError } from '../@errors/petIdNotExist'

let petsRepository: InMemoryPetsRepository
let petsFactory: PetsFactory
let customersRepository: InMemoryCustomersRepository
let customerFactory: CustomersFactory

let sut: AdoptAFriendUseCase

describe(' Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    petsFactory = new PetsFactory(petsRepository)
    customersRepository = new InMemoryCustomersRepository()
    customerFactory = new CustomersFactory(customersRepository)
    sut = new AdoptAFriendUseCase(petsRepository)
  })

  it('should be able to find a friend when have a match with filters', async () => {
    const { id: customerId } = await customerFactory.insert({})

    const { id: petId } = await petsFactory.insert({})
    const { pet } = await sut.execute({ customerId, petId })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.customerId).toEqual(customerId)
  })

  it('should bot be able to find a friend when pet id does not exist', async () => {
    const { id: customerId } = await customerFactory.insert({})

    const randomPetId = randomUUID()

    await expect(() =>
      sut.execute({ customerId, petId: randomPetId }),
    ).rejects.toBeInstanceOf(PetIdNotExistError)
  })
})
