import { DomainError } from '@/domain/use-cases/@errors/domainError'
import { RegisterPetUseCase } from '@/domain/use-cases/pets/register-pet-use-case'
import { PrismaPetsRepository } from '@/infra/database/repositories/prisma-pets-repository '
import { FastifyReply, FastifyRequest } from 'fastify'

import { createPetBodySchema, findAFriendBodySchema } from '../dtos/pet-dto'
import { FindAPetUseCase } from '@/domain/use-cases/pets/find-a-pet-use-case'
import { FindNearbyOrgsUseCase } from '@/domain/use-cases/addresses/find-nearby-orgs-use-case'
import { PrismaAddressRepository } from '@/infra/database/repositories/prisma-address-repository'
import { PrismaOrgsRepository } from '@/infra/database/repositories/prisma-orgs-repository'

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const attrs = createPetBodySchema.parse(request.body)

  const petsRepository = new PrismaPetsRepository()

  try {
    const registerPetCase = new RegisterPetUseCase(petsRepository)

    const pet = await registerPetCase.execute({
      ...attrs,
    })

    return reply.status(201).send(pet)
  } catch (err) {
    if (err instanceof DomainError) {
      return reply.status(err.status).send({ message: err.message })
    }

    throw err
  }
}

export async function findAFriendController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petsRepository = new PrismaPetsRepository()
  const addressRepository = new PrismaAddressRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const findNeasrbyOrgs = new FindNearbyOrgsUseCase(
    addressRepository,
    orgsRepository,
  )
  const attrs = findAFriendBodySchema.parse(request.body)

  try {
    const findAFriend = new FindAPetUseCase(petsRepository, findNeasrbyOrgs)

    const pets = await findAFriend.execute(attrs)

    return reply.status(200).send(pets)
  } catch (err) {
    if (err instanceof DomainError) {
      return reply.status(err.status).send({ message: err.message })
    }

    throw err
  }
}
