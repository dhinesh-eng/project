
import { DataType } from '../../../core/enums/data-type.enums';

import {
	Column,
	Model,
	PrimaryKey,
	Table
} from 'sequelize-typescript';

import { Tables } from '../connection/tables.mssql';
import { Schema } from '../connection/schmeas.mssql';

export enum UsersColumns {
	UserGuid = 'UserGuid',
	Username = 'Username',
	Email = 'Email',
	PhoneNumber = 'PhoneNumber',
	CountryCode = 'CountryCode',
	Password = 'Password',
	ResetToken = 'ResetToken',
	ResetTokenExpires = 'ResetTokenExpires'
}

@Table({
	tableName: Tables.Users,
	schema: Schema.dbo,
	timestamps: false
})
export class Users extends Model {
	@PrimaryKey
	@Column({
		type: DataType.UNIQUEIDENTIFIER,
		allowNull: false
	})
	declare UserGuid: string;

	@Column({
		type: `${DataType.VARCHAR}(200)`,
		allowNull: false
	})
	declare Username: string;

	@Column({
		type: `${DataType.VARCHAR}(150)`,
		allowNull: false
	})
	declare Email: string;

	@Column({
		type: `${DataType.VARCHAR}(20)`,
		allowNull: false
	})
	declare PhoneNumber: string;

	@Column({
		type: `${DataType.VARCHAR}(10)`,
		allowNull: false
	})
	declare CountryCode: string;

	@Column({
		type: `${DataType.VARCHAR}(255)`,
		allowNull: false
	})
	declare Password: string;

	@Column({
		type: `${DataType.VARCHAR}(255)`,
		allowNull: true
	})
	declare ResetToken: string;

	@Column({
		type: DataType.DATE,
		allowNull: true
	})
	declare ResetTokenExpires: Date;
}