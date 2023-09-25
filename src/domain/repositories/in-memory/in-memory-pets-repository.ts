import { Pet, Prisma } from '@prisma/client'
import { ObjectId } from 'bson'

import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetCreateInput) {
    const pet = {
      id: new ObjectId().toString(),
      name: data.name ?? null,
      breed: data.breed,
      orgId: data.orgId,
      age: data.age,
      customerId: data.customerId ?? null,
      species: data.species,
      createdAt: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findManyByOrgsIds(ids: string[]) {
    const pets = this.items.filter((pet) => ids.includes(pet.orgId))

    return pets
  }
}
