import { SmsModule } from '@/module/sms.module';
import { UserModule } from '@/module/user.module';
import { CertificationCodeRepository } from '@/repository/certificationCode.repository';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './provider/auth.service';
import { PhoneCertificationService } from './provider/phone.certification.service';

@Module({
  imports: [SmsModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    PhoneCertificationService,
    CertificationCodeRepository,
  ],
})
export class AuthModule {}
