import { Injectable } from '@nestjs/common';
import { UsersAbstractSqlDao } from './mssql/abstract/users.abstract';

@Injectable()
export class DatabaseService {
	constructor(public userSqlTxn: UsersAbstractSqlDao) {}
}
