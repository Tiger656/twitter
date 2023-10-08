import { ApiProperty } from '@nestjs/swagger';
import { ObjectId, Types } from 'mongoose';
import { BaseDto } from 'src/base/base.dto';
import { z } from 'zod';

export class CreatePostDto extends BaseDto {
  @ApiProperty({
    example: 'This is post text content',
    description: 'poste text content. No longer than 200 symbols',
  })
  textContent: string;

  @ApiProperty({
    example: 'No example',
    description: 'Author(user) id. This field anyway will be overwritten in system',
  })
  author: Types.ObjectId;
}

export const createPostDtoVaidator = z.object({
  textContent: z.string().max(200),
  authorId: z.string().uuid(),
});

export const uuidValidator = z.coerce.string().uuid();
