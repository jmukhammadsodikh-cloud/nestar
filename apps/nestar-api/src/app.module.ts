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
    ConfigModule.forRoot(), // .env oqish
    GraphQLModule.forRoot({ // graphQL api backend server
      driver: ApolloDriver,
      playground: true,
      uploads: false,
      autoSchemaFile: true,
      // FormatError global har bitta errorni bizga olib beradi
      formatError: (error: T) => { // methodlarda yozmasdan global bitta define qlamiz GRPHql default error noqulay biz standart errorga otkazamiz
        const graphQLFormattedError = {
          code: error?.extensions.code,
          message:
            error?.extensions?.exception?.response?.message || error?.extensions?.response?.message || error?.message,
        };
        console.log("GRAPHQL GLOBAL ERROR:", graphQLFormattedError)
        return graphQLFormattedError;
      }
    }),
    ComponentsModule, // components module bizni turli hil maqsadli modullarimizni jamlab beradi
    DatabaseModule],
  controllers: [AppController],
  providers: [AppService, AppResolver], // we don't use 
})
export class AppModule { }

// resolverda hosil bolgan errorni qabul qilayapmiz va ozimizni 
// hosil qilgan error orqali frontentga yuborayapmiz