import { AppResponse } from '../../shared/appresponse.shred';
import { Body, Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, ForgotPasswordDto, LoginDto, ResetPasswordDto, UpdateUserDto } from './dto';
import { UsersAbstractSvc } from './users.abstract';
import { Authenticate } from '../../core/decorators/authenticate.decorator';

@Controller('users')
@ApiTags('User')
export class UsersController {
	constructor(private readonly _usersSvc: UsersAbstractSvc) { }

	@Post('login')
	@ApiOperation({ summary: 'Login with email/phone and password' })
	async login(@Body() loginInfo: LoginDto): Promise<AppResponse> {
		return this._usersSvc.login(loginInfo);
	}

	

	@Post('register')
	@ApiOperation({ summary: 'Register a new user' })
	async register(@Body() userInfo: CreateUserDto): Promise<AppResponse> {
		return this._usersSvc.createUser(userInfo);
	}

	@Post('forgot-password')
	@ApiOperation({ summary: 'Request password reset token' })
	async forgotPassword(@Body() forgotPasswordInfo: ForgotPasswordDto): Promise<AppResponse> {
		return this._usersSvc.forgotPassword(forgotPasswordInfo);
	}

	@Post('reset-password')
	@ApiOperation({ summary: 'Reset password using token' })
	async resetPassword(@Body() resetPasswordInfo: ResetPasswordDto): Promise<AppResponse> {
		return this._usersSvc.resetPassword(resetPasswordInfo);
	}

	@Authenticate()
	@Get('profile')
	@ApiOperation({ summary: 'Get current user profile' })
	async getProfile(@Req() req: any): Promise<AppResponse> {
		return this._usersSvc.getUserById(req.claims.sub, req.claims);
	}

	@Authenticate()
	@Put('profile')
	@ApiOperation({ summary: 'Update current user profile' })
	async updateProfile(@Body() userInfo: UpdateUserDto, @Req() req: any): Promise<AppResponse> {
		return this._usersSvc.updateUser(req.claims.sub, userInfo, req.claims);
	}

	@Authenticate()
	@Delete('profile')
	@ApiOperation({ summary: 'Delete current user account' })
	async deleteAccount(@Req() req: any): Promise<AppResponse> {
		return this._usersSvc.deleteUser(req.claims.sub, req.claims);
	}
}
