import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { CONFIG } from '../utils/config/enviroment.config';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: CONFIG.auth.jwt.secret,
      signOptions: { expiresIn: '2 days' }
    })
  ],
  controllers: [ AuthController ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [ JwtStrategy ]
})
export class AuthModule {}
