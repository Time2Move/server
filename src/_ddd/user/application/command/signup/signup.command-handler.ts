import { UserEntity } from '@/_ddd/user/domain/entity/user.root-entity';
import {
  UserCertificationCodeInvalidType,
  UserNicknameExistType,
} from '@/_ddd/user/domain/error';
import { UserValidator } from '@/_ddd/user/domain/service/user.validator';
import { AuthAdaptor } from '@/_ddd/user/infrastructure/adaptor/auth.adaptor';
import { CertificationAdaptor } from '@/_ddd/user/infrastructure/adaptor/cerification.adaptor';
import { UserRepository } from '@/_ddd/user/infrastructure/repository/user.repository';
import { DomainException, handleException } from '@/_ddd_shared/exceptions';
import { Result } from '@/_ddd_shared/types';
import { Err, Ok } from '@/_ddd_shared/util/Result';
import { PrismaService } from '@common/prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  LocalSignupCommandProps,
  OauthSignupCommandProps,
  SignupCommand,
} from './signup.command';

@CommandHandler(SignupCommand)
export class SignupCommandHandler implements ICommandHandler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepo: UserRepository,
    private readonly authAdaptor: AuthAdaptor,
    private readonly userService: UserValidator,
    private readonly certificationAdaptor: CertificationAdaptor,
  ) {}

  async execute(
    command: SignupCommand,
  ): Promise<
    Result<'success', UserNicknameExistType | UserCertificationCodeInvalidType>
  > {
    try {
      const { local, oauth } = command;
      if (local) {
        return Ok(await this.signupLocal(local));
      }
      if (oauth) {
        return Ok(await this.signupOauth(oauth));
      }
      throw new Error('SignupCommand');
    } catch (e) {
      if (e instanceof DomainException) {
        return Err(e);
      }
      throw handleException(e as Error);
    }
  }

  async signupLocal(local: LocalSignupCommandProps): Promise<'success'> {
    if (!local) {
      throw new Error('SignupCommand');
    }
    await this.userService.canSignup(local);

    const hashedPassword = await this.authAdaptor.hash(local.password);
    const user = UserEntity.create({
      nickname: local.nickname,
      account: {
        account: local.account,
        password: hashedPassword,
      },
      phone: {
        countryCode: local.countryCode,
        phone: local.phone,
      },
    });
    await this.prisma.$transaction(async (tx) => {
      await this.userRepo.save(user, tx);
      await this.certificationAdaptor.changeStatusSuccessAndRecord(
        local.certificationId,
        user.id,
        tx,
      );
    });
    return 'success';
  }

  async signupOauth(oauth: OauthSignupCommandProps): Promise<'success'> {
    if (!oauth) {
      throw new Error('SignupCommand');
    }
    throw new Error('NOT IMPLEMENTED');
  }
}
