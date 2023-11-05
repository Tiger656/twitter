import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { conf } from 'src/conf';

@Module({
  imports: [
    Object,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: conf.auth.secret, // why i cannot add this only on app module?
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserModule, UserService],
})
export class UserModule {}
