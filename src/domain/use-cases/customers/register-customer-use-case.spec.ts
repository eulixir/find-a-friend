import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterCustomerUseCase } from './register-customer-use-case'
import { InMemoryCustomersRepository } from '@/domain/repositories/in-memory/in-memory-customers-repository'
import { CustomersFactory } from 'test/factories/customers-factory'
import { CustomerAlreadyExistsError } from '../@errors/customerAlreadyExists'

let customersRepository: InMemoryCustomersRepository
let customersFactory: CustomersFactory
let sut: RegisterCustomerUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    customersFactory = new CustomersFactory(customersRepository)
    sut = new RegisterCustomerUseCase(customersRepository)
  })

  it('should to be able to register an customer', async () => {
    const customerParams = await customersFactory.getProps({})

    const { customer } = await sut.execute({
      ...customerParams,
    })

    expect(customer.id).toEqual(expect.any(String))
  })

  it('should not able to register new customer when email already exists', async () => {
    await customersFactory.insert({ email: 'example@example' })
    const customerParams = await customersFactory.getProps({
      email: 'example@example',
    })

    await expect(() => sut.execute(customerParams)).rejects.toBeInstanceOf(
      CustomerAlreadyExistsError,
    )
  })
})
