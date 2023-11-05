import { PartialType } from '@nestjs/mapped-types';
// import { MaxLength } from 'src/validator/validator.decorator';
import { z } from 'zod';
import { CreateUserDto } from './create-user.dto';

// @Validateable() ..- должен подписываться 
export class UpdateUserDto extends PartialType(CreateUserDto) {}
