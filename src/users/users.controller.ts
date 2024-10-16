import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UpdateUserInputDto } from './dto/update-user-input.dto';
import { UpdateUserPartialInputDto } from './dto/update-user-partial-input.dto';
import { IUser } from './interfaces/user.interface';
import { Document } from 'mongoose';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<IUser & Document> {
    return this.usersService.findOneById(id);
  }

  @Get()
  async listUsers(): Promise<IUser[]> {
    return this.usersService.list();
  }

  @Post()
  async createUser(@Body() dto: CreateUserInputDto): Promise<IUser> {
    return this.usersService.create(dto);
  }

  @Patch(':id')
  async updateUserPartially(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserPartialInputDto,
  ): Promise<IUser> {
    return this.usersService.updatePartially(id, updateUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserInputDto,
  ): Promise<IUser> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    return this.usersService.remove(id);
  }
}
