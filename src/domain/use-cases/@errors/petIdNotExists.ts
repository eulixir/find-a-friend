import { DomainError } from './domainError'

export class PetIdNotExistsError extends DomainError {
  constructor() {
    super('PetId not found', 404)
  }
}
