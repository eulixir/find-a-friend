import { OrgAlredyExistsError } from '@/domain/use-cases/@errors/orgAlreadyExists'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { InsertAddressUseCase } from '../addresses/insert-address-use-case'
import { OrgsAddressesRepository } from '@/domain/repositories/orgs-addressess-repository'
import { ObjectId } from 'bson'
import { hash } from 'bcryptjs'

interface OrgAddressProps {
  country: string
  zipCode: string
  state: string
  city: string
  neighborhood: string
  street: string
  number?: string
  complement?: string
}

interface RegisterOrgUseCaseRequest {
  email: string
  phoneNumber: string
  password: string
  name: string
  address: OrgAddressProps
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private addressRepository: OrgsAddressesRepository,
  ) {}

  async execute({
    address,
    email,
    name,
    password,
    phoneNumber,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const orgWithEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithEmail) {
      throw new OrgAlredyExistsError()
    }

    const orgId = new ObjectId().toString()

    const orgAddressId = new ObjectId().toString()

    const newAddress = new InsertAddressUseCase(this.addressRepository)

    await newAddress.execute({
      id: orgAddressId,
      orgId,
      ...address,
    })

    const org = await this.orgsRepository.create({
      id: orgId,
      email,
      name,
      phoneNumber,
      orgAddressId,
      passwordHash,
    })

    return { org }
  }
}
