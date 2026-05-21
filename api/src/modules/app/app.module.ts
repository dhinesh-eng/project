import { CoreModule } from '../../core/core.module';

import {DatabaseModule} from '../../database/database.module'

import { Module } from '@nestjs/common';

import { UsersModule } from '../../modules/user/users.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),

    DatabaseModule,

		CoreModule,

		UsersModule,


    
	],

	controllers: [AppController],

	providers: [AppService]
})
export class AppModule {}