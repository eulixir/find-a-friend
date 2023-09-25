import { DomainError } from './domainError'

export class CustomerAlreadyExistsError extends DomainError {
  constructor() {
    super('Customer already exists!', 409)
  }
}
