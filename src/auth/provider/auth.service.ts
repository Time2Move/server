import { Injectable } from '@nestjs/common';
import { Auth } from '@type/auth';
import { PhoneCertificationService } from './phone.certification.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly phoneCertificationService: PhoneCertificationService,
  ) {}

  async login() {
    return 'login';
  }

  async signup() {
    return 'signup';
  }

  async requsetCertificationCode(
    dto: Auth.RequsetCertificationCode.Request.Dto,
  ) {
    switch (dto.targetType) {
      case 'PHONE':
        const code = await this.generateCertificationCode();
        return await this.phoneCertificationService.sendCertificationCode(
          `${dto.contryCode}${dto.target}`,
          code,
          dto.type,
        );
      default:
        return false;
    }
  }
  async validateCertificationCode(
    dto: Auth.ValidateCertificationCode.Request.Dto,
  ) {
    switch (dto.targetType) {
      case 'PHONE':
        return await this.phoneCertificationService.verifyCertificationCode(
          `${dto.contryCode}${dto.target}`,
          dto.code,
          dto.type,
        );
      default:
        return false;
    }
  }

  private async generateCertificationCode() {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
  }
}
