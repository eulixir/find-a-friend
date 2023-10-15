import { expect, describe, it, beforeEach } from 'vitest'
import { InvalidCredentialsError } from '../@errors/invalidCredentials'
import { AdopterLoginUseCase } from './adopter-login-use-case'
import { AdoptersFactory } from 'test/factories/adopters-factory'
import { InMemoryAdoptersRepository } from '@/domain/repositories/in-memory/in-memory-adopters-repository'

let adoptersRepository: InMemoryAdoptersRepository
let adoptersFactory: AdoptersFactory
let sut: AdopterLoginUseCase

describe('Register Adopter Use Case', () => {
  beforeEach(() => {
    adoptersRepository = new InMemoryAdoptersRepository()
    adoptersFactory = new AdoptersFactory(adoptersRepository)
    sut = new AdopterLoginUseCase(adoptersRepository)
  })

  it('should be able to make login when email or password matches', async () => {
    const password = 'banana123'
    const { passwordHash, email } = await adoptersFactory.insert({ password })

    const { adopter } = await sut.execute({ email, password })

    expect(adopter.passwordHash).toEqual(passwordHash)
  })

  it('should not be able to login when email does not exist', async () => {
    const params = {
      email: 'nonexisting@email.com',
      password: 'banana123',
    }

    await expect(() => sut.execute(params)).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    )
  })

  it('should not be able to login when password does not match', async () => {
    const { email } = await adoptersFactory.insert({
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
