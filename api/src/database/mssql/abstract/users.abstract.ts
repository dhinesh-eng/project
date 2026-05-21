import { CreateUserDto, ForgotPasswordDto, LoginDto, ResetPasswordDto, UpdateUserDto } from '../../../modules/user/dto';
import { AppResponse } from '../../../shared/appresponse.shred';
import { AtPayload } from '../../../shared/models.shared';

export abstract class UsersAbstractSqlDao {
	abstract getUserById(userGuid: string, claims: AtPayload): Promise<AppResponse>;
	abstract createUser(userInfo: CreateUserDto, claims: AtPayload): Promise<AppResponse>;
	abstract updateUser(userGuid: string, userInfo: UpdateUserDto, claims: AtPayload): Promise<AppResponse>;
	abstract deleteUser(userGuid: string, claims: AtPayload): Promise<AppResponse>;
	abstract login(loginInfo: LoginDto): Promise<AppResponse>;
	abstract forgotPassword(forgotPasswordInfo: ForgotPasswordDto): Promise<AppResponse>;
	abstract resetPassword(resetPasswordInfo: ResetPasswordDto): Promise<AppResponse>;
}
