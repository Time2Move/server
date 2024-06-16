import { RequestCertificationCodeEvent } from '@/_ddd/certification/domain/event/request-code.event';
import { CertificationType } from '@/_ddd/certification/domain/type/certification.code.type';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TwilioAdaptor } from './../../infrastructure/adaptor/twilio.adapor';

@Injectable()
export class RequestCertificationCodeEventHandler {
  constructor(private readonly twilioAdaptor: TwilioAdaptor) {}

  @OnEvent(RequestCertificationCodeEvent.name, { async: true, promisify: true })
  async handle(event: RequestCertificationCodeEvent) {
    const { target, targetType, type, code } = event;
    if (targetType === 'PHONE') {
      await this.twilioAdaptor.send(target, this.codeTemplate(code, type));
    }
  }

  private codeTemplate(code: string, type: CertificationType) {
    switch (type) {
      case 'SIGN_UP':
        return `[uncar] 회원가입 인증 코드: ${code}`;
      case 'FIND_PASSWORD':
        return `[uncar] 비밀번호 찾기 인증 코드: ${code}`;
      default:
        throw new Error('Invalid certification type');
    }
  }
}
