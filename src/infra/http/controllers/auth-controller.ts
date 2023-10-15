import { DomainError } from '@/domain/use-cases/@errors/domainError'
import { OrgLoginUseCase } from '@/domain/use-cases/login/org-login-use-case'
import { PrismaOrgsRepository } from '@/infra/database/repositories/prisma-orgs-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

import { authenticateBodySchema } from '../dtos/authenticate-dto'
import { PrismaAdoptersRepository } from '@/infra/database/repositories/prisma-adopters-repositoryl'
import { AdopterLoginUseCase } from '@/domain/use-cases/login/adopter-login-use-case'
export async function orgLogin(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = authenticateBodySchema.parse(request.body)

  const orgsRepository = new PrismaOrgsRepository()

  try {
    const orgLoginUseCase = new OrgLoginUseCase(orgsRepository)

    const { org } = await orgLoginUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({
      sign: {
        sub: org.id,
      },
    })

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: org.id,
        expiresIn: '7d',
      },
    })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof DomainError) {
      return reply.status(err.status).send({ message: err.message })
    }

    throw err
  }
}

export async function adopterLogin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = authenticateBodySchema.parse(request.body)

  const adoptersRepository = new PrismaAdoptersRepository()

  try {
    const adopterLoginUseCase = new AdopterLoginUseCase(adoptersRepository)

    const { adopter } = await adopterLoginUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({
      sign: {
        sub: adopter.id,
      },
    })

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: adopter.id,
        expiresIn: '7d',
      },
    })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof DomainError) {
      return reply.status(err.status).send({ message: err.message })
    }

    throw err
  }
}
