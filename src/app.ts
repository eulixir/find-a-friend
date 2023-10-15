import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from '@/env'
import { fastifyJwt } from '@fastify/jwt'
import { appRoutes } from './infra/http/controllers/routes'
import cookie from '@fastify/cookie'
export const app = fastify()

app.register(cookie, {
  secret: 'my-secret', // for cookies signature
  hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  parseOptions: {}, // options for parsing cookies
})

app.register(appRoutes)

app.register(fastifyJwt, {
  secret: 'banana',
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
