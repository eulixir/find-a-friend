import { z } from 'zod'

export const createPetBodySchema = z.object({
  name: z.string().optional(),
  species: z.enum(['CAT', 'DOG', 'BIRD', 'SNAKE']),
  breed: z.string(),
  orgId: z.string(),
  age: z.number(),
})

const filters = z.object({
  specie: z.enum(['CAT', 'DOG', 'BIRD', 'SNAKE']),
  age: z.number(),
  breed: z.string(),
})

export const findAFriendBodySchema = z.object({
  city: z.string(),
  filters,
})
