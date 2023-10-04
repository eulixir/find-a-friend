import { DomainError } from './domainError'

export class AdopterAlreadyExistsError extends DomainError {
  constructor() {
    super('Adopter already exists!', 409)
  }
}
