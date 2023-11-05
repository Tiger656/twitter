import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";


export class CreatePostDto {

  _id: string;

  @ApiProperty({
    example: 'This is post text content',
    description: 'poste text content. No longer than 200 symbols',
  })
  textContent: string;

  @ApiProperty({
    example: 'No example',
    description: 'Author(user) id. This field anyway will be overwritten in system by User id from jwt',
  })
  author: Types.ObjectId | any;
}

// export const createPostDtoVaidator = z.object({
//   textContent: z.string().max(200),
//   authorId: z.string().uuid(),
// });

//export const uuidValidator = z.coerce.string().uuid();
