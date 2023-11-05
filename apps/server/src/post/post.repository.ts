import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/base.repository';
import { Post } from './post.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from '../../../../packages/types/src/post/create-post.dto';
import { UpdatePostDto } from 'types';

@Injectable()
export class PostRepository extends BaseRepository<Post, CreatePostDto, UpdatePostDto> {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {
    super(postModel);
  }
}
