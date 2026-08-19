import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './libs/interceptor/Logging.interceptor';

// negizdan boshlash bootstraping
async function bootstrap() { // AppModule markaziy module
  const app = await NestFactory.create(AppModule); // Express + NestJs qorishmasi
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT_API ?? 3000);
}

bootstrap();
