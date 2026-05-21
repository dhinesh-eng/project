import  AppConfigService  from '../config/database.config';
import { shouldCompress } from '../core/compressions/compression';
import AppLogger from '../core/logger/app-logger';
import { ErrorHandler } from '../core/middleware/error-handler';
import { ResponseHandler} from '../core/middleware/response-handler'
import { setupSwagger } from '../core/swagger/doc.swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
// import * as compression from 'compression';
import cors from 'cors';
import { corsOptions } from '../core/cors.config';
import { json, urlencoded } from 'express';
import helmet from 'helmet';

export default function bootstrap(app: INestApplication, appConfigSvcObj: AppConfigService) {
    // Global prefix
    app.setGlobalPrefix('api');

    // Express middlewares
    app.use(json({ limit: '10mb' }));
    app.use(urlencoded({ limit: '10mb', extended: true }));
    app.use(helmet());
    // app.use(compression({ filter: shouldCompress, threshold: 0 }));

    // CORS
    app.use(cors(corsOptions));

    // Validation pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );

    // Interceptors
    app.useGlobalInterceptors(new ResponseHandler());

    // Error handler
    app.useGlobalFilters(new ErrorHandler(app.get(AppLogger)));

    // Swagger (non-production only)
    const appConfig = appConfigSvcObj.get('app'),
        { environment } = appConfig;
    if (environment && environment.toLowerCase() !== 'production') {
        setupSwagger(app);
    }
}
