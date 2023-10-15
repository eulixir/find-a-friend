import { expect, describe, it, beforeEach } from 'vitest'
import { AdoptersFactory } from 'test/factories/adopters-factory'
import { InMemoryAdoptersRepository } from '@/domain/repositories/in-memory/in-memory-adopters-repository'
import { FindAdopterByEmailUseCase } from './find-by-email-use-case'
import { AdopterNotExistsError } from '../@errors/adopterNotExists'

let adoptersRepository: InMemoryAdoptersRepository
let adoptersFactory: AdoptersFactory

let sut: FindAdopterByEmailUseCase

describe('Find by Email Use Case', () => {
  beforeEach(() => {
    adoptersRepository = new InMemoryAdoptersRepository()
    adoptersFactory = new AdoptersFactory(adoptersRepository)
    sut = new FindAdopterByEmailUseCase(adoptersRepository)
  })

  it('should be able find an adpter by email', async () => {
    const { email } = await adoptersFactory.insert({})

    const { adopter } = await sut.execute(email)

    expect(adopter.id).toEqual(expect.any(String))
  })

  it('should not be able find an adpter by email when they not exists', async () => {
    await expect(() => sut.execute('wrong@email.com')).rejects.toBeInstanceOf(
      AdopterNotExistsError,
    )
  })
})
