import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';

@Module({
  imports: [ TypeOrmModule.forFeature( [ User ] ) ],
  providers: [ UsersService ],
  exports: [ UsersService ]
})
export class UsersModule {}
