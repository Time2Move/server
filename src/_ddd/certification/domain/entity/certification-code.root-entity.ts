import { AggregateRoot } from '@/_ddd_shared/ddd/aggregate-root.base';
import { ArgumentInvalidException } from '@/_ddd_shared/exceptions';
import typia from 'typia';
import { v4 } from 'uuid';
import {
  CertificationCodeAlreadyVerified,
  CertificationCodeExpired,
  CertificationCodeNotVerified,
} from '../error';
import { RequestCertificationCodeEvent } from '../event/request-code.event';
import {
  CertificationCodeProps,
  CreateCertificationCodeProps,
} from '../type/certification.code.type';
import { CertificationCodeStatus } from '../value-object/certification-code-status.value-object';
import { CertificationTarget } from '../value-object/certification-target.value-object';
import { CertificationRecordEntity } from './certification-record.entity';

export class CertificationCodeEntity extends AggregateRoot<CertificationCodeProps> {
  protected _id!: string;

  static create(createCertificationCodeProps: CreateCertificationCodeProps) {
    const id = v4();
    const code = this.generateCode();
    const expiresAt = this.generateExpiresAt();
    const target = new CertificationTarget(createCertificationCodeProps);
    const status = CertificationCodeStatus.PENDING;
    const props = {
      id,
      code,
      expiresAt,
      target,
      status,
    };
    const certificationCode = new CertificationCodeEntity({ id, props });
    certificationCode.validate();

    // TODO: 생성 이벤트 발급 (Notification 도메인이 구독하여 이벤트 처리)
    /**
     * 여기에 작성
     */
    certificationCode.addEvent(
      new RequestCertificationCodeEvent({
        aggregateId: id,
        ...target.unpack(),
        code,
      }),
    );
    return certificationCode;
  }

  private static generateCode() {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
  }

  private static generateExpiresAt() {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    return expiresAt;
  }

  record(userId: string) {
    const certificationRecord = CertificationRecordEntity.create({
      userId,
    });
    this.props.certificationRecord = certificationRecord;
  }

  //////////////////////////
  //  Status
  expire() {
    this.props.status = CertificationCodeStatus.EXPIRED;
  }

  verify() {
    if (this.props.expiresAt < new Date()) {
      throw CertificationCodeExpired('Certification code is expired');
    }
    if (!CertificationCodeStatus.PENDING.equals(this.props.status)) {
      throw CertificationCodeAlreadyVerified(
        'Certification code is already verified',
      );
    }
    this.props.status = CertificationCodeStatus.VERIFIED;
  }

  success() {
    console.log(this.props.status.unpack());
    if (!CertificationCodeStatus.VERIFIED.equals(this.props.status)) {
      throw CertificationCodeNotVerified('Certification code is not verified');
    }
    this.props.status = CertificationCodeStatus.SUCCESS;
  }

  //////////////////////////
  public validate(): void {
    if (!typia.is<CertificationCodeProps>(this.props)) {
      throw new ArgumentInvalidException('Invalid certification code props');
    }
  }
}
