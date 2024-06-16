import { Module, Provider } from '@nestjs/common';
import { RequestCertificationCodeEventHandler } from './application/event-handler/request-certification-code.event-handler';
import { TwilioAdaptor } from './infrastructure/adaptor/twilio.adapor';

export const eventHandlers: Provider[] = [RequestCertificationCodeEventHandler];
export const adapters: Provider[] = [TwilioAdaptor];

@Module({
  providers: [...eventHandlers, ...adapters],
})
export class DDD_NotificationModule {}
