import { Module } from '@nestjs/common';
import { InjectConnection, MongooseModule } from "@nestjs/mongoose"
import { Connection } from "mongoose"

@Module({
    imports: [
        // STEP 1: MongoDB uchun Mongoose'ni ulaymiz
        MongooseModule.forRootAsync({

            // STEP 2: Database config yaratamiz
            useFactory: () => ({

                // STEP 3: Environment'ni tekshiramiz
                // production bo'lsa → MONGO_PROD
                // aks holda → MONGO_DEV
                uri:
                    process.env.NODE_ENV === "production"
                        ? process.env.MONGO_PROD
                        : process.env.MONGO_DEV,
            }),
        }),
    ],

    // STEP 4: MongooseModule'ni boshqa module'larga beramiz
    exports: [MongooseModule],
})
export class DatabaseModule {

    // STEP 5: MongoDB connectionni NestJS orqali olamiz
    constructor(
        @InjectConnection()
        private readonly connection: Connection,
    ) {

        // STEP 6: MongoDB ulanganmi tekshiramiz
        if (connection.readyState === 1) {

            // STEP 7: Ulangan bo'lsa xabar chiqaramiz
            console.log(
                `MongoDB is connected into ${process.env.NODE_ENV === "production"
                    ? "production"
                    : "development"
                } db`,
            );

        } else {

            // STEP 8: Ulanmagan bo'lsa
            console.log("DB is not connected!");
        }
    }
}


// 1️⃣ Decorator lar — @ bilan boshlanadi
// @Module => decorator biz uchun tahlangan meta datalarni olib kelib beradi

// 2️⃣ Dependency Injection — DI