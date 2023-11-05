import { OmitType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

//Omit type not safe, because we can send any info in author field and in will be saved
export class UpdatePostDto extends OmitType(CreatePostDto, ['author'] as const) {

}