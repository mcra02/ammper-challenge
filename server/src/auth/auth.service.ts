import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDTO, SignUpDTO } from './DTO/auth.dto';
import { SessionPayload } from './models/auth.model';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models/user.model';
import { Bcrypt } from '../utils/scripts/bcrypt.script';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {

  private bcrypt: Bcrypt;

  constructor (
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
    this.bcrypt = new Bcrypt();
  }

  async validateUserAuth ( payload: Partial<User> ): Promise<any> {
    const user = await this.usersService.findOne( payload.email );
    if ( !user ) {
      throw new UnauthorizedException( 'auth.errors.authentication' );
    }
    return payload;
  }

  async signUp ( data: SignUpDTO ): Promise<SessionPayload> {
    const {
      email, password, passwordConfirmation
    } = data;

    if ( password !== passwordConfirmation ) throw new Error( 'password and passwordConfirmation don\'t match' );

    const user = await this.usersService.findOne( email );

    if ( user ) throw new UnprocessableEntityException( 'Username is not available' );

    delete data.passwordConfirmation;

    data.password = await this.bcrypt.hashPassword( password );
    const createUser = await this.usersService.create({ ...data });
    return this.provideSession( createUser );
  }

  async signIn ( data: SignInDTO ): Promise<SessionPayload> {
    const user = await this.usersService.findOne( data.email );
    if ( !user ) throw new UnprocessableEntityException( 'User is not exists' );
    const passIsValid = await this.bcrypt.comparePasswrod( data.password, user.password );
    if ( !passIsValid ) throw new UnprocessableEntityException( 'The credentials provided are not valid!' );
    return this.provideSession( user );
  }

  async me ( username: string ): Promise<SessionPayload> {
    const user = await this.usersService.findOne( username );
    return this.provideSession({ ...user });
  }

  private generateToken ( payload: Partial<User> ): string {
    return this.jwtService.sign( payload );
  }

  private provideSession ( user: User ): SessionPayload {
    delete user.password;
    return {
      user,
      token: this.generateToken( instanceToPlain( user ) )
    };
  }
}
