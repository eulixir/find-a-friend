import { DomainError } from './domainError'

export class PetAlreadyAdoptedError extends DomainError {
  constructor() {
    super('This pet has already adopted!', 303)
  }
}
