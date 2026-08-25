import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Message } from 'apps/nestar-api/src/libs/enums/common.enum';

@Injectable() // guard himoyani tashkil qlib beradi => token chacking guard 
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService) { }

	async canActivate(context: ExecutionContext | any): Promise<boolean> {
		console.info('--- @guard() Authentication [AuthGuard] ---');

		if (context.contextType === 'graphql') {
			const request = context.getArgByIndex(2).req; // contex ichidan reqni qolga olamiz

			const bearerToken = request.headers.authorization; //header ichida auth qiymat check qilib
			if (!bearerToken) throw new BadRequestException(Message.TOKEN_NOT_EXIST); // u mavjud bomasa error 

			const token = bearerToken.split(' ')[1], // oraliq probel bilan split qilib ikkinchi idex bu tokendi olib beradi
				authMember = await this.authService.verifyToken(token);
			if (!authMember) throw new UnauthorizedException(Message.NOT_AUTHENTICATED);

			console.log('memberNick[auth] =>', authMember.memberNick);
			request.body.authMember = authMember; // for auth member custom decorator

			return true;
		}
		return false
		// description => http, rpc, gprs and etc are ignored
	}
}
