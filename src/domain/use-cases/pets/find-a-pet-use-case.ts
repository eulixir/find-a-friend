import { Pet, Species } from '@prisma/client'
import { FindNearbyOrgsUseCase } from '../addresses/find-nearby-orgs-use-case'
import { PetsRepository } from '@/domain/repositories/pets-repository'

interface Filters {
  specie: Species
  age: number
  breed: string
}

interface FindAPetUseCaseRequest {
  city: string
  filters: Filters
}

interface FindAPetUseCaseResponse {
  pets: Pet[]
}

export class FindAPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private findNearbyOrgsUseCase: FindNearbyOrgsUseCase,
  ) {}

  async execute({
    city,
    filters,
  }: FindAPetUseCaseRequest): Promise<FindAPetUseCaseResponse> {
    const { orgs } = await this.findNearbyOrgsUseCase.execute({ city })

    const orgsId = orgs.map((org) => org.id)

    const nearbyPets = await this.petsRepository.findManyByOrgsIds(orgsId)

    console.log(nearbyPets)

    const pets = await this.#filterPets(nearbyPets, filters)

    return { pets }
  }

  async #filterPets(pets: Pet[], filters: Filters) {
    return pets.filter(
      (pet) =>
        pet.species === filters.specie &&
        pet.age <= filters.age &&
        pet.breed === filters.breed,
    )
  }
}
