import { DomainError } from './domainError'

export class AdopterNotExistsError extends DomainError {
  constructor() {
    super('Adopter does not exists!', 404)
  }
}
