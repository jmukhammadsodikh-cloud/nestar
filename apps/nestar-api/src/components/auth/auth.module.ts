import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    HttpModule, // jsonwebToken integration
    JwtModule.register({
      secret: `${process.env.SECRET_TOKEN}`, // option => secret code
      signOptions: { expiresIn: "30d" }     // option => muddati
    })
  ],
  providers: [AuthService],
  exports: [AuthService], // member moduleda ishlash uchun tashqariga export qilayapmiz
})
export class AuthModule { }
