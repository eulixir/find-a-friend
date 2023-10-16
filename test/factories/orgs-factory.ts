import { faker } from '@faker-js/faker'
import { OrgsAddressFactory } from './orgs-address-factory'
import { OrgsAddressesRepository } from '@/domain/repositories/orgs-addressess-repository'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { RegisterOrgUseCase } from '@/domain/use-cases/orgs/register-org-use-case'

interface OrgAddressProps {
  country?: string
  zipCode?: string
  state?: string
  city?: string
  neighborhood?: string
  street?: string
  number?: string
  complement?: string
}

interface OrgProps {
  email?: string
  password?: string
  phoneNumber?: string
  name?: string
  address?: OrgAddressProps
}

export class OrgsFactory {
  constructor(
    private orgsRepository: OrgsRepository,
    private addressesRepository: OrgsAddressesRepository,
  ) {}

  async insert(props: OrgProps) {
    const registerOrgUseCase = new RegisterOrgUseCase(
      this.orgsRepository,
      this.addressesRepository,
    )
    const orgParams = await this.getProps(props)

    const { org } = await registerOrgUseCase.execute(orgParams)

    return org
  }

  async getProps(props: OrgProps) {
    const addressFactory = new OrgsAddressFactory()

    const orgProps = {
      email: props.email ?? faker.internet.email(),
      password: props.password ?? faker.internet.password(),
      phoneNumber: props.phoneNumber ?? faker.phone.number(),
      name: props.name ?? faker.company.name(),
      address: await addressFactory.getProps(props.address ?? {}),
    }

    return orgProps
  }

  async insertMany(props: OrgProps, loops: number) {
    for (let i = 0; i < loops; i++) {
      await this.insert(props)
    }
  }
}
