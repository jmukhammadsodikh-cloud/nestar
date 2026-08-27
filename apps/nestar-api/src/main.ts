import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MaxFileSizeValidator, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './libs/interceptor/Logging.interceptor';
import { graphqlUploadExpress } from "graphql-upload"
import * as express from "express"

// negizdan boshlash bootstraping
async function bootstrap() { // AppModule markaziy module
  const app = await NestFactory.create(AppModule); // Express + NestJs qorishmasi
  app.useGlobalPipes(new ValidationPipe()); // global validation qonuniyati
  app.useGlobalInterceptors(new LoggingInterceptor()); // interceptor response request logging
  app.enableCors({ origin: true, credentials: true }); // kirib kelgan domain requestlarni support

  app.use(graphqlUploadExpress({ maxFileSize: 15000000, maxFiles: 10 })) //serverga yuklangan malumotlarga limit qoyadi
  app.use("/uploads", express.static('./uploads')) // upload filemizn tashqi olamga ochiqladik
  await app.listen(process.env.PORT_API ?? 3000); // 3007 port
}

bootstrap();
