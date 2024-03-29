import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from 'src/auth/guards/authn.guard';
import { AuthzGuard } from 'src/auth/guards/authz.guard';
//import { uuidValidator } from 'types/src/user/create-user.dto';

@ApiTags('User')
@ApiBearerAuth('Token')
@Controller('user')
@UseGuards(AuthnGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  //We can create 
  //@Post()
  //create(@Body() createUserDto: CreateUserDto) {
  //  return this.userService.create(createUserDto);
  //}

  @Get()
  @UseGuards(AuthzGuard)
  //@GuardPermission('find-all-users') // How i can pass not string but element of Permission
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthzGuard)
  //@GuardPermission('find-user')
  findOne(@Param('id') id: string) {
    //uuidValidator.parse(id);
    return this.userService.findOne(id);
  }

  //@Patch(':id') Disabled because of 
  // @UseGuards(AuthzGuard)
  // @GuardPermission('update-users')
  // update(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
  //   uuidValidator.parse(id);
  //   createUserDtoValidator.parse(createUserDto);
  //   return this.userService.update(id, createUserDto);
  // }

  @Delete(':id')
  //@GuardPermission('delete-users') // add deletion for admin and regular user
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
