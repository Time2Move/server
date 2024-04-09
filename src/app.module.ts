import { defaultModules } from '@config/module/default.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SmsModule } from './module/sms.module';

@Module({
  imports: [...defaultModules, AuthModule, SmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
