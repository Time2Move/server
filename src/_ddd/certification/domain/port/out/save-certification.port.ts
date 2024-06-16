import { CertificationCodeEntity } from '../../entity/certification-code.root-entity';

export abstract class SaveCertificationPort {
  abstract save(
    certificationCode: CertificationCodeEntity,
  ): Promise<CertificationCodeEntity>;
}
