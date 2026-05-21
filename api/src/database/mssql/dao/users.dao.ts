import {
    CreateUserDto,
    ForgotPasswordDto,
    LoginDto,
    ResetPasswordDto,
    UpdateUserDto
} from '../../../modules/user/dto';
import AppConfigService from 'src/config/database.config';
import {
    AppResponse,
    createResponse
} from '../../../shared/appresponse.shred';

import { messages } from '../../../shared/messages.shared';

import { AtPayload } from '../../../shared/models.shared';

import {
    HttpStatus,
    Inject,
    Injectable
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import { UsersAbstractSqlDao } from '../abstract/users.abstract';

import { MsSqlConstants } from '../connection/constants.mssql';

import { Users, UsersColumns } from '../models/users.users.model';

import AppLogger from '../../../core/logger/app-logger';

import { Op } from 'sequelize';

import { EmailService } from '../../../shared/email.service';

@Injectable()
export class UsersSqlDao implements UsersAbstractSqlDao {
    constructor(
        @Inject(MsSqlConstants.USERS)
        private _usersModel: typeof Users,

        readonly _loggerSvc: AppLogger,

        private readonly _jwtService: JwtService,

        private readonly _emailSvc: EmailService,

        private readonly _configService: AppConfigService
    ) { }

    // #region Get user by ID
    async getUserById(
        userGuid: string,
        claims: AtPayload
    ): Promise<AppResponse> {
        try {
            const user = await this._usersModel.findOne({
                attributes: [
                    UsersColumns.UserGuid,
                    UsersColumns.Username,
                    UsersColumns.Email,
                    UsersColumns.PhoneNumber,
                    UsersColumns.CountryCode
                ],

                where: {
                    [UsersColumns.UserGuid]: userGuid
                }
            });

            if (!user) {
                return createResponse(
                    HttpStatus.NOT_FOUND,
                    messages.U5
                );
            }

            return createResponse(
                HttpStatus.OK,
                messages.U7,
                user
            );
        } catch (err: any) {
            console.log('GET USER ERROR => ', err);

            this._loggerSvc.error(
                err.stack,
                HttpStatus.INTERNAL_SERVER_ERROR,
                claims?.sid
            );

            return createResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                messages.E2
            );
        }
    }
    // #endregion

    // #region Create user (Register)
    async createUser(
        userInfo: CreateUserDto,
        claims: AtPayload
    ): Promise<AppResponse> {
        try {
            const existing = await this._usersModel.findOne({
                where: {
                    [Op.or]: [
                        {
                            Email: userInfo.email
                        },
                        {
                            PhoneNumber:
                                userInfo.phoneNumber
                        }
                    ]
                }
            });

            if (existing) {
                const field =
                    existing.Email === userInfo.email
                        ? 'Email'
                        : 'Phone number';

                return createResponse(
                    HttpStatus.CONFLICT,
                    `${field} already registered`
                );
            }

            const hashedPassword =
                await bcrypt.hash(
                    userInfo.password,
                    10
                );

            const newUser =
                await this._usersModel.create({
                    UserGuid: uuidv4(),

                    Username:
                        userInfo.username,

                    Email: userInfo.email,

                    PhoneNumber:
                        userInfo.phoneNumber,

                    CountryCode:
                        userInfo.countryCode,

                    Password:
                        hashedPassword
                } as any);

            return createResponse(
                HttpStatus.CREATED,
                'Registration successful',
                {
                    userGuid:
                        newUser.UserGuid
                }
            );
        } catch (err: any) {
            console.log(
                'REGISTER ERROR => ',
                err
            );

            this._loggerSvc.error(
                err.stack,
                HttpStatus.INTERNAL_SERVER_ERROR,
                claims?.sid
            );

            return createResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                messages.E2
            );
        }
    }
    // #endregion

    // #region Update user
    async updateUser(
        userGuid: string,
        userInfo: UpdateUserDto,
        claims: AtPayload
    ): Promise<AppResponse> {
        try {
            const user =
                await this._usersModel.findOne({
                    where: {
                        UserGuid: userGuid
                    }
                });

            if (!user) {
                return createResponse(
                    HttpStatus.NOT_FOUND,
                    messages.U5
                );
            }

            const updatePayload: any =
                {};

            if (
                userInfo.username !==
                undefined
            ) {
                updatePayload.Username =
                    userInfo.username;
            }

            if (
                userInfo.password !==
                undefined
            ) {
                updatePayload.Password =
                    await bcrypt.hash(
                        userInfo.password,
                        10
                    );
            }

            if (
                userInfo.phoneNumber !==
                undefined
            ) {
                updatePayload.PhoneNumber =
                    userInfo.phoneNumber;
            }

            if (
                userInfo.countryCode !==
                undefined
            ) {
                updatePayload.CountryCode =
                    userInfo.countryCode;
            }

            await this._usersModel.update(
                updatePayload,
                {
                    where: {
                        UserGuid:
                            userGuid
                    }
                }
            );

            return createResponse(
                HttpStatus.OK,
                messages.U3
            );
        } catch (err: any) {
            console.log(
                'UPDATE ERROR => ',
                err
            );

            this._loggerSvc.error(
                err.stack,
                HttpStatus.INTERNAL_SERVER_ERROR,
                claims?.sid
            );

            return createResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                messages.E2
            );
        }
    }
    // #endregion

    // #region Delete user
    async deleteUser(
        userGuid: string,
        claims: AtPayload
    ): Promise<AppResponse> {
        try {
            const user =
                await this._usersModel.findOne({
                    where: {
                        UserGuid: userGuid
                    }
                });

            if (!user) {
                return createResponse(
                    HttpStatus.NOT_FOUND,
                    messages.U5
                );
            }

            await this._usersModel.destroy({
                where: {
                    UserGuid: userGuid
                }
            });

            return createResponse(
                HttpStatus.OK,
                messages.U4
            );
        } catch (err: any) {
            console.log(
                'DELETE ERROR => ',
                err
            );

            this._loggerSvc.error(
                err.stack,
                HttpStatus.INTERNAL_SERVER_ERROR,
                claims?.sid
            );

            return createResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                messages.E2
            );
        }
    }
    // #endregion

    // #region Login
    // async login(
    //     loginInfo: LoginDto
    // ): Promise<AppResponse> {
    //     try {
    //         const user =
    //             await this._usersModel.findOne({
    //                 where: {
    //                     [Op.or]: [
    //                         {
    //                             Email:
    //                                 loginInfo.email
    //                         },
    //                         {
    //                             PhoneNumber:
    //                                 loginInfo.email
    //                         }
    //                     ]
    //                 }
    //             });

    //         if (!user) {
    //             return createResponse(
    //                 HttpStatus.UNAUTHORIZED,
    //                 'Invalid email/phone or password'
    //             );
    //         }

    //         console.log(
    //             'USER => ',
    //             user.toJSON()
    //         );

    //         console.log(
    //             'PASSWORD => ',
    //             user.Password
    //         );

    //         const isPasswordValid =
    //             await bcrypt.compare(
    //                 loginInfo.password,
    //                 user.Password
    //             );

    //         if (!isPasswordValid) {
    //             return createResponse(
    //                 HttpStatus.UNAUTHORIZED,
    //                 'Invalid email/phone or password'
    //             );
    //         }

    //         const payload = {
    //             sub: user.UserGuid,

    //             email: user.Email,

    //             username:
    //                 user.Username
    //         };

            
    //         const token = this._jwtService.sign(payload, {
    //             secret: 'secret',
    //             expiresIn: '1d'
    //         });

    //         return createResponse(
    //             HttpStatus.OK,
    //             'Login successful',
    //             {
    //                 token,

    //                 user: {
    //                     userGuid:
    //                         user.UserGuid,

    //                     username:
    //                         user.Username,

    //                     email:
    //                         user.Email
    //                 }
    //             }
    //         );
    //     } catch (err: any) {
    //         console.log(
    //             'LOGIN ERROR => ',
    //             err
    //         );

    //         this._loggerSvc.error(
    //             err.stack,
    //             HttpStatus.INTERNAL_SERVER_ERROR
    //         );

    //         return createResponse(
    //             HttpStatus.INTERNAL_SERVER_ERROR,
    //             messages.E2
    //         );
    //     }
    // }
    async login(
        loginInfo: LoginDto
    ): Promise<AppResponse> {
        try {
            const user =
                await this._usersModel.findOne({
                    where: {
                        [Op.or]: [
                            {
                                Email:
                                    loginInfo.identifier
                            },
                            {
                                PhoneNumber:
                                    loginInfo.identifier
                            }
                        ]
                    }
                });

            if (!user) {
                return createResponse(
                    HttpStatus.UNAUTHORIZED,
                    'Invalid email/phone or password'
                );
            }

            console.log(
                'USER => ',
                user.toJSON()
            );

            console.log(
                'PASSWORD => ',
                user.Password
            );

            const isPasswordValid =
                await bcrypt.compare(
                    loginInfo.password,
                    user.Password
                );

            if (!isPasswordValid) {
                return createResponse(
                    HttpStatus.UNAUTHORIZED,
                    'Invalid email/phone or password'
                );
            }

            const payload = {
                sub: user.UserGuid,

                email: user.Email,

                username:
                    user.Username
            };


            const token = this._jwtService.sign(payload, {
                secret: 'secret',
                expiresIn: '1d'
            });

            return createResponse(
                HttpStatus.OK,
                'Login successful',
                {
                    token,

                    user: {
                        userGuid:
                            user.UserGuid,

                        username:
                            user.Username,

                        email:
                            user.Email
                    }
                }
            );
        } catch (err: any) {
            console.log(
                'LOGIN ERROR => ',
                err
            );

            this._loggerSvc.error(
                err.stack,
                HttpStatus.INTERNAL_SERVER_ERROR
            );

            return createResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                messages.E2
            );
        }
    }
    // #endregion

    // #region Forgot Password
    async forgotPassword(
        forgotPasswordInfo: ForgotPasswordDto
    ): Promise<AppResponse> {
        try {
            const user =
                await this._usersModel.findOne({
                    where: {
                        Email:
                            forgotPasswordInfo.email
                    }
                });

            if (!user) {
                return createResponse(
                    HttpStatus.OK,
                    'If an account with that email exists, a reset link has been sent.'
                );
            }

            const resetToken =
                uuidv4();

            const resetTokenExpires =
                new Date(
                    Date.now() +
                    3600000
                );

            await this._usersModel.update(
                {
                    ResetToken:
                        resetToken,

                    ResetTokenExpires:
                        resetTokenExpires
                },
                {
                    where: {
                        UserGuid:
                            user.UserGuid
                    }
                }
            );

            await this._emailSvc.sendPasswordResetEmail(
                user.Email,
                resetToken
            );

            return createResponse(
                HttpStatus.OK,
                'If an account with that email exists, a reset link has been sent.'
            );
        } catch (err: any) {
            console.log(
                'FORGOT PASSWORD ERROR => ',
                err
            );

            this._loggerSvc.error(
                err.stack,
                HttpStatus.INTERNAL_SERVER_ERROR
            );

            return createResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                messages.E2
            );
        }
    }
    // #endregion

    // #region Reset Password
    async resetPassword(
        resetPasswordInfo: ResetPasswordDto
    ): Promise<AppResponse> {
        try {
            const user =
                await this._usersModel.findOne({
                    where: {
                        [Op.and]: [
                            {
                                ResetToken:
                                    resetPasswordInfo.token
                            },
                            {
                                ResetTokenExpires:
                                {
                                    [Op.gt]:
                                        new Date()
                                }
                            }
                        ]
                    }
                });

            if (!user) {
                return createResponse(
                    HttpStatus.BAD_REQUEST,
                    'Invalid or expired reset token'
                );
            }

            const hashedPassword =
                await bcrypt.hash(
                    resetPasswordInfo.newPassword,
                    10
                );

            await this._usersModel.update(
                {
                    Password:
                        hashedPassword,

                    ResetToken:
                        null,

                    ResetTokenExpires:
                        null
                },
                {
                    where: {
                        UserGuid:
                            user.UserGuid
                    }
                }
            );

            return createResponse(
                HttpStatus.OK,
                'Password reset successful'
            );
        } catch (err: any) {
            console.log(
                'RESET PASSWORD ERROR => ',
                err
            );

            this._loggerSvc.error(
                err.stack,
                HttpStatus.INTERNAL_SERVER_ERROR
            );

            return createResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                messages.E2
            );
        }
    }
    // #endregion
}