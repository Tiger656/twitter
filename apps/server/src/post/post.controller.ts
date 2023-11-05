import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from 'src/auth/guards/authn.guard';
import { JwtPayloadFromRequest } from 'src/auth/decorators/jwtpayload-from-request.decorator';
import mongoose, { ObjectId } from 'mongoose';
import { AuthzGuard } from 'src/auth/guards/authz.guard';
import { GuardPermission } from 'src/auth/decorators/roles.decorator';
import { AccessValidator } from './validation/access.validator'; 
import { CreatePostDto, JwtPayload, UpdatePostDto } from 'types';

@ApiTags('Post Controller')
@Controller('post')
@ApiBearerAuth('Token')
@UseGuards(AuthnGuard)
export class PostController {
  constructor(private readonly postService: PostService, private readonly accessValidator: AccessValidator) {}

  @Post()
  @UseGuards(AuthzGuard)
  @GuardPermission(['post-create'])
  create(
    @Body() createPostDto: CreatePostDto,
    @JwtPayloadFromRequest() jwt: JwtPayload,
  ) {

    const authorId = new mongoose.Types.ObjectId(jwt._id);
    createPostDto.author = authorId;
    return this.postService.create(createPostDto);
  }

  @Get()
  //@UseGuards(AuthzGuard) delete
  @GuardPermission(['post-read-all'])
  findAll(@Query("populatedFields") populatedFields: string[]) {
    return this.postService.findAll(populatedFields);
  }

  @Get(':id')
  @UseGuards(AuthzGuard)
  @GuardPermission(['post-read-all'])
  findOne(@Param('id') id: string) {
    //uuidValidator.parse(id);
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthzGuard)
  @GuardPermission(['post-update', 'post-update-only-self']) // 'post-update-only-self' doesn't work. Need to replace validatePostCanBeUpdatedByUser for a better solution
  update(@Param('id') postId: string, @Body() updatePostDto: UpdatePostDto, @JwtPayloadFromRequest() jwt: JwtPayload) { 
    this.accessValidator.validateUserOwnPost(postId, jwt._id)
    return this.postService.update(postId, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthzGuard)
  @GuardPermission(['post-delete', 'post-delete-only-self'])
  remove(@Param('id') postId: string, @JwtPayloadFromRequest() jwt: JwtPayload) {
    this.accessValidator.validateUserOwnPost(postId, jwt._id)
    return this.postService.remove(postId);
  }
}
