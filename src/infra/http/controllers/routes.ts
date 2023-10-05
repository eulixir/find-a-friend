import { FastifyInstance } from 'fastify'
import { orgLogin } from './auth-controller'
import {
  createOrgController,
  getByIdOrgController,
  listAllOrgsController,
} from './orgs-controller'
import { app } from '@/app'
import { createPetController, findAFriendController } from './pets-controller'

export async function appRoutes(app: FastifyInstance) {
  app.register(authRoutes)
  app.register(orgsRoutes)
  app.register(petController)
}

async function petController() {
  app.post('/pet', createPetController)

  app.post('/pet/find-a-friend', findAFriendController)
}
async function authRoutes(app: FastifyInstance) {
  app.post('/auth/org', orgLogin)
}

async function orgsRoutes(app: FastifyInstance) {
  app.post('/org', createOrgController)

  app.get('/org/:id', getByIdOrgController)

  app.get('/org/list-all', listAllOrgsController)
}
