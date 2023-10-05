import { DomainError } from '@/domain/use-cases/@errors/domainError'
import { OrgLoginUseCase } from '@/domain/use-cases/login/org-login-use-case'
import { PrismaOrgsRepository } from '@/infra/database/repositories/prisma-orgs-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'
export async function orgLogin(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = authenticateSchema(request)

  const orgsRepository = new PrismaOrgsRepository()

  try {
    const orgLoginUseCase = new OrgLoginUseCase(orgsRepository)

    await orgLoginUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof DomainError) {
      return reply.status(err.status).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}

function authenticateSchema(request: FastifyRequest) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  return authenticateBodySchema.parse(request.body)
}
