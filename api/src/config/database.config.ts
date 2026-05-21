  class AppConfigService {
	private readonly envConfig: { [key: string]: any } = {};

	constructor() {
		/*app configurations*/
		this.envConfig.app = {
			port: parseInt(process.env.APP_PORT!, 10) || 4000,
			environment: process.env.ENVIRONMENT
		};

		/*database*/
		this.envConfig.db = {
      
			mssql: {
				dialect: 'mssql',
				database: process.env.MSSQL_DATABASE || 'user_db',
				username: process.env.MSSQL_USERNAME || 'rohan',
				password: process.env.MSSQL_PASSWORD || 'Rohan@608',
				host: process.env.MSSQL_SERVER || 'G7CR',
				port: Number(process.env.MSSQL_PORT) || '1433',
				dialectOptions: {
					options: {
            server: process.env.MSSQL_SERVER || 'G7CR',
						connectTimeout: 15000,
						requestTimeout: 300000
					}
          
				},
				pool: {
					max: 5,
					min: 0,
					acquire: 30000,
					idle: 10000
				},
				trustServerCertificate: Boolean(process.env.MSSQL_TRUST_SERVER_CERTIFICATE || 'true')
			}
		};
  


		/*JWT / token settings*/
		this.envConfig.tokenMetadata = {
      
			appAtSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'secret'
		};
	}

	get(key: string): any {
		return this.envConfig[key];
	}
}

export default AppConfigService