import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { CONFIG } from '../utils/config/enviroment.config';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
  constructor (
      private readonly _authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONFIG.auth.jwt.secret
    });
  }

  async validate ( payload: unknown ): Promise<any> {
    return await this._authService.validateUserAuth( payload );
  }
}
