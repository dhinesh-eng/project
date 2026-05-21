import { Module } from '@nestjs/common';
import { UsersAbstractSvc } from './users.abstract';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	controllers: [UsersController],
	providers: [
		{
			provide: UsersAbstractSvc,
			useClass: UsersService
		}
	]
})
export class UsersModule {}
