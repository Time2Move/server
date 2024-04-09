import { UserService } from '@/providers/user.service';
import { UserRepository } from '@/repository/user.repository';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserService, UserRepository],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
