import { HttpStatus, Injectable, LoggerService } from '@nestjs/common';

interface ApiMsg {
	host?: string;
	endpoint?: string;
	method?: string;
	header?: Array<string>;
	params?: object;
	query?: object;
	body?: object;
	statusCode?: HttpStatus;
	output?: any;
}

@Injectable()
export default class ApiLogger implements LoggerService {
	log(message: ApiMsg | any) {
		console.log('[API]', JSON.stringify(message));
	}

	error(message: ApiMsg | any) {
		console.error('[API-ERROR]', JSON.stringify(message));
	}

	warn(message: ApiMsg | any) {
		console.warn('[API-WARN]', JSON.stringify(message));
	}

	debug(message: ApiMsg | any) {
		console.debug('[API-DEBUG]', JSON.stringify(message));
	}

	verbose(message: ApiMsg | any) {
		console.log('[API-VERBOSE]', JSON.stringify(message));
	}
}
