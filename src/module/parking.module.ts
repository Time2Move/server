import { ParkingService } from '@/providers/parking/parking.service';
import { ParkingRepository } from '@/repository/parking/parking.repository';
import { ParkingSnapshotRepository } from '@/repository/parking/parking.snapshot.repository';
import { Module } from '@nestjs/common';

@Module({
  providers: [ParkingRepository, ParkingSnapshotRepository, ParkingService],
})
export class ParkingModule {}
