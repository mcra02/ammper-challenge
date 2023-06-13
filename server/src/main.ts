import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG } from './utils/config/enviroment.config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { EnviromentEnum } from './utils/models/enviroment.model';
import { morganMiddleware } from './utils/config/morgan.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './utils/logger.service';

async function bootstrap () {
  const app = await NestFactory.create( AppModule );

  app.setGlobalPrefix( CONFIG.prefix );

  app.useGlobalPipes( new ValidationPipe );
  app.useGlobalInterceptors( new ClassSerializerInterceptor( app.get( Reflector ) ) );

  if ( CONFIG.enviroment === EnviromentEnum.DEVELOPMENT ) {
    app.use( morganMiddleware );
  }

  if ( [
    EnviromentEnum.DEVELOPMENT,
    EnviromentEnum.STAGING
  ].includes( CONFIG.enviroment ) ) {
    const options = new DocumentBuilder()
      .setTitle( `${CONFIG.projectName} API` )
      .setDescription( `The ${CONFIG.projectName} API description` )
      .setVersion( '1.0' )
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument( app, options );
    SwaggerModule.setup( `${CONFIG.prefix}/swagger`, app, document );
  }

  const logger = await app.resolve<LoggerService>( LoggerService );

  app.enableCors({
    origin: CONFIG.corsOrigins
  });

  // app.use( helmet() );

  await app.listen( CONFIG.httpPort );

  logger.log( `http://${CONFIG.host}:${CONFIG.httpPort}/${CONFIG.prefix}`, 'HTTP API' );
  logger.log(
    `http://${CONFIG.host}:${CONFIG.httpPort}/${CONFIG.prefix}/swagger`,
    'SWAGGER DOC'
  );

}
bootstrap();
