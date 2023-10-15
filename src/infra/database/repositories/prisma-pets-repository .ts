import { Pet, Prisma } from '@prisma/client'
import { prisma } from './prisma'
import {
  PetsRepository,
  UpdateProps,
} from '@/domain/repositories/pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findManyByOrgsIds(ids: string[]): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        orgId: { in: ids },
        adopterId: { isSet: false },
      },
    })

    return pets
  }

  async update(petId: string, data: UpdateProps): Promise<Pet | null> {
    const foundPet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })

    if (!foundPet) {
      return null
    }

    const updatedPet = await prisma.pet.update({
      where: {
        id: petId,
      },
      data,
    })

    return updatedPet
  }
}
