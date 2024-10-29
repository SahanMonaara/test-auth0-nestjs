import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from 'src/schemas/user.schema';
import mongoose from 'mongoose';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.createUser(createUserDto);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(AuthorizationGuard)
  @Get()
  getAllUsers() {
    try {
      return this.userService.getAllUsers();
    } catch (e) {
      return e;
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid user id', 404);
    const findUser = await this.userService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }
}
