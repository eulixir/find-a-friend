import { faker } from '@faker-js/faker'
import { OrgAddressFactory } from './org-address-factory'
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
  phoneNumber?: string
  name?: string
  address?: OrgAddressProps
}

export class OrgFactory {
  constructor(
    private orgsRepository: OrgsRepository,
    private addressesRepository: OrgsAddressesRepository,
    private registerOrgUseCase: RegisterOrgUseCase,
  ) {}

  async insert(props: OrgProps) {
    this.registerOrgUseCase = new RegisterOrgUseCase(
      this.orgsRepository,
      this.addressesRepository,
    )
    const orgParams = await this.getProps(props)

    const { org } = await this.registerOrgUseCase.execute(orgParams)

    return org
  }

  async getProps(props: OrgProps) {
    const addressFactory = new OrgAddressFactory()

    const orgProps = {
      email: props.email ?? faker.internet.email(),
      phoneNumber: props.phoneNumber ?? faker.phone.number(),
      name: props.name ?? faker.company.name(),
      address: await addressFactory.getProps(props.address ?? {}),
    }

    return orgProps
  }
}
