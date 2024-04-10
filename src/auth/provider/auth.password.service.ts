import { AUTH_ERROR } from '@/constant/error/auth.error';
import { UserService } from '@/providers/user/user.service';
import { PrismaService } from '@common/prisma/prisma.service';
import { left, right } from '@common/util/Either';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PASSWORD_OPTIONS } from '../auth.constant';
import { PasswordOptions } from '../interface/auth.service.interface';

@Injectable()
export class AuthPasswordService {
  constructor(
    @Inject(PASSWORD_OPTIONS)
    private readonly option: PasswordOptions,

    private readonly userService: UserService,
    // private readonly emailCertificationService: EmailCertificationService,
    private readonly prisma: PrismaService,
  ) {}

  async hash(password: string) {
    const hashedPassword = bcrypt.hash(password, Number(this.option.salt));
    return hashedPassword;
  }

  async compare(password: string, hashed: string) {
    const isMatch = await bcrypt.compare(password, hashed);
    if (!isMatch) return left(AUTH_ERROR.AUTH_INVALID);
    return right(true);
  }

  //   async changePassword(dto: Auth.ChangePassword.Request.Dto) {
  //     switch (dto.type) {
  //       case 'FIND_PASSWORD':
  //         return await this.changePasswordViaEmailVerification(dto);
  //       case 'PROFILE':
  //         return await this.changePasswordViaCurrentPassword(dto);
  //       default:
  //         return left(AUTH_ERROR.AUTH_INVALID);
  //     }
  //   }

  //   private async changePasswordViaEmailVerification(
  //     dto: Auth.PasswordChangeViaEmailVerificationDto,
  //   ) {
  //     const { email_certification_id, email: _email, password, type } = dto;
  //     const user = await this.checkUser(_email);
  //     if (isLeft(user)) return user;

  //     const { email, id } = user.right;
  //     const result = await this.emailCertificationService.checkEmailCertification(
  //       { email, id: email_certification_id, type },
  //     );
  //     if (isLeft(result))
  //       return left(AuthError.Authentication.EMAIL_CERTIFICATION_NOT_VERIFIED);
  //     const hashedPassword = await this.hash(password);

  //     await this.prisma.$transaction(async (tx) => {
  //       await this.userService.updatePassword(email, hashedPassword, tx);
  //       await this.emailCertificationService.expireEmailCertification(
  //         email_certification_id,
  //         email,
  //         type,
  //         tx,
  //       );
  //       await this.userService.createSnapshot(
  //         {
  //           email,
  //           nickname: user.right.nickname,
  //           password: hashedPassword,
  //           user_id: user.right.id,
  //         },
  //         tx,
  //       );
  //     });
  //     return right({ email, id });
  //   }

  //   private async changePasswordViaCurrentPassword(
  //     dto: Auth.PasswordChangeViaCurrentPasswordDto,
  //   ) {
  //     const { email: _email, password, current_password } = dto;
  //     const user = await this.checkUser(_email);
  //     if (isLeft(user)) return user;

  //     const { email, id } = user.right;
  //     const hashedPassword = await this.hash(password);
  //     const compare = await this.compare(
  //       current_password,
  //       user.right.password || '',
  //     );
  //     if (isLeft(compare)) return compare;

  //     await this.prisma.$transaction(async (tx) => {
  //       await this.userService.updatePassword(email, hashedPassword, tx);
  //       await this.userService.createSnapshot(
  //         {
  //           email,
  //           nickname: user.right.nickname,
  //           password: hashedPassword,
  //           user_id: user.right.id,
  //         },
  //         tx,
  //       );
  //     });
  //     return right({ email, id });
  //   }

  //   private async checkUser(email: string) {
  //     const user = await this.userService.findUnique(email);
  //     if (isLeft(user)) return left(AuthError.User.USER_NOT_FOUND);
  //     return right(user.right);
  // }
}
