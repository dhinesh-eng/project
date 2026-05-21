import { Users } from '../models/users.users.model';
import { MsSqlConstants } from './constants.mssql';

export const models = [Users];

export const msSqlDBModelsProvider = [
	{
		provide: MsSqlConstants.USERS,
		useValue: Users
	}
];
