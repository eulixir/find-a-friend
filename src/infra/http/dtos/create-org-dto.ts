import { z } from 'zod'

import { createAddressSchema } from './create-address-dto'

export const createOrgBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  phoneNumber: z.string(),
  name: z.string(),
  address: createAddressSchema,
})
