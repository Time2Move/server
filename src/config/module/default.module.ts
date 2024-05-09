import { PrismaModule } from '@common/prisma/prisma.module';
import { envValidationSchema } from '@config/validation/env.validation';
import { HttpModule } from '@nestjs/axios';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
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

/// cacheModule
export const cacheModule = CacheModule.registerAsync({
  isGlobal: true,
  useFactory: async () => {
    try {
      const url = process.env.REDIS_URL;
      console.log(url);
      const store = await redisStore({
        url,
      });
      return {
        ttl: 60 * 60 * 24,
        store: store,
      } as unknown as CacheStore;
    } catch (e) {
      console.error('redis connect error', e);
      return {};
    }
  },
});

export const defaultModules = [
  configModule,
  httpModule,
  twilioModule,
  cacheModule,
  PrismaModule,
];
