import { defaultModules } from '@config/module/default.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './module/car.module';
import { DrivingModule } from './module/driving.module';
import { ParkingModule } from './module/parking.module';
import { SmsModule } from './module/sms.module';

@Module({
  imports: [
    ...defaultModules,
    AuthModule,
    SmsModule,
    CarModule,
    DrivingModule,
    ParkingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
