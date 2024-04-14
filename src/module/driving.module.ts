import { DrivingService } from '@/providers/driving/driving.service';
import { DrivingRepository } from '@/repository/driving/driving.repository';
import { Module } from '@nestjs/common';

@Module({
  providers: [DrivingRepository, DrivingService],
})
export class DrivingModule {}
