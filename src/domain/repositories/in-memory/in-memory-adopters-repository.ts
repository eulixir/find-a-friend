import { Adopter, Prisma } from '@prisma/client'
import { ObjectId } from 'bson'

import { AdoptersRepository } from '../adopters-repository'

export class InMemoryAdoptersRepository implements AdoptersRepository {
  public items: Adopter[] = []

  async create(data: Prisma.AdopterCreateInput) {
    const pet = {
      id: new ObjectId().toString(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findByEmail(email: string): Promise<Adopter | null> {
    const adopter = this.items.find((item) => item.email === email)

    if (!adopter) {
      return null
    }

    return adopter
  }
}
