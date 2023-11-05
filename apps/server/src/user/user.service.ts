import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto } from 'types';

@Injectable()
export class UserService extends BaseService<User, CreateUserDto, UpdateUserDto> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
