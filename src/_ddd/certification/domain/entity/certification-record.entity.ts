import { Entity } from '@/_ddd_shared/ddd/entity.base';
import { v4 } from 'uuid';
import { CertificationRecordProps } from '../type/certification-record.type';

export class CertificationRecordEntity extends Entity<CertificationRecordProps> {
  protected _id!: string;

  static create({ userId }: { userId: string }) {
    const id = v4();
    const props = {
      id,
      userId,
    };

    return new CertificationRecordEntity({ id, props });
  }

  public validate(): void {}
}
