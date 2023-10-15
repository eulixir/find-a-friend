import { FastifyInstance } from 'fastify'
import { adopterLogin, orgLogin } from './auth-controller'
import {
  createOrgController,
  getByIdOrgController,
  listAllOrgsController,
} from './orgs-controller'
import { app } from '@/app'
import { createPetController, findAFriendController } from './pets-controller'
import {
  adoptAFriendController,
  createAdopterController,
  findByEmailController,
} from './adopter-controller'

export async function appRoutes(app: FastifyInstance) {
  app.register(authRoutes)
  app.register(orgsRoutes)
  app.register(petRoutes)
  app.register(adopterRoutes)
}

async function petRoutes() {
  app.post('/pet', createPetController)

  app.post('/pet/find-a-friend', findAFriendController)
}

async function authRoutes(app: FastifyInstance) {
  app.post('/auth/org', orgLogin)
  app.post('/auth/adopter', adopterLogin)
}

async function orgsRoutes(app: FastifyInstance) {
  app.post('/org', createOrgController)
  app.get('/org/:id', getByIdOrgController)
  app.get('/org/list-all', listAllOrgsController)
}

async function adopterRoutes(app: FastifyInstance) {
  app.post('/adopter/create', createAdopterController)
  app.post('/adopter/adopt-a-friend', adoptAFriendController)
  app.get('/adopter/find-by-email', findByEmailController)
}
