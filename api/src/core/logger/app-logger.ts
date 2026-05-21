import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export default class AppLogger implements LoggerService {
	log(message: any, statusCode?: number, sid?: string) {
		console.log(`[${statusCode ?? 'INFO'}]${sid ? ` [${sid}]` : ''} ${message}`);
	}

	error(message: any, statusCode?: number, sid?: string) {
		console.error(`[${statusCode ?? 'ERROR'}]${sid ? ` [${sid}]` : ''} ${message}`);
	}

	warn(message: any) {
		console.warn(`[WARN] ${message}`);
	}

	debug(message: any) {
		console.debug(`[DEBUG] ${message}`);
	}

	verbose(message: any) {
		console.log(`[VERBOSE] ${message}`);
	}
}
