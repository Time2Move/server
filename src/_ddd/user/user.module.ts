import { Module, Provider, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DDD_AuthModule } from '../auth/auth.module';
import { CertificationModule } from '../certification/certification.module';
import { SignupHttpController } from './application/command/signup/http/signup.http.controller';
import { SignupCommandHandler } from './application/command/signup/signup.command-handler';
import { UserService } from './domain/service/user.service';
import { UserValidator } from './domain/service/user.validator';
import { UserMapper } from './domain/user.mapper';
import { AuthAdaptor } from './infrastructure/adaptor/auth.adaptor';
import { CertificationAdaptor } from './infrastructure/adaptor/cerification.adaptor';
import { UserRepository } from './infrastructure/repository/user.repository';

const httpController = [SignupHttpController];

const handler: Provider[] = [SignupCommandHandler];
const validator: Provider[] = [UserValidator];
const service: Provider[] = [UserService];

const mapper: Provider[] = [UserMapper];
const repository: Provider[] = [UserRepository];
const adaptor: Provider[] = [AuthAdaptor, CertificationAdaptor];

@Module({
  imports: [CqrsModule, CertificationModule, forwardRef(() => DDD_AuthModule)],
  controllers: [...httpController],
  providers: [
    ...validator,
    ...mapper,
    ...repository,
    ...adaptor,
    ...handler,
    ...service,
  ],
  exports: [...service],
})
export class DDD_UserModule {}
