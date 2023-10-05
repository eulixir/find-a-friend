import { DomainError } from '@/domain/use-cases/@errors/domainError'
import { RegisterOrgUseCase } from '@/domain/use-cases/orgs/register-org-use-case'
import { PrismaAddressRepository } from '@/infra/database/repositories/prisma-address-repository'
import { PrismaOrgsRepository } from '@/infra/database/repositories/prisma-orgs-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { createOrgBodySchema } from '../dtos/create-org-dto'
import { z } from 'zod'
import { FindOrgUseCase } from '@/domain/use-cases/orgs/find-org-use-case'
import { FindAllOrgsUseCase } from '@/domain/use-cases/orgs/find-many-orgs-use-case'

export async function createOrgController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const attrs = createOrgBodySchema.parse(request.body)

  const orgsRepository = new PrismaOrgsRepository()
  const addressRepository = new PrismaAddressRepository()

  try {
    const registerOrgUseCase = new RegisterOrgUseCase(
      orgsRepository,
      addressRepository,
    )

    const register = await registerOrgUseCase.execute({
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

export async function getByIdOrgController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getByIdOrgSchema = z.object({
    id: z.string(),
  })

  const { id } = getByIdOrgSchema.parse(request.params)

  const orgRepository = new PrismaOrgsRepository()

  try {
    const findByIdOrgUseCase = new FindOrgUseCase(orgRepository)

    const { org } = await findByIdOrgUseCase.execute(id)
    const { email, name } = org

    return reply.status(200).send({ id, email, name })
  } catch (err) {
    if (err instanceof DomainError) {
      return reply.status(err.status).send({ message: err.message })
    }

    throw err
  }
}

export async function listAllOrgsController(
  _: FastifyRequest,
  reply: FastifyReply,
) {
  const orgRepository = new PrismaOrgsRepository()

  const findAllOrgs = new FindAllOrgsUseCase(orgRepository)

  const { orgs } = await findAllOrgs.execute()

  return reply.status(200).send({ orgs })
}
