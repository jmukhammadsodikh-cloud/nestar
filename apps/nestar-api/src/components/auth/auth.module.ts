import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  exports: [AuthService], // member moduleda ishlash uchun tashqariga export qilayapmiz
})
export class AuthModule { }
