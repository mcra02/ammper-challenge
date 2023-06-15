import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor (
    @InjectRepository( User )
    private _usersRepository: Repository<User>
  ) {}

  async findOne ( username: string ): Promise<User | undefined> {
    return this._usersRepository.findOneBy({ username });
  }

  async create ( data: User ): Promise<User> {
    try {
      return await this._usersRepository.save( data );
    } catch ( error ) {
      throw new Error( error );
    }
  }
}
