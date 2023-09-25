import { DomainError } from './domainError'

export class OrgAlredyExistsError extends DomainError {
  constructor() {
    super('Org already exists!', 409)
  }
}
