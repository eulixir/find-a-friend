import { z } from 'zod'

export const createAdopterBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
})

export const validateEmail = z.object({ email: z.string().email() })

export const adoptAFiendBodySchema = z.object({
  petId: z.string(),
  adopterId: z.string(),
})
