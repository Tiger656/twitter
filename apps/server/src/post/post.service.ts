import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { BaseService } from 'src/base/base.service';
import { CreatePostDto } from '../../../../packages/types/src/post/create-post.dto';
import { PostRepository } from './post.repository';
import { UpdatePostDto } from 'types';

@Injectable()
export class PostService extends BaseService<Post, CreatePostDto, UpdatePostDto> {
  constructor(private readonly postRepository: PostRepository) {
    super(postRepository);
  }
}
