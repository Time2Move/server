import { defaultModules } from '@config/module/default.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { DDD_AuthModule } from './_ddd/auth/auth.module';
import { DDD_CarModule } from './_ddd/car/car.module';
import { CertificationModule } from './_ddd/certification/certification.module';
import { DDD_DrivingModule } from './_ddd/driving/driving.module';
import { DDD_NotificationModule } from './_ddd/notification/notification.module';
import { DDD_UserModule } from './_ddd/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ParkingModule } from './module/parking.module';
import { SmsModule } from './module/sms.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    CqrsModule,
    CertificationModule,
    ...defaultModules,
    // AuthModule,
    SmsModule,
    // CarModule,
    // DrivingModule,
    ParkingModule,
    //DDD
    CertificationModule,
    DDD_AuthModule,
    DDD_UserModule,
    DDD_NotificationModule,
    DDD_CarModule,
    DDD_DrivingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
