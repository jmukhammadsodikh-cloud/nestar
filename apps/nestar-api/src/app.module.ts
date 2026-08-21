import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from "@nestjs/apollo"
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';
import { error } from 'console';
import { T } from './libs/types/common';
// app module => main module, integrations here
@Module({ // decorator => propertylari
  imports: [
    ConfigModule.forRoot(), // env.integration
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      uploads: false,
      autoSchemaFile: true,
      // Error handling global=> formatError har bitta errorni bizga olib ebradi
      formatError: (error: T) => { // global err => har bir methodda yozmasdan global bitta define qlamiz boldi
        const graphQLFormattedError = { //GRPHql default error noqulay biz standart errorga otkazamiz
          code: error?.extensions.code,
          message:
            error?.extensions?.exception?.response?.message || error?.extensions?.response?.message || error?.message,
        };
        console.log("GRAPHQL GLOBAL ERROR:", graphQLFormattedError)
        return graphQLFormattedError;
      }
    }),
    ComponentsModule, // components moduledagi turli hil modularni shakillantirdik
    DatabaseModule],
  controllers: [AppController],
  providers: [AppService, AppResolver], // we don't use 
})
export class AppModule { }

// resolverda hosil bolgan errorni qabul qilayapmiz va ozimizni 
// hosil qilgan error orqali frontentga yuborayapmiz