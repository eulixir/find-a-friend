import { AdoptersRepository } from '@/domain/repositories/adopters-repository'
import { RegisterAdopterUseCase } from '@/domain/use-cases/adopters/register-adopter-use-case'
import { faker } from '@faker-js/faker'

interface AdopterProps {
  name?: string
  email?: string
  password?: string
}

export class AdoptersFactory {
  constructor(private adoptersRepository: AdoptersRepository) {}

  async insert(props: AdopterProps) {
    const registerAdopterUseCase = new RegisterAdopterUseCase(
      this.adoptersRepository,
    )
    const adopterParams = await this.getProps(props)

    const { adopter } = await registerAdopterUseCase.execute(adopterParams)

    return adopter
  }

  async getProps(props: AdopterProps) {
    return {
      name: props.name ?? faker.person.fullName(),
      email: props.email ?? faker.internet.email(),
      password: props.password ?? faker.internet.password(),
    }
  }

  async insertMany(props: AdopterProps, loops: number) {
    for (let i = 0; i < loops; i++) {
      this.insert(props)
    }
  }
}
