import { PetsRepository } from '@/domain/repositories/pets-repository'
import { RegisterPetUseCase } from '@/domain/use-cases/pets/register-pet-use-case'
import { faker } from '@faker-js/faker'
import { Species } from '@prisma/client'
import { randomInt, randomUUID } from 'crypto'

interface PetProps {
  name?: string
  species?: Species
  breed?: string
  orgId?: string
  age?: number
}

export class PetsFactory {
  constructor(private petsRepositoru: PetsRepository) {}

  async insert(props: PetProps) {
    const registerPetUseCase = new RegisterPetUseCase(this.petsRepositoru)
    const petParams = await this.getProps(props)

    const { pet } = await registerPetUseCase.execute(petParams)

    return pet
  }

  async getProps(props: PetProps) {
    const { breed, name, species } = this.#generateSpecs(props)

    return {
      name,
      species,
      breed,
      orgId: props.orgId ?? randomUUID(),
      age: props.age ?? randomInt(1, 15),
    }
  }

  async insertMany(props: PetProps, loops: number) {
    for (let i = 0; i < loops; i++) {
      this.insert(props)
    }
  }

  #generateSpecs(props: PetProps) {
    const possibleSpecies = [
      Species.BIRD,
      Species.CAT,
      Species.DOG,
      Species.SNAKE,
    ]

    const specie =
      props.species ??
      possibleSpecies[Math.floor(Math.random() * possibleSpecies.length)]

    switch (specie.toLowerCase()) {
      case 'cat':
        return {
          name: props.name ?? faker.animal.cat.name,
          species: specie,
          breed: props.breed ?? faker.animal.cat(),
        }

      case 'dog':
        return {
          name: props.name ?? faker.animal.dog.name,
          species: specie,
          breed: props.breed ?? faker.animal.dog(),
        }

      case 'bird':
        return {
          name: props.name ?? faker.animal.bird.name,
          species: specie,
          breed: props.breed ?? faker.animal.bird(),
        }

      case 'snake':
        return {
          name: props.name ?? faker.animal.snake.name,
          species: specie,
          breed: props.breed ?? faker.animal.snake(),
        }
      default:
        return {
          name: props.name ?? faker.animal.snake.name,
          species: specie,
          breed: props.breed ?? faker.animal.snake(),
        }
    }
  }
}
