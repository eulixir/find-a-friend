import { Adopter, Prisma } from '@prisma/client'

export interface AdoptersRepository {
  create(data: Prisma.AdopterCreateInput): Promise<Adopter>
  findByEmail(email: string): Promise<Adopter | null>
}
