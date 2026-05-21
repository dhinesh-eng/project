import { DatabaseService } from '../../database/database.service';
import { AppResponse } from '../../shared/appresponse.shred';
import { AtPayload } from '../../shared/models.shared';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, ForgotPasswordDto, LoginDto, ResetPasswordDto, UpdateUserDto } from './dto';
import { UsersAbstractSvc } from './users.abstract';

@Injectable()
export class UsersService implements UsersAbstractSvc {
	constructor(private readonly _dbSvc: DatabaseService) { }

	async getUserById(userGuid: string, claims: AtPayload): Promise<AppResponse> {
		return this._dbSvc.userSqlTxn.getUserById(userGuid, claims);
	}

	async createUser(userInfo: CreateUserDto, claims?: AtPayload): Promise<AppResponse> {
		if (claims) {
			return this._dbSvc.userSqlTxn.createUser(userInfo, claims);
		}

		return this._dbSvc.userSqlTxn.createUser(userInfo, undefined as unknown as AtPayload);
	}

	async updateUser(userGuid: string, userInfo: UpdateUserDto, claims: AtPayload): Promise<AppResponse> {
		return this._dbSvc.userSqlTxn.updateUser(userGuid, userInfo, claims);
	}

	async deleteUser(userGuid: string, claims: AtPayload): Promise<AppResponse> {
		return this._dbSvc.userSqlTxn.deleteUser(userGuid, claims);
	}

	async login(loginInfo: LoginDto): Promise<AppResponse> {
		return this._dbSvc.userSqlTxn.login(loginInfo);
	}

	async forgotPassword(forgotPasswordInfo: ForgotPasswordDto): Promise<AppResponse> {
		return this._dbSvc.userSqlTxn.forgotPassword(forgotPasswordInfo);
	}

	async resetPassword(resetPasswordInfo: ResetPasswordDto): Promise<AppResponse> {
		return this._dbSvc.userSqlTxn.resetPassword(resetPasswordInfo);
	}
}
