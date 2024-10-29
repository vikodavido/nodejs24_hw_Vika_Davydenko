import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ICreateUserInput } from './interfaces/create-user-input.interface';
import { IUpdateUserPartialInput } from './interfaces/update-user-partial-input.interface';
import { User } from './user.schema';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserInputDto } from './dto/create-user-input.dto'; 
import { UpdateUserPartialInputDto } from './dto/update-user-partial-input.dto'; 
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('users') 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of users', type: [UserResponseDto] }) 
  async listUsers(): Promise<User[]> {
    return this.usersService.list();
  }

  @Post()
  @ApiResponse({ status: 201, description: 'User created', type: UserResponseDto }) 
  async createUser(@Body() dto: CreateUserInputDto): Promise<void> { 
    return this.usersService.create(dto);
  }

  @Get(':firstName')
  @ApiParam({ name: 'firstName', required: true, description: 'First name of the user' }) 
  @ApiResponse({ status: 200, description: 'User found', type: UserResponseDto }) 
  async findOne(@Param('firstName') firstName: string): Promise<User> {
    return this.usersService.findOne(firstName);
  }

  @Get('without-exception/:firstName')
  @ApiParam({ name: 'firstName', required: true, description: 'First name of the user' }) 
  @ApiResponse({ status: 200, description: 'User found or null', type: UserResponseDto })
  async findOneWithoutException(@Param('firstName') firstName: string): Promise<User | null> {
    return this.usersService.findOneWithoutException(firstName);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the user' }) 
  @ApiResponse({ status: 200, description: 'User updated', type: UserResponseDto }) 
  async updateOne(@Param('id') id: string, @Body() dto: UpdateUserPartialInputDto): Promise<User> {
    return this.usersService.updateOne(id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the user' }) 
  @ApiResponse({ status: 200, description: 'User removed', type: String }) 
  async remove(@Param('id') id: string): Promise<string> {
    return this.usersService.remove(id);
  }
}
