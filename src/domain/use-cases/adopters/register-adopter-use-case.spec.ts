import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterAdopterUseCase } from './register-adopter-use-case'
import { InMemoryAdoptersRepository } from '@/domain/repositories/in-memory/in-memory-adopters-repository'
import { AdoptersFactory } from 'test/factories/adopters-factory'
import { AdopterAlreadyExistsError } from '../@errors/adopterAlreadyExists'

let adoptersRepository: InMemoryAdoptersRepository
let adoptersFactory: AdoptersFactory
let sut: RegisterAdopterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    adoptersRepository = new InMemoryAdoptersRepository()
    adoptersFactory = new AdoptersFactory(adoptersRepository)
    sut = new RegisterAdopterUseCase(adoptersRepository)
  })

  it('should to be able to register an adopter', async () => {
    const adopterParams = await adoptersFactory.getProps({})

    const { adopter } = await sut.execute({
      ...adopterParams,
    })

    expect(adopter.id).toEqual(expect.any(String))
  })

  it('should not able to register new adopter when email already exists', async () => {
    await adoptersFactory.insert({ email: 'example@example' })
    const adopterParams = await adoptersFactory.getProps({
      email: 'example@example',
    })

    await expect(() => sut.execute(adopterParams)).rejects.toBeInstanceOf(
      AdopterAlreadyExistsError,
    )
  })
})
