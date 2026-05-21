import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from './database.service';
import { UsersAbstractSqlDao } from './mssql/abstract/users.abstract';
import { sequelizeProvider } from './mssql/connection/connection.mssql';
import { msSqlDBModelsProvider } from './mssql/connection/models.connection.mssql';
import { UsersSqlDao } from './mssql/dao/users.dao';

@Module({
	providers: [
		...sequelizeProvider,
		...msSqlDBModelsProvider,
		DatabaseService,
		JwtService,
		{
			provide: UsersAbstractSqlDao,
			useClass: UsersSqlDao
		}
	],
	exports: [
		DatabaseService,
		...msSqlDBModelsProvider,
		{
			provide: UsersAbstractSqlDao,
			useClass: UsersSqlDao
		}
	]
})
export class DatabaseModule {}
