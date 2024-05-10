import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const doc = await import('../packages/api/swagger.json' as any);
  SwaggerModule.setup('api-docs', app, doc);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
