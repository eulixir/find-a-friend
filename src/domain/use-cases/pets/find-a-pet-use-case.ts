// import { OrgsRepository } from '@/domain/repositories/orgs-repository'

// import { Pet, Species } from '@prisma/client'

// interface Filters {
//   specie: Species
//   age: number
//   breed: string
// }

// interface FindAPetUseCaseRequest {
//   city: string
//   filters: Filters
// }

// interface FindAPetUseCaseResponse {
//   pet: Pet
// }

// export class FindAPetUseCase {
//   constructor(private orgsRepository: OrgsRepository) {}

//   async execute({
//     city,
//     filters,
//   }: FindAPetUseCaseRequest): Promise<FindAPetUseCaseResponse> {
//     // listar organizações com a cidade igual a do input

//     const orgs = await this.orgsRepository.filterOrgByAddress(city)

//     return { pet }
//   }
// }
