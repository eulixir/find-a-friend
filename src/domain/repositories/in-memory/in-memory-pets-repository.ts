import { Pet, Prisma } from '@prisma/client'
import { ObjectId } from 'bson'

import { PetsRepository, UpdateProps } from '../pets-repository'

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

  async update(petId: string, data: UpdateProps) {
    const petIndex = this.items.findIndex((item) => item.id === petId)

    if (petIndex === -1) {
      return null
    }

    const pet = this.items[petIndex]

    this.items[petIndex] = {
      ...pet,
      name: data.name ?? pet.name,
      customerId: data.customerId ?? pet.customerId,
    }

    return this.items[petIndex]
  }
}
