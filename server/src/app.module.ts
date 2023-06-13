import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CONFIG } from './utils/config/enviroment.config';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...CONFIG.database as TypeOrmModuleOptions,
      entities: [ User ],
      synchronize: true
    }),
    UtilsModule,
    UsersModule,
    AuthModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ]
})
export class AppModule {}
