import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PostRepository } from './post.repository';
import { AccessValidator } from './validation/access.validator';
import { conf } from 'src/conf';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    JwtModule.register({
      secret: conf.auth.secret,
    }),
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository, AccessValidator],
})
export class PostModule {}
