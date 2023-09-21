import { OrgAlredyExistsError } from '@/domain/use-cases/errors/orgAlreadyExists'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { InsertAddressUseCase } from '../addresses/insert-address-use-case'
import { AddressesRepository } from '@/domain/repositories/addressess-repository'
import { ObjectId } from 'bson'

interface AddressProps {
  country: string
  zipCode: string
  state: string
  city: string
  neighborhood: string
  street: string
  number?: string
  complement?: string
  orgId?: string
  customerId?: string
}

interface RegisterOrgUseCaseRequest {
  email: string
  phoneNumber: string
  name: string
  address: AddressProps
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private addressRepository: AddressesRepository,
  ) {}

  async execute({
    address,
    email,
    name,
    phoneNumber,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const orgWithEmail = await this.orgsRepository.findByEmail(email)

    const orgId = new ObjectId().toString()
    const addressId = new ObjectId().toString()

    const newAddress = new InsertAddressUseCase(this.addressRepository)

    await newAddress.execute({ id: addressId, orgId, ...address })

    if (orgWithEmail) {
      throw new OrgAlredyExistsError()
    }

    const org = await this.orgsRepository.create({
      id: orgId,
      email,
      name,
      phoneNumber,
      addressId,
    })

    return { org }
  }
}
