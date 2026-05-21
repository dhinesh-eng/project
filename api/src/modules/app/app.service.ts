import { AppResponse, createResponse } from '../../shared/appresponse.shred';
import { messages } from '../../shared/messages.shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	status(): Promise<AppResponse> {
		return Promise.resolve(createResponse(200, messages.S2));
	}
}
