import { SmsService } from '@/providers/sms.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
