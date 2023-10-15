import { z } from 'zod'

export const createAddressSchema = z.object({
  country: z.string(),
  zipCode: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  number: z.string().optional(),
  complement: z.string().optional(),
})
