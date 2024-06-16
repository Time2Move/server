import { RequestCodeCommand } from '@/_ddd/certification/application/command/request-code/request-code.command';
import { AggregateID } from '@/_ddd_shared/ddd/entity.base';
import { ArgumentInvalidException } from '@/_ddd_shared/exceptions';
import { Result } from '@/_ddd_shared/types';
import { CertificationLimitExceededType } from '../../error';

export interface RequestCodeUseCase {
  execute(
    input: RequestCodeCommand,
  ): Promise<
    Result<
      AggregateID,
      ArgumentInvalidException | CertificationLimitExceededType
    >
  >;
}
