import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { SignInDTO, SignUpDTO } from './DTO/auth.dto';
import { SessionPayload } from './models/auth.model';
import { CurrentUser } from './decorators/current.user.decorator';
import { AuthJWT } from './decorators/auth.user.decorator';

@Controller( 'auth' )
export class AuthController {

  constructor (
    private readonly authService: AuthService
  ) {}

  @Post( 'signup' )
  @ApiCreatedResponse({
    description: 'Login was successfully',
    type: SessionPayload
  })
  @ApiOperation({
    summary: 'Register user',
    description: 'Register user operation'
  })
  async signup ( @Body() data: SignUpDTO ): Promise<SessionPayload> {
    return this.authService.signUp( data );
  }

  @Post( 'signin' )
  @ApiCreatedResponse({
    description: 'Login was successfully',
    type: SessionPayload
  })
  @ApiOperation({
    summary: 'Login user',
    description: 'Login user operation'
  })
  async signIn ( @Body() data: SignInDTO ): Promise<SessionPayload> {
    return this.authService.signIn( data );
  }

  @Get( 'me' )
  @UseGuards( AuthJWT )
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Request me was successfully',
    type: SessionPayload
  })
  @ApiOperation({
    summary: 'Refresh token',
    description: 'This can only be done by the logged in user.'
  })
  async me (
    @CurrentUser( 'email' ) email: string
  ): Promise<SessionPayload> {
    return this.authService.me( email );
  }

}
