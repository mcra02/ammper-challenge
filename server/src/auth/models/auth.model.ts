import { ApiProperty } from '@nestjs/swagger';

export class UserPayload {
  @ApiProperty()
  username: string;

  @ApiProperty()
  fullname: string;
}

export class SessionPayload {
  @ApiProperty()
  user: UserPayload;

  @ApiProperty()
  token: string;
}
