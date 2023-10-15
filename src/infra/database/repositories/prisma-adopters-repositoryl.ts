import { AdoptersRepository } from '@/domain/repositories/adopters-repository'
import { Adopter, Prisma } from '@prisma/client'
import { prisma } from './prisma'

export class PrismaAdoptersRepository implements AdoptersRepository {
  async create(data: Prisma.AdopterCreateInput): Promise<Adopter> {
    const adopter = prisma.adopter.create({ data })

    return adopter
  }

  async findByEmail(email: string): Promise<Adopter | null> {
    const adopter = prisma.adopter.findUnique({
      where: {
        email,
      },
    })

    if (!adopter) {
      return null
    }

    return adopter
  }

  async findById(id: string): Promise<Adopter | null> {
    const adopter = prisma.adopter.findUnique({
      where: {
        id,
      },
    })

    if (!adopter) {
      return null
    }

    return adopter
  }
}
