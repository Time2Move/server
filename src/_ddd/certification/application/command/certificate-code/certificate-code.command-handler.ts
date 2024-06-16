import {
  CertificationCodeExpiredType,
  CertificationCodeNotFound,
  CertificationCodeNotFoundType,
} from '@/_ddd/certification/domain/error';
import { CertificateCodeUseCase } from '@/_ddd/certification/domain/port/in/certificate-code.use-case';
import { CertificationRepository } from '@/_ddd/certification/infrastructure/repository/certification-code.repository';
import { AggregateID } from '@/_ddd_shared/ddd/entity.base';
import { DomainException, handleException } from '@/_ddd_shared/exceptions';
import { Result } from '@/_ddd_shared/types';
import { Err, Ok } from '@/_ddd_shared/util/Result';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CertificateCodeCommand } from './certificate-code.command';

@CommandHandler(CertificateCodeCommand)
export class CertificateCodeCommandHandler
  implements ICommandHandler, CertificateCodeUseCase
{
  constructor(
    private readonly ceritficationRepository: CertificationRepository,
  ) {}

  async execute(
    command: CertificateCodeCommand,
  ): Promise<
    Result<
      AggregateID,
      CertificationCodeNotFoundType | CertificationCodeExpiredType
    >
  > {
    try {
      const code = await this.ceritficationRepository.findOneByTargetAndCode({
        ...command,
      });
      if (!code) {
        throw CertificationCodeNotFound('NOT_FOUND');
      }
      code.verify();
      await this.ceritficationRepository.save(code);
      return Ok(code.id);
    } catch (error) {
      if (error instanceof DomainException) {
        return Err(error);
      }
      throw handleException(error as Error);
    }
  }
}
