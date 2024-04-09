import { PrismaModule } from '@common/prisma/prisma.module';
import { envValidationSchema } from '@config/validation/env.validation';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TwilioModule } from 'nestjs-twilio';

///////// configModule
export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  validationSchema: envValidationSchema,
});

///////// httpModule
export const httpModule = {
  ...HttpModule.register({
    timeout: 100000,
    maxRedirects: 0,
  }),
  global: true,
};

///////// twilioModule
export const twilioModule = TwilioModule.forRoot({
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  isGlobal: true,
});

export const defaultModules = [
  configModule,
  httpModule,
  twilioModule,
  PrismaModule,
];
