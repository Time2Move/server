import { SmsModule } from '@/module/sms.module';
import { UserModule } from '@/module/user.module';
import { CertificationCodeRepository } from '@/repository/certificationCode.repository';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_OPTIONS, PASSWORD_OPTIONS } from './auth.constant';
import { AuthController } from './auth.controller';
import { jwtOptions, passwordOptions } from './auth.option';
import { AuthLocalService } from './implement/auth.local.service';
import { AuthJWTService } from './provider/auth.jwt.service';
import { AuthPasswordService } from './provider/auth.password.service';
import { AuthService } from './provider/auth.service';
import { PhoneCertificationService } from './provider/phone.certification.service';

const providers = [
  AuthService,
  AuthLocalService,
  AuthPasswordService,
  AuthJWTService,
  JwtService,
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
