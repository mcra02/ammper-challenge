import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignInDTO {

  @ApiProperty()
  @Length( 4, 100 )
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length( 5, 100 )
  @IsNotEmpty()
  password: string;

}

export class SignUpDTO {

  @ApiProperty()
  @Length( 4, 100 )
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length( 5, 100 )
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @Length( 5, 100 )
  @IsNotEmpty()
  passwordConfirmation: string;

  @ApiProperty()
  @IsNotEmpty()
  fullname: string;

}
