import { messageFactory, messages } from '../../../shared/messages.shared';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'johndoe' })
    @IsNotEmpty({ message: messageFactory(messages.W2, ['Username']) })
    @IsString()
    @MaxLength(200, { message: messageFactory(messages.W5, ['Username', '200']) })
    readonly username!: string;

    @ApiProperty({ example: 'john@example.com' })
    @IsNotEmpty({ message: messageFactory(messages.W2, ['Email']) })
    @IsEmail({}, { message: messageFactory(messages.W1, ['email']) })
    @MaxLength(150, { message: messageFactory(messages.W5, ['Email', '150']) })
    readonly email!: string;

    @ApiProperty({ example: '9876543210' })
    @IsNotEmpty({ message: messageFactory(messages.W2, ['Phone Number']) })
    @IsString()
    @MaxLength(20, { message: messageFactory(messages.W5, ['Phone Number', '20']) })
    readonly phoneNumber!: string;

    @ApiProperty({ example: '+91' })
    @IsNotEmpty({ message: messageFactory(messages.W2, ['Country Code']) })
    @IsString()
    @MaxLength(10, { message: messageFactory(messages.W5, ['Country Code', '10']) })
    readonly countryCode!: string;

    @ApiProperty({ example: 'Password123' })
    @IsNotEmpty({ message: messageFactory(messages.W2, ['Password']) })
    @IsString()
    @MaxLength(255, { message: messageFactory(messages.W5, ['Password', '255']) })
    readonly password!: string;
}

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'janesmith' })
    @IsOptional()
    @IsString()
    @MaxLength(200, { message: messageFactory(messages.W5, ['Username', '200']) })
    readonly username?: string;

    @ApiPropertyOptional({ example: 'NewPassword123' })
    @IsOptional()
    @IsString()
    @MaxLength(255, { message: messageFactory(messages.W5, ['Password', '255']) })
    readonly password?: string;

    @ApiPropertyOptional({ example: '9999999999' })
    @IsOptional()
    @IsString()
    @MaxLength(20, { message: messageFactory(messages.W5, ['Phone Number', '20']) })
    readonly phoneNumber?: string;

    @ApiPropertyOptional({ example: '+1' })
    @IsOptional()
    @IsString()
    @MaxLength(10, { message: messageFactory(messages.W5, ['Country Code', '10']) })
    readonly countryCode?: string;
}

// export class LoginDto {
//     @ApiProperty({ example: 'john@example.com or 9876543210' })
//     @IsNotEmpty({ message: messageFactory(messages.W2, ['Email']) })
//     @IsString()
//     readonly email!: string;

//     @ApiProperty({ example: 'Password123' })
//     @IsNotEmpty({ message: messageFactory(messages.W2, ['Password']) })
//     @IsString()
//     readonly password!: string;
// }
// export class LoginDto {

//     @ApiProperty({
//         example: 'john@example.com'
//     })

//     @IsNotEmpty({
//         message: messageFactory(
//             messages.W2,
//             ['Email']
//         )
//     })

//     @IsEmail(
//         {},
//         {
//             message: messageFactory(
//                 messages.W1,
//                 ['email']
//             )
//         }
//     )

//     readonly email!: string;

//     @ApiProperty({
//         example: 'Password123'
//     })

//     @IsNotEmpty({
//         message: messageFactory(
//             messages.W2,
//             ['Password']
//         )
//     })

//     @IsString()

//     readonly password!: string;
// }
export class LoginDto {

    @ApiProperty({
        example: 'john@example.com or 9876543210'
    })

    @IsNotEmpty({
        message: messageFactory(
            messages.W2,
            ['Email or Phone Number']
        )
    })

    @IsString()

    readonly identifier!: string;

    @ApiProperty({
        example: 'Password123'
    })

    @IsNotEmpty({
        message: messageFactory(
            messages.W2,
            ['Password']
        )
    })

    @IsString()

    @MaxLength(255, {
        message: messageFactory(
            messages.W5,
            ['Password', '255']
        )
    })

    readonly password!: string;
}

export class ForgotPasswordDto {
    @ApiProperty({ example: 'john@example.com' })
    @IsNotEmpty({ message: messageFactory(messages.W2, ['Email']) })
    @IsEmail({}, { message: messageFactory(messages.W1, ['email']) })
    readonly email!: string;
}

export class ResetPasswordDto {
    @ApiProperty({ example: 'some-reset-token' })
    @IsNotEmpty({ message: messageFactory(messages.W2, ['Token']) })
    @IsString()
    readonly token!: string;

    @ApiProperty({ example: 'NewPassword123' })
    @IsNotEmpty({ message: messageFactory(messages.W2, ['New Password']) })
    @IsString()
    @MaxLength(255, { message: messageFactory(messages.W5, ['Password', '255']) })
    readonly newPassword!: string;
}
