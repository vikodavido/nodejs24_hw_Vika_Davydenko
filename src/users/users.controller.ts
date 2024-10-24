import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ICreateUserInput } from './interfaces/create-user-input.interface';
import { IUpdateUserPartialInput } from './interfaces/update-user-partial-input.interface';
import { User } from './user.schema';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserInputDto } from './dto/create-user-input.dto'; // імпортуємо DTO
import { UpdateUserPartialInputDto } from './dto/update-user-partial-input.dto'; // імпортуємо DTO для часткового оновлення
import { UserResponseDto } from './dto/user-response.dto'; // імпортуємо DTO для відповіді

@ApiTags('users') // Тег для групування API
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of users', type: [UserResponseDto] }) // Описуємо відповідь
  async listUsers(): Promise<User[]> {
    return this.usersService.list();
  }

  @Post()
  @ApiResponse({ status: 201, description: 'User created', type: UserResponseDto }) // Описуємо успішну відповідь
  async createUser(@Body() dto: CreateUserInputDto): Promise<void> { // Змінюємо тип на CreateUserInputDto
    return this.usersService.create(dto);
  }

  @Get(':firstName')
  @ApiParam({ name: 'firstName', required: true, description: 'First name of the user' }) // Описуємо параметр
  @ApiResponse({ status: 200, description: 'User found', type: UserResponseDto }) // Описуємо відповідь
  async findOne(@Param('firstName') firstName: string): Promise<User> {
    return this.usersService.findOne(firstName);
  }

  @Get('without-exception/:firstName')
  @ApiParam({ name: 'firstName', required: true, description: 'First name of the user' }) // Описуємо параметр
  @ApiResponse({ status: 200, description: 'User found or null', type: UserResponseDto }) // Описуємо відповідь
  async findOneWithoutException(@Param('firstName') firstName: string): Promise<User | null> {
    return this.usersService.findOneWithoutException(firstName);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the user' }) // Описуємо параметр
  @ApiResponse({ status: 200, description: 'User updated', type: UserResponseDto }) // Описуємо відповідь
  async updateOne(@Param('id') id: string, @Body() dto: UpdateUserPartialInputDto): Promise<User> {
    return this.usersService.updateOne(id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the user' }) // Описуємо параметр
  @ApiResponse({ status: 200, description: 'User removed', type: String }) // Описуємо відповідь
  async remove(@Param('id') id: string): Promise<string> {
    return this.usersService.remove(id);
  }
}
