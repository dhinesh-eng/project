import { AppResponse } from '../../shared/appresponse.shred';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Status')
@Controller()
export class AppController {
	constructor(private readonly _appService: AppService) {}

	@Get('status')
	status(): Promise<AppResponse> {
		return this._appService.status();
	}
}
