import { SmsModule } from '@/module/sms.module';
import { UserModule } from '@/module/user.module';
import { CertificationCodeRepository } from '@/repository/certification/certificationCode.repository';
import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AUTH_CACHE_SERVICE,
  JWT_OPTIONS,
  PASSWORD_OPTIONS,
} from './auth.constant';
import { AuthController } from './auth.controller';
import { jwtOptions, passwordOptions } from './auth.option';
import { RefreshGuard } from './guard/refresh.guard';
import { AuthLocalService } from './implement/auth.local.service';
import { AuthCacheService } from './provider/auth.cache.service';
import { AuthJWTService } from './provider/auth.jwt.service';
import { AuthPasswordService } from './provider/auth.password.service';
import { AuthService } from './provider/auth.service';
import { PhoneCertificationService } from './provider/phone.certification.service';

const providers = [
  AuthService,
  AuthLocalService,
  AuthPasswordService,
  AuthJWTService,
  AuthCacheService,
  JwtService,
  PhoneCertificationService,
  CertificationCodeRepository,
  {
    provide: AUTH_CACHE_SERVICE,
    useClass: AuthCacheService,
  },
];

const gaurds = [RefreshGuard];
const options = [
  { provide: JWT_OPTIONS, useValue: jwtOptions },
  {
    provide: PASSWORD_OPTIONS,
    useValue: passwordOptions,
  },
];

@Global()
@Module({
  imports: [SmsModule, UserModule],
  controllers: [AuthController],
  providers: [...providers, ...options, ...gaurds],
  exports: [...providers],
})
export class AuthModule {}
