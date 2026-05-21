import AppConfigService from '../../../config/database.config';
import AppLogger from '../../../core/logger/app-logger';
import { messageFactory, messages } from '../../../shared/messages.shared';
import { HttpStatus } from '@nestjs/common';

import { Sequelize } from 'sequelize-typescript';

import * as tedious from 'tedious';

import { MsSqlConstants } from './constants.mssql';
import { models } from './models.connection.mssql';

export const sequelizeProvider = [
	{
		provide: MsSqlConstants.SEQUELIZE_PROVIDER,

		useFactory: async (
			_appConfigSvc: AppConfigService,
			_logger: AppLogger
		) => {
			let sequelize: Sequelize | null = null;

			try {
				const dbConfig = _appConfigSvc.get('db').mssql;

				console.log('DB CONFIG => ', dbConfig);

				sequelize = new Sequelize(
					dbConfig.database,
					dbConfig.username,
					dbConfig.password,
					{
						dialect: 'mssql',

						host: dbConfig.host,

						port: dbConfig.port,

						logging: console.log,

						dialectModule: tedious,

						dialectOptions: {
							server: dbConfig.host,

							options: {
								encrypt: true,

								trustServerCertificate: true,

								connectTimeout: 15000,

								requestTimeout: 300000
							}
						}
					}
				);

				sequelize.addModels([...models]);

				await sequelize.authenticate();

				console.log('MSSQL CONNECTED SUCCESSFULLY');

				_logger.log(messages.S3, 200);

				return sequelize;
			} catch (err) {
				console.log('FULL DB ERROR => ', err);

				const errorStack =
					err instanceof Error ? err.stack : 'Unknown error';

				_logger.log(
					messageFactory(messages.E4, [errorStack]),
					HttpStatus.INTERNAL_SERVER_ERROR
				);
			}

			process.on('SIGINT', async () => {
				if (sequelize) {
					try {
						await sequelize.close();

						_logger.log(messages.E5, 200);
					} catch (err) {
						const errorStack =
							err instanceof Error
								? err.stack
								: 'Unknown error';

						_logger.log(
							messageFactory(messages.E6, [errorStack]),
							500
						);
					} finally {
						process.exit(0);
					}
				}
			});
		},

		inject: [AppConfigService, AppLogger]
	}
];
