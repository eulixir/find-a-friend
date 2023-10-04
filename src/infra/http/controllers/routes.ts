import { FastifyInstance } from 'fastify'
import { orgLogin } from './auth-controller'

export async function appRoutes(app: FastifyInstance) {
  app.register(authRoutes)
}

async function authRoutes(app: FastifyInstance) {
  app.post('/auth/org', orgLogin)
}
