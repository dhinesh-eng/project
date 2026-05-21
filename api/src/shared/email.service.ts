import { Injectable } from '@nestjs/common';
import AppLogger from '../core/logger/app-logger';

@Injectable()
export class EmailService {
	constructor(private readonly _loggerSvc: AppLogger) {}

	async sendPasswordResetEmail(email: string, token: string): Promise<void> {
		// In a real production app, you would use Nodemailer, SendGrid, etc.
		const resetLink = `http://localhost:3000/reset-password?token=${token}`;
		const message = `
			Hello,
			You requested a password reset. Please click the link below to reset your password:
			${resetLink}
			If you did not request this, please ignore this email.
		`;

		this._loggerSvc.log(`Sending email to ${email}: ${message}`, 200);
		
		// Simulate network delay
		await new Promise(resolve => setTimeout(resolve, 500));
	}
}
