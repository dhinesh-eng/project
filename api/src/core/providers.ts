import  AppConfigService  from '../config/database.config';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { EncryptionModule } from '../core/encryption/encryption.module';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import ApiLogger from './logger/api-logger';
import AppLogger from './logger/app-logger';
import { EmailService } from '../shared/email.service';

const getProviders = (): any[] => {
	return [
		AppConfigService,
		AppLogger,
		ApiLogger,
		JwtService,
		EmailService,
		{ provide: APP_GUARD, useClass: JwtAuthGuard }
	];
};

const importProviders = (): any[] => {
	return [ConfigModule.forRoot({ envFilePath: '.env' }), DatabaseModule, EncryptionModule];
};

const exportProviders = (): any[] => {
	return [AppConfigService, AppLogger, ApiLogger, DatabaseModule, EncryptionModule, JwtService, EmailService];
};

export { exportProviders, getProviders, importProviders };
