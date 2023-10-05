import { DomainError } from '@/domain/use-cases/@errors/domainError'
import { RegisterPetUseCase } from '@/domain/use-cases/pets/register-pet-use-case'
import { PrismaPetsRepository } from '@/infra/database/repositories/prisma-pets-repository '
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPetBodySchema = z.object({
    name: z.string().optional(),
    species: z.enum(['CAT', 'DOG', 'BIRD', 'SNAKE']),
    breed: z.string(),
    orgId: z.string(),
    age: z.number(),
  })

  const attrs = createPetBodySchema.parse(request.body)

  const petsRepository = new PrismaPetsRepository()

  try {
    const registerPetCase = new RegisterPetUseCase(petsRepository)

    await registerPetCase.execute({
      ...attrs,
    })
  } catch (err) {
    if (err instanceof DomainError) {
      return reply.status(err.status).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
