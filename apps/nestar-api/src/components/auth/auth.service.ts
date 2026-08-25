import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Member } from '../../libs/dto/member/member';
import { T } from '../../libs/types/common';
import { shapeIntoMongoObjectId } from '../../libs/config';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    // password hashing
    public async hashPassword(memberPassword: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(memberPassword, salt);
    }
    // for login compare password 
    public async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    public async createToken(member: Member): Promise<string> { // memberimizni qiymatidan token hosil qiladi
        const payload: T = {};
        // member malumotini payloadga yuklayapmiz
        // object class orqali memberni topamiz slash dogni ichidan kelsa shuni olib beradi
        Object.keys(member['_doc'] ? member['_doc'] : member).map((ele) => {
            payload[`${ele}`] = member[`${ele}`];
        });
        delete payload.memberPassword;
        console.log("member:", payload)

        // jwtService objecti bizga tokendi hosil qladi
        return await this.jwtService.signAsync(payload);
    }

    // member malumot olish uchun token ichidan
    public async verifyToken(token: string): Promise<Member> {
        const member = await this.jwtService.verifyAsync(token);
        member._id = shapeIntoMongoObjectId(member._id)
        return member;

    }


}