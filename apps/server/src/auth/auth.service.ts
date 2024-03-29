import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../../../packages/types/src/auth/jwt-payload.dto';
import { CreateUserDto } from 'types';

const SALT = 10;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, SALT);
    userDto.password = hashedPassword;
    const createdUser = await this.userService.create(userDto);
    createdUser.password = '';
    return createdUser;
  }

  async login(userDto: CreateUserDto) {
    const users = await this.userService.find({ username: userDto.username });

    if (!users) {
      throw new UnauthorizedException('Invalid username');
    }
    const user = users[0];
    console.log(user);
    const isPasswordValid = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const payload = {
      _id: user._id,
      username: user.username,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async me(jwt: JwtPayload) {
    const user = await this.userService.findOne(jwt._id); //Can I use decorator to handle result of this function and then set to const
    user.password = "";
    return user;
    //return { ...user, password: null };
  }
}
