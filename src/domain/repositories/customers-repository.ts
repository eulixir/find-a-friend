import { Customer, Prisma } from '@prisma/client'

export interface CustomersRepository {
  create(data: Prisma.CustomerCreateInput): Promise<Customer>
  findByEmail(email: string): Promise<Customer | null>
}
