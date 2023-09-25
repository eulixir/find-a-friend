import { CustomersRepository } from '@/domain/repositories/customers-repository'
import { RegisterCustomerUseCase } from '@/domain/use-cases/customers/register-customer-use-case'
import { faker } from '@faker-js/faker'

interface CustomerProps {
  name?: string
  email?: string
  password?: string
}

export class CustomersFactory {
  constructor(private customersRepository: CustomersRepository) {}

  async insert(props: CustomerProps) {
    const registerPetUseCase = new RegisterCustomerUseCase(
      this.customersRepository,
    )
    const customerParams = await this.getProps(props)

    const { customer } = await registerPetUseCase.execute(customerParams)

    return customer
  }

  async getProps(props: CustomerProps) {
    return {
      name: props.name ?? faker.person.fullName(),
      email: props.email ?? faker.internet.email(),
      password: props.password ?? faker.internet.password(),
    }
  }

  async insertMany(props: CustomerProps, loops: number) {
    for (let i = 0; i < loops; i++) {
      this.insert(props)
    }
  }
}
