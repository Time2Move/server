// infrastructure/mapper/certification-code.mapper.ts

import { Mapper } from '@/_ddd_shared/ddd/mapper.interface';
import { Injectable } from '@nestjs/common';
import {
  CertificationCode as PrismaCertificationCode,
  CertificationRecord as PrismaCertificationRecord,
} from '@prisma/client';
import { CertificationCodeEntity } from './entity/certification-code.root-entity';
import { CertificationRecordEntity } from './entity/certification-record.entity';
import { CertificationCodeStatus } from './value-object/certification-code-status.value-object';
import { CertificationTarget } from './value-object/certification-target.value-object';

@Injectable()
export class CertificationMapper implements Mapper<CertificationCodeEntity> {
  toPersistence(certificationCode: CertificationCodeEntity) {
    const props = certificationCode.getProps();
    const { target, targetType, type } = props.target.unpack();
    const expiresAt = props.expiresAt;
    const status = props.status.unpack();
    const recordProps = props?.certificationRecord?.getProps();
    const record = recordProps
      ? {
          id: recordProps.id,
          userId: recordProps.userId,
        }
      : null;

    const _code = {
      code: props.code,
      targetType,
      type,
      status,
      expiresAt,
      target,
    };

    const create = {
      id: props.id,
      ..._code,
    };

    const update = {
      ..._code,
      certification: record
        ? {
            upsert: {
              update: {
                userId: record.userId,
              },
              create: {
                id: record.id,
                userId: record.userId,
              },
            },
          }
        : undefined, // 조건에 따라 필드를 추가하지 않도록 undefined 반환
    };

    return { create, update };
  }

  toDomain(
    prismaReturn: PrismaCertificationCode & {
      certification?: PrismaCertificationRecord | null;
    },
  ) {
    const { certification, ...code } = prismaReturn;

    // Certification Record Entity
    const _certification = certification
      ? new CertificationRecordEntity({
          id: certification.id,
          props: {
            id: certification.id,
            userId: certification.userId,
          },
        })
      : undefined;

    // target
    const { target, targetType, type } = code;
    const _target = new CertificationTarget({ target, targetType, type });

    // status
    const { status } = code;
    const _status = new CertificationCodeStatus(status);

    return new CertificationCodeEntity({
      id: code.id,
      props: {
        id: code.id,
        code: code.code,
        target: _target,
        status: _status,
        expiresAt: code.expiresAt,
        certificationRecord: _certification,
      },
    });
  }

  toResponse(entity: CertificationCodeEntity) {
    return entity;
  }
}
