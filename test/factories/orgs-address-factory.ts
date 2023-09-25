import { faker } from '@faker-js/faker'
import { randomInt } from 'crypto'

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

export class OrgsAddressFactory {
  async getProps(props: OrgAddressProps) {
    return {
      country: props.country ?? faker.location.country(),
      zipCode: props.zipCode ?? faker.location.zipCode(),
      state: props.state ?? faker.location.state(),
      city: props.city ?? faker.location.city(),
      neighborhood: props.neighborhood ?? faker.location.city(),
      street: props.street ?? faker.location.street(),
      number: props.number ?? randomInt(1, 9999).toString(),
      complement: props.complement ?? faker.location.city(),
    }
  }
}
