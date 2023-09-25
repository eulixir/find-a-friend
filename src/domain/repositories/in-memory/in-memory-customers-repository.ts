import { Customer, Prisma } from '@prisma/client'
import { ObjectId } from 'bson'

import { CustomersRepository } from '../customers-repository'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async create(data: Prisma.CustomerCreateInput) {
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

  async findByEmail(email: string): Promise<Customer | null> {
    const custmmer = this.items.find((item) => item.email === email)

    if (!custmmer) {
      return null
    }

    return custmmer
  }
}
