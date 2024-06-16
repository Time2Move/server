import { CertificateCodeCommand } from '@/_ddd/certification/application/command/certificate-code/certificate-code.command';
import { AggregateID } from '@/_ddd_shared/ddd/entity.base';
import { ArgumentInvalidException } from '@/_ddd_shared/exceptions';
import { Result } from '@/_ddd_shared/types';
import {
  CertificationCodeExpiredType,
  CertificationCodeNotFoundType,
} from '../../error';

export interface CertificateCodeUseCase {
  execute(
    command: CertificateCodeCommand,
  ): Promise<
    Result<
      AggregateID,
      | ArgumentInvalidException
      | CertificationCodeExpiredType
      | CertificationCodeNotFoundType
    >
  >;
}
