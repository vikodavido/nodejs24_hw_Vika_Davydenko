import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ICreateUserInput } from './interfaces/create-user-input.interface';
import { IUpdateUserPartialInput } from './interfaces/update-user-partial-input.interface';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async listUsers(): Promise<User[]> {
    return this.usersService.list();
  }

  @Post()
  async createUser(@Body() dto: ICreateUserInput): Promise<void> {
    return this.usersService.create(dto);
  }

  @Get(':firstName')
  async findOne(@Param('firstName') firstName: string): Promise<User> {
    return this.usersService.findOne(firstName);
  }

  @Get('without-exception/:firstName')
  async findOneWithoutException(@Param('firstName') firstName: string): Promise<User | null> {
    return this.usersService.findOneWithoutException(firstName);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() dto: IUpdateUserPartialInput): Promise<User> {
    return this.usersService.updateOne(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    return this.usersService.remove(id);
  }
}
