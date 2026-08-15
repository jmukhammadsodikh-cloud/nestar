import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from "@nestjs/apollo"
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';
// app module => markaziy module
@Module({ // decorator => propertylari
  imports: [
    ConfigModule.forRoot(), // env.integration
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      uploads: false,
      autoSchemaFile: true,
    }),
    ComponentsModule, // components moduledagi turli hil modularni shakillantirdik
    DatabaseModule],
  controllers: [AppController],
  providers: [AppService, AppResolver], // we don't use 
})
export class AppModule { }
