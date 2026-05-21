import { messages } from '../../shared/messages.shared';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DecoratorConstant } from '../../core/constants/decorator.constant';
import AppLogger from '../logger/app-logger';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly _logger: AppLogger,
		private readonly _jwtService: JwtService
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const secured = this.reflector.get<string>(DecoratorConstant.SECURED, context.getHandler());

			/*If API is not secured, allow through*/
			if (!secured) {
				return true;
			}

			const request = context.switchToHttp().getRequest();
			let bearerToken = request.headers['authorization'];

			if (!bearerToken) {
				throw new HttpException(messages.E3, HttpStatus.UNAUTHORIZED);
			}

			bearerToken = bearerToken.replace('Bearer', '').trim();
			if (!bearerToken) {
				throw new HttpException(messages.E3, HttpStatus.UNAUTHORIZED);
			}

			// const payload = this._jwtService.verify(bearerToken, {
			// 	secret: process.env.JWT_ACCESS_TOKEN_SECRET
			// });
			// console.log('TOKEN => ', bearerToken);
			const payload = this._jwtService.verify(bearerToken, {
				secret: 'secret'
			});

			request.claims = payload;
			return true;
		} catch (error: any) {
			this._logger.error(error.stack, HttpStatus.UNAUTHORIZED);
			throw new HttpException(messages.E3, HttpStatus.UNAUTHORIZED);
		}
	}
}
