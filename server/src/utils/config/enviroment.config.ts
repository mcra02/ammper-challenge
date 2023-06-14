import { EnviromentEnum } from '../models/enviroment.model';
import * as bcrypt from 'bcryptjs';

class Config {

  constructor () {
  }

  public projectName: string = process.env.PROYECT_NAME || '';

  public prefix = 'api/v1';

  public host: string = process.env.DOMAIN || '0.0.0.0';

  public httpPort: number = Number( process.env.PORT ) || 3000;

  public enviroment: EnviromentEnum =
    ( process.env.ENVIRON as EnviromentEnum ) || EnviromentEnum.DEVELOPMENT;

  public corsOrigins: string[] | string = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS?.split( ',' ) : '*';

  public database = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'database'
  };

  public auth = {
    jwt: {
      secret: bcrypt.genSaltSync( 10 )
    }
  };
}

export const CONFIG = new Config();
