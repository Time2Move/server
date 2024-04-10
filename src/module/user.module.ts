import { UserService } from '@/providers/user/user.service';
import { UserSnapshotService } from '@/providers/user/user.snapshot.service';
import { UserRepository } from '@/repository/user.repository';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserService, UserRepository, UserSnapshotService],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
