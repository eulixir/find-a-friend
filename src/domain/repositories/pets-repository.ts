import { Pet, Prisma } from '@prisma/client'
export interface UpdateProps {
  adopterId?: string
  name?: string
}
export interface PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByOrgsIds(ids: string[]): Promise<Pet[]>
  update(petId: string, data: UpdateProps): Promise<Pet>
}
