import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { User } from './user.entity';
import { UpdateUserDto } from '../../../../packages/types/src/user/update-user.dto';
import { CreateUserDto } from 'types';

@Injectable()
export class UserRepository extends BaseRepository<User, CreateUserDto, UpdateUserDto> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }
}
