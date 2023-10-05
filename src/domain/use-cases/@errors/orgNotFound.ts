import { DomainError } from './domainError'

export class OrgNotFoundError extends DomainError {
  constructor() {
    super('The org id does not exist', 404)
  }
}
