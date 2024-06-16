import { CertificationCodeEntity } from '@/_ddd/certification/domain/entity/certification-code.root-entity';
import {
  CertificationException,
  CertificationLimitExceeded,
  CertificationLimitExceededType,
} from '@/_ddd/certification/domain/error';
import { RequestCodeUseCase } from '@/_ddd/certification/domain/port/in/request-code.use-case';
import { CertificationRepository } from '@/_ddd/certification/infrastructure/repository/certification-code.repository';
import { AggregateID } from '@/_ddd_shared/ddd/entity.base';
import {
  ArgumentInvalidException,
  handleException,
} from '@/_ddd_shared/exceptions';
import { Result } from '@/_ddd_shared/types';
import { Err, Ok } from '@/_ddd_shared/util/Result';
import { PrismaService } from '@common/prisma/prisma.service';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RequestCodeCommand } from './request-code.command';

@CommandHandler(RequestCodeCommand)
export class RequestCodeCommandHandler
  implements ICommandHandler, RequestCodeUseCase
{
  private logger = new Logger(RequestCodeCommandHandler.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly certificationRepository: CertificationRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: RequestCodeCommand,
  ): Promise<
    Result<
      AggregateID,
      ArgumentInvalidException | CertificationLimitExceededType
    >
  > {
    try {
      return await this.prisma.$transaction(async (tx) => {
        //TODO: type이 signup인경우 해당 정보를 사용하고있는 유저가 있는지 확인 필요 - User 도메인과 소통

        // 새로운 인증코드 생성
        const code = CertificationCodeEntity.create({
          type: command.type,
          target: command.target,
          targetType: command.targetType,
        });
        const target = code.getProps().target;
        const exist = await this.certificationRepository.findManyByTarget(
          target,
          tx,
        );
        if (exist.length > 5) {
          throw CertificationLimitExceeded(
            'LIMIT_EXCEEDED',
            '인증 횟수 초과',
            exist,
          );
        }
        // 기존 인증코드 만료처리
        await Promise.all([
          ...exist.map(async (code) => {
            code.expire();
            await this.certificationRepository.save(code, tx);
          }),
        ]);
        await this.certificationRepository.save(code, tx);
        code.publishEvents(this.logger, this.eventEmitter);
        return Ok(code.id);
      });
    } catch (error) {
      if (error instanceof ArgumentInvalidException) {
        return Err(error);
      }
      if (error instanceof CertificationException) {
        return Err(error);
      }
      throw handleException(error as Error);
    }
  }
}
