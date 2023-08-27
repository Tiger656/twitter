import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from './auth/constants';
import { ValidatorModule } from './validator/validator.module';
import { conf } from './conf';

@Module({
  imports: [
    PostModule,
    // MongooseModule.forRoot('mongodb://root:password@localhost:27017'),
    MongooseModule.forRoot(conf.db.uri),
    MulterModule.register({
      dest: './files',
    }),
    UserModule,
    AuthModule,
    JwtModule.register({
      // secret: JWT_CONSTANTS.secret,
      secret: conf.auth.secret,
    }),
    ValidatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
