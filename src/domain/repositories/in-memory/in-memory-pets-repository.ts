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
      adopterId: data.adopterId ?? null,
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

    const pet = this.items[petIndex]

    this.items[petIndex] = {
      ...pet,
      name: data.name ?? pet.name,
      adopterId: data.adopterId ?? pet.adopterId,
    }

    return this.items[petIndex]
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
