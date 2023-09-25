import { CustomersRepository } from '@/domain/repositories/customers-repository'
import { hash } from 'bcryptjs'
import { CustomerAlreadyExistsError } from '../errors/customerAlreadyExists'

interface RegisterCustomerUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterCustomerUseCaseResponse {
  customer: {
    id: string
    name: string
    email: string
    createdAt: Date
  }
}

export class RegisterCustomerUseCase {
  constructor(private customerRepository: CustomersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterCustomerUseCaseRequest): Promise<RegisterCustomerUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const hasCustomer = await this.customerRepository.findByEmail(email)

    if (hasCustomer) {
      throw new CustomerAlreadyExistsError()
    }

    const customer = await this.customerRepository.create({
      passwordHash,
      email,
      name,
    })

    return { customer }
  }
}
