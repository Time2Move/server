import { AuthGuard } from '@/_ddd_shared/guard/auth.guard';
import { Global, Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { DDD_UserModule } from '../user/user.module';
import { LoginHttpController } from './application/command/login-command/http/login.http.controller';
import { LoginCommandHandler } from './application/command/login-command/login.command-handler';
import { IsLoginController } from './application/query/isLogin/http/is-login.controller';
import { RefreshHttpController } from './application/query/refresh/http/refresh.http-controller';
import { RefreshQueryHandler } from './application/query/refresh/refresh.query-handler';
import { HashService } from './domain/service/HashService';
import { RefreshGuard } from './guard/refresh.guard';
import { UserAdaptor } from './infrastructure/adaptor/user.adaptor';

const controllers = [
  LoginHttpController,
  RefreshHttpController,
  IsLoginController,
];

const commandHandler = [LoginCommandHandler];
const queryHandler = [RefreshQueryHandler];

const guards = [AuthGuard, RefreshGuard];
const services = [HashService, JwtService];
const addaptors = [UserAdaptor];

@Module({
  imports: [CqrsModule, forwardRef(() => DDD_UserModule)],
  controllers: [...controllers],
  providers: [
    ...services,
    ...addaptors,
    ...commandHandler,
    ...guards,
    ...queryHandler,
  ],
  exports: [...services, ...guards],
})
@Global()
export class DDD_AuthModule {}
