import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// negizdan boshlash bootstraping
async function bootstrap() { // AppModule markaziy module
  const app = await NestFactory.create(AppModule); // Express + NestJs qorishmasi
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT_API ?? 3000);
}

bootstrap();
