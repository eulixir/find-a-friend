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

  #generateSpecs(props: PetProps) {
    const possibleSpecies = [
      Species.BIRD,
      Species.CAT,
      Species.DOG,
      Species.SNAKE,
    ]

    const specie =
      possibleSpecies[
        Math.floor(Math.random() * possibleSpecies.length)
      ].toLowerCase()

    switch (specie) {
      case 'cat':
        return {
          name: props.name ?? faker.animal.cat.name,
          species: Species.CAT,
          breed: props.breed ?? faker.animal.cat(),
        }

      case 'dog':
        return {
          name: props.name ?? faker.animal.dog.name,
          species: Species.DOG,
          breed: props.breed ?? faker.animal.dog(),
        }

      case 'bird':
        return {
          name: props.name ?? faker.animal.bird.name,
          species: Species.BIRD,
          breed: props.breed ?? faker.animal.bird(),
        }

      case 'snake':
        return {
          name: props.name ?? faker.animal.snake.name,
          species: Species.SNAKE,
          breed: props.breed ?? faker.animal.snake(),
        }
      default:
        return {
          name: props.name ?? faker.animal.snake.name,
          species: Species.SNAKE,
          breed: props.breed ?? faker.animal.snake(),
        }
    }
  }
}
