import { DomainError } from '@/domain/use-cases/@errors/domainError'
import { FastifyRequest, FastifyReply } from 'fastify'
import {
  adoptAFiendBodySchema,
  createAdopterBodySchema,
  validateEmail,
} from '../dtos/adopter-dto'
import { PrismaAdoptersRepository } from '@/infra/database/repositories/prisma-adopters-repositoryl'
import { RegisterAdopterUseCase } from '@/domain/use-cases/adopters/register-adopter-use-case'
import { FindAdopterByEmailUseCase } from '@/domain/use-cases/adopters/find-by-email-use-case'
import { AdoptAFriendUseCase } from '@/domain/use-cases/adopters/adopt-a-friend-use-case'
import { PrismaPetsRepository } from '@/infra/database/repositories/prisma-pets-repository '

export async function createAdopterController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const attrs = createAdopterBodySchema.parse(request.body)

  const adoptersRepository = new PrismaAdoptersRepository()

  try {
    const registerAdopterUseCase = new RegisterAdopterUseCase(
      adoptersRepository,
    )

    const register = await registerAdopterUseCase.execute({
      ...attrs,
    })

    return reply.status(200).send(register)
  } catch (err) {
    if (err instanceof DomainError) {
      return reply.status(err.status).send({ message: err.message })
    }

    throw err
  }
}

export async function findByEmailController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email } = validateEmail.parse(request.query)

  const adoptersRepository = new PrismaAdoptersRepository()

  try {
    const findAdopterByEmail = new FindAdopterByEmailUseCase(adoptersRepository)

    const register = await findAdopterByEmail.execute(email)

    return reply.status(200).send(register)
  } catch (err) {
    if (err instanceof DomainError) {
      return reply.status(err.status).send({ message: err.message })
    }

    throw err
  }
}

export async function adoptAFriendController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const attrs = adoptAFiendBodySchema.parse(request.body)

  const petsRepository = new PrismaPetsRepository()
  const adoptersRepository = new PrismaAdoptersRepository()

  try {
    const adoptAFriend = new AdoptAFriendUseCase(
      adoptersRepository,
      petsRepository,
    )

    const register = await adoptAFriend.execute(attrs)

    return reply.status(200).send(register)
  } catch (err) {
    if (err instanceof DomainError) {
      return reply.status(err.status).send({ message: err.message })
    }

    throw err
  }
}
