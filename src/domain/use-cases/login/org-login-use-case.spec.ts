import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/domain/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryOrgsAddressesRepository } from '@/domain/repositories/in-memory/in-memory-orgs-addresses-repository'
import { OrgsFactory } from 'test/factories/orgs-factory'
import { OrgLoginUseCase } from './org-login-use-case'
import { InvalidCredentialsError } from '../@errors/invalidCredentials'

let orgsRepository: InMemoryOrgsRepository
let orgsAddressRepository: InMemoryOrgsAddressesRepository
let orgsFactory: OrgsFactory
let sut: OrgLoginUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    orgsAddressRepository = new InMemoryOrgsAddressesRepository()
    orgsFactory = new OrgsFactory(orgsRepository, orgsAddressRepository)
    sut = new OrgLoginUseCase(orgsRepository)
  })

  it('should be able to make login when email or password matches', async () => {
    const password = 'banana123'
    const { passwordHash, email } = await orgsFactory.insert({ password })

    const { org } = await sut.execute({ email, password })

    expect(org.passwordHash).toEqual(passwordHash)
  })

  it('should not be able to login when email not exist', async () => {
    const params = {
      email: 'nonexisting@email.com',
      password: 'banana123',
    }

    await expect(() => sut.execute(params)).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    )
  })

  it('should not be able to login when password does not match', async () => {
    const { email } = await orgsFactory.insert({
      password: 'banana123',
    })

    await expect(() =>
      sut.execute({
        email,
        password: 'wrong password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
