import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { RequestCodeHttpReq } from '../../http/request-code.req-type';

export enum CertificationTargetTypeEnum {
  PHONE = 'PHONE',
}

export enum CertificationTypeEnum {
  SIGN_UP = 'SIGN_UP',
  FIND_PASSWORD = 'FIND_PASSWORD',
}

registerEnumType(CertificationTargetTypeEnum, {
  name: 'CertificationTargetType',
});

registerEnumType(CertificationTypeEnum, {
  name: 'CertificationType',
});

@ArgsType()
@InputType()
export class RequestCodeGqlRequestDto implements RequestCodeHttpReq {
  @Field()
  readonly targetType!: CertificationTargetTypeEnum;

  @Field()
  readonly target!: string;

  @Field()
  readonly type!: CertificationTypeEnum;
}
