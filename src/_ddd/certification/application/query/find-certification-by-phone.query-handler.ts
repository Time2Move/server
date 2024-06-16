import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CertificationRepository } from '../../infrastructure/repository/certification-code.repository';
import { FindCertificationByPhoneQuery } from './find-certification-by-phone.query';

@QueryHandler(FindCertificationByPhoneQuery)
export class FindCertificationByPhoneQueryHandler implements IQueryHandler {
  constructor(
    private readonly certificationRepository: CertificationRepository,
  ) {}

  async execute(): Promise<string> {
    return '';
  }
}
