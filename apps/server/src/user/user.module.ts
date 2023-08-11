import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from 'src/auth/constants';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    Object,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: JWT_CONSTANTS.secret, // why i cannot add this only on app module?
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserModule, UserService],
})
export class UserModule {}
