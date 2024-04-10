import { SmsModule } from '@/module/sms.module';
import { UserModule } from '@/module/user.module';
import { CertificationCodeRepository } from '@/repository/certificationCode.repository';
import { Module } from '@nestjs/common';
import { JWT_OPTIONS, PASSWORD_OPTIONS } from './auth.constant';
import { AuthController } from './auth.controller';
import { jwtOptions, passwordOptions } from './auth.option';
import { AuthJWTService } from './provider/auth.jwt.service';
import { AuthService } from './provider/auth.service';
import { PhoneCertificationService } from './provider/phone.certification.service';

const providers = [
  AuthService,
  AuthJWTService,
  PhoneCertificationService,
  CertificationCodeRepository,
];
const options = [
  { provide: JWT_OPTIONS, useValue: jwtOptions },
  {
    provide: PASSWORD_OPTIONS,
    useValue: passwordOptions,
  },
];

@Module({
  imports: [SmsModule, UserModule],
  controllers: [AuthController],
  providers: [...providers, ...options],
})
export class AuthModule {}
