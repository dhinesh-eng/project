import  AppConfigService  from '../../config/database.config';
import { AppResponse, createResponse } from '../../shared/appresponse.shred';
import { messages } from '../../shared/messages.shared';
import { HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import AppLogger from '../logger/app-logger';

@Injectable()
export class EncryptionService {
	private readonly _algo: string;

	constructor(
		readonly _loggerSvc: AppLogger,
		private readonly _appConfig: AppConfigService
	) {
		this._algo = 'aes-256-ctr';
	}

	async encrypt(text: string): Promise<AppResponse> {
		try {
			const { secretKey } = this._appConfig.get('secret'),
				iv: Buffer = crypto.randomBytes(16),
				cipher = crypto.createCipheriv(this._algo, Buffer.from(secretKey, 'hex'), iv);
			let encrypted = cipher.update(text, 'utf8', 'hex');
			encrypted += cipher.final('hex');
			return createResponse(HttpStatus.OK, messages.S2, { encryptedData: encrypted, iv: iv.toString('hex') });
		} catch (error:any) {
			this._loggerSvc.error(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
			return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
		}
	}

	async decrypt(encryptedDetails: { encryptedData: string; iv: string }): Promise<AppResponse> {
		try {
			const { secretKey } = this._appConfig.get('secret'),
				iv = Buffer.from(encryptedDetails.iv, 'hex'),
				decipher = crypto.createDecipheriv(this._algo, Buffer.from(secretKey, 'hex'), iv);
			let decrypted = decipher.update(encryptedDetails.encryptedData, 'hex', 'utf8');
			decrypted += decipher.final('utf8');
			return createResponse(HttpStatus.OK, messages.S2, decrypted);
		} catch (error:any) {
			this._loggerSvc.error(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
			return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
		}
	}

	async encryptReturn(text: string): Promise<AppResponse> {
		try {
			const { secretKey } = this._appConfig.get('secret'),
				iv: Buffer = crypto.randomBytes(16),
				cipher = crypto.createCipheriv(this._algo, Buffer.from(secretKey, 'hex'), iv);
			let encrypted = cipher.update(text, 'utf8', 'hex');
			encrypted += cipher.final('hex');
			return createResponse(HttpStatus.OK, messages.S2, iv.toString('hex') + encrypted);
		} catch (error:any) {
			this._loggerSvc.error(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
			return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
		}
	}

	async decryptReturn(encryptedDetails: string): Promise<AppResponse> {
		try {
			const { secretKey } = this._appConfig.get('secret'),
				iv = Buffer.from(encryptedDetails.substring(0, 32), 'hex'),
				decipher = crypto.createDecipheriv(this._algo, Buffer.from(secretKey, 'hex'), iv);
			let decrypted = decipher.update(encryptedDetails.substring(32), 'hex', 'utf8');
			decrypted += decipher.final('utf8');
			return createResponse(HttpStatus.OK, messages.S2, decrypted);
		} catch (error:any) {
			this._loggerSvc.error(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
			return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
		}
	}
}
