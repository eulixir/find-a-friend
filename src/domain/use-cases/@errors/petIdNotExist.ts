import { DomainError } from './domainError'

export class PetIdNotExistError extends DomainError {
  constructor() {
    super('PetId not found', 404)
  }
}
